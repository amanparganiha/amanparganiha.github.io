---
title: "Three Layers That Stop a RAG Agent From Hallucinating"
date: 2026-05-28
tags: [RAG, LLM, Generative AI]
excerpt: "Retrieval alone doesn't make an agent honest. Here's the three-layer defense I actually ship to keep a RAG recommender from inventing things that aren't in the catalog."
---

The most common thing people get wrong about Retrieval-Augmented Generation is assuming that *retrieving* the right context is enough. It isn't. A model handed five perfectly relevant chunks will still, every so often, confidently cite a sixth thing that doesn't exist. When I built a conversational assessment recommender that pulls from a fixed catalog, "it mostly works" was not good enough — a recommendation that points at a product we don't offer is worse than no answer at all.

So I stopped treating hallucination as a prompt-tuning problem and started treating it as a systems problem. What I ended up with is a three-layer defense, and each layer catches a different failure mode.

## Layer 1: Constrain the prompt, but don't trust it

The first layer is the obvious one — tell the model what it's allowed to do. But the key is to make the instruction *closed* rather than *open*. Instead of "answer based on the context," I give the model an explicit decision to make on every turn:

```
You may only reference items from the CANDIDATES list below.
Decide ONE intent for this turn:
- CLARIFY   : the request is too vague to recommend
- RECOMMEND : you have enough to suggest specific candidates
- COMPARE   : the user wants two named items compared
- REFUSE    : the request is off-topic for this catalog

If you cannot ground an answer in CANDIDATES, you MUST CLARIFY or REFUSE.
```

Forcing the model to pick an intent does something subtle: "I don't have enough to answer" becomes a *valid, first-class output* instead of a failure the model tries to avoid. Most hallucinations I saw came from the model feeling obligated to recommend *something*. Give it a sanctioned escape hatch and it takes it.

But prompt constraints are advice, not a contract. The model can still ignore them. That's why there are two more layers.

## Layer 2: Make the output shape impossible to fudge

The second layer is structured output. I require the model to respond in JSON mode against a schema, and the schema is where the real enforcement lives:

```python
class Recommendation(BaseModel):
    item_id: str          # MUST match a real catalog id
    reason: str

class TurnResponse(BaseModel):
    intent: Literal["CLARIFY", "RECOMMEND", "COMPARE", "REFUSE"]
    recommendations: list[Recommendation] = []
    message: str
```

JSON mode alone gets you well-formed output, not *correct* output. The model will happily emit `{"item_id": "SHL-Reasoning-Pro"}` for a product that isn't real. So the schema is necessary but not sufficient — it sets up the third layer, which is the one that actually guarantees correctness.

## Layer 3: Sanitize on the server, where the model can't argue

The third layer assumes the model lied and verifies everything server-side against the source of truth. This is the layer I trust:

```python
def sanitize(turn: TurnResponse, catalog: dict[str, Item]) -> TurnResponse:
    if turn.intent != "RECOMMEND":
        return turn

    valid = [r for r in turn.recommendations if r.item_id in catalog]
    dropped = len(turn.recommendations) - len(valid)

    if dropped:
        log.warning("dropped %d hallucinated ids", dropped)

    # If the model invented everything, don't fall back to a bad answer —
    # downgrade the turn to a clarifying question instead.
    if not valid:
        turn.intent = "CLARIFY"
        turn.message = "Could you tell me a bit more about the role you're hiring for?"

    turn.recommendations = valid
    return turn
```

The important design choice here is what happens when sanitization empties the list. The tempting move is to retry or to surface a generic apology. I do neither — I *downgrade the intent* to `CLARIFY`. A clarifying question is always a safe, honest thing to say, and it keeps the conversation moving instead of dead-ending. Failure becomes a normal conversational turn rather than an error.

## Why retrieval quality is a separate problem

People often try to fix hallucination by improving retrieval, and that's a category error. Better retrieval changes *what's in the candidate set*; it does nothing about the model citing things *outside* that set. I keep the two concerns separate:

- **Retrieval** decides what the model is allowed to see. I use TF-IDF here, deliberately — it's deterministic, has no embedding-API dependency, and is trivial to swap for embeddings later. Measure it with `Recall@k`: are the right items even in the candidate window?
- **Grounding** decides whether the answer stays inside that window. Measure it differently: of the items the model named, what fraction exist in the catalog? That number should be 1.0, and layer 3 makes it 1.0 by construction.

If you only track retrieval metrics, a grounding regression is invisible to you. I learned to log both: `Recall@10` for retrieval, and a separate "grounded-id rate" counted *before* sanitization, so I can see how often the raw model output was trying to hallucinate even when the user never noticed.

## What I'd tell my past self

You cannot prompt your way to a non-hallucinating agent, and you don't need to. Treat the prompt as a hint, the schema as a shape, and the server as the judge. The model is allowed to be wrong as long as something downstream is structurally incapable of passing that wrongness on to the user.

The single highest-leverage change in all of this wasn't a clever prompt — it was making "I don't have a grounded answer" a normal, well-handled outcome at every layer. Once an honest non-answer is cheap and built-in, the incentive to hallucinate quietly disappears.
