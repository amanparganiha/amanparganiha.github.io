export const personalInfo = {
  name: "Aman Parganiha",
  title: "AI & Software Engineer",
  tagline: "Building AI systems and scalable software that solve real-world problems.",
  status: "Robotics Programming Intern @ Janyu Tech",
  heroHeadline: "I build AI systems that ship.",
  heroSub:
    "AI & Software Engineer turning research-grade ML like RAG pipelines and multimodal models into production-ready software with clean, scalable architecture.",
  photo: "/profile-480.webp",
  email: "aman.parganiha.16@gmail.com",
  location: "India",
  about:
    "I'm an M.Tech CSE (AI/ML) student at IIIT Naya Raipur and a Robotics Programming Intern at Janyu Tech, where I own backend delivery for MyFactory OS, a manufacturing execution system for industrial-robotics production. I build LLM applications end to end RAG pipelines, agentic workflows, and prompt-to-app generation and my M.Tech thesis, LiveJEPA, explores real-time vision-language captioning. My focus is on clean software architecture and production-ready AI.",

  social: {
    github: "https://github.com/amanparganiha",
    linkedin: "https://www.linkedin.com/in/aman-parganiha-3397a5190/",
    leetcode: "https://leetcode.com/u/parganiha/",
    kaggle: "https://www.kaggle.com/amanparganiha",
  },
};

export interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Robotics Programming Intern",
    company: "Janyu Tech",
    location: "Mumbai, Maharashtra",
    period: "Aug 2026 — Present",
    description:
      "Own backend delivery on a two-person team building MyFactory OS, a Manufacturing Execution System (MES) for industrial-robotics production: an internal shop-floor job tracker plus a customer order-tracking portal.",
    highlights: [
      "Reviewed 12+ MES products (Siemens Opcenter, SAP ME, Tulip, Zetwerk) and wrote the technical scope; engineering leadership approved the build-vs-buy case and the MVP boundary.",
      "Designed the relational schema and versioned REST API contract on FastAPI, SQLAlchemy 2.0, PostgreSQL 16, and Alembic: JWT role-based access, query-level tenant scoping, transactional stage advances behind QC gates, and an append-only audit log.",
      "Packaged the API, PostgreSQL, MinIO, and the React/Vite frontend with Docker Compose, with hosts and credentials read from the environment for on-premise deployment.",
    ],
  },
];



export interface Education {
  degree: string;
  school: string;
  period: string;
  details?: string;
}

export const education = [
  {
    degree: "Master of Technology in Computer Science & Engineering (AI/ML)",
    school: "IIIT Naya Raipur",
    period: "Aug 2025 — Aug 2027",
    details: "CGPA: 8.0/10.0",
  },
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    school: "Shri Shankaracharya Technical Campus Bhilai",
    period: "Aug 2019 — Aug 2023",
    details: "CGPA: 8.22/10.0",
  },
  {
    degree: "Higher Secondary (Class 12th) — Science (Mathematics)",
    school: "Shakuntala Vidyalaya",
    period: "Mar 2017 — Mar 2018",
    details: "Percentage: 88.8%",
  },
];


export const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "C++", "TypeScript", "SQL"],
  },
  {
    category: "ML & Deep Learning",
    skills: [
      "PyTorch",
      "Scikit-learn",
      "Transformers",
      "Diffusion Models",
      "Vision-Language Models",
      "NLP",
      "Model Evaluation & Benchmarking",
    ],
  },
  {
    category: "LLMs & Generative AI",
    skills: [
      "RAG Pipelines",
      "LlamaIndex",
      "LangChain",
      "OpenAI API (Structured Outputs, Streaming)",
      "Prompt Engineering",
      "Embeddings",
      "Vector Databases (Qdrant)",
      "Agentic Workflows",
    ],
  },
  {
    category: "Backend & MLOps",
    skills: [
      "FastAPI",
      "Node/Express",
      "REST API Design",
      "Server-Sent Events",
      "SQLAlchemy",
      "Alembic",
      "Drizzle ORM",
      "PostgreSQL",
      "JWT Auth",
      "Docker Compose",
      "AWS (EC2)",
      "MinIO/S3",
      "Inngest",
      "Git/GitHub",
      "GitHub Actions CI",
    ],
  },
  {
    category: "Data & Practices",
    skills: [
      "Pandas",
      "NumPy",
      "ETL Pipelines",
      "Dataset Curation",
      "Feature Engineering",
      "SQL/NoSQL",
      "Unit & E2E Testing (Vitest, Playwright)",
      "Code Review",
      "System Design",
    ],
  },
  {
    category: "Core Computer Science",
    skills: [
      "DSA",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "OOP",
    ],
  },
];


export interface Achievement {
  title: string;
  detail?: string;
  url?: string;
}

export const achievements: Achievement[] = [
  {
    title: "GATE CSE — Top 7.8%",
    detail:
      "Ranked in the top 7.8% of 210,000 candidates nationwide, securing M.Tech (AI/ML) admission at IIIT Naya Raipur.",
  },
  {
    title: "200+ LeetCode problems solved",
    url: personalInfo.social.leetcode,
  },
];


export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  url?: string; // public verification / certificate link
}

export const certifications: Certification[] = [
  {
    name: "Claude Code 101",
    issuer: "Anthropic Education",
    date: "Jun 2026",
    url: "https://verify.skilljar.com/c/omr6mvgupm5s",
  },
  {
    name: "Claude 101",
    issuer: "Anthropic Education",
    date: "Jun 2026",
    url: "https://verify.skilljar.com/c/dofysvriaxdb",
  },
  {
    name: "Dynamic Programming Camp",
    issuer: "AlgoUniversity",
    url: "https://d3uam8jk4sa4y4.cloudfront.net/static/certificates/Dynamic_Programming_camp/aman-parganiha.png",
  },
  {
    name: "5-Day AI Agents Intensive Course",
    issuer: "Google × Kaggle",
  },
  {
    name: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart USA",
  },
];


/** Filter labels on the Projects page, in display order. */
export const projectCategories = [
  "Generative AI",
  "NLP",
  "Computer Vision",
  "Data Science",
  "Research",
  "Reinforcement Learning",
  "Backend & Systems",
  "Tools",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  /** Every label the project belongs to; the Projects page filters on these. */
  categories: ProjectCategory[];
  techStack: string[];
  results: string;
  image?: string;
  github?: string;
  demo?: string;
  /** Shown in the "Selected projects" strip on the home page. */
  featured?: boolean;
}

/**
 * GitHub's auto-generated social-preview card for a repo (1200×600: repo
 * name, description, stars). Used as the default project thumbnail when no
 * custom image is set. Returns undefined for non-repo URLs.
 */
export function githubSocialCard(githubUrl: string): string | undefined {
  const m = githubUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  return m ? `https://opengraph.githubassets.com/1/${m[1]}/${m[2]}` : undefined;
}

// Display order. Ids are stable (the command palette deep-links /projects?p=<id>),
// so new projects take the next free id wherever they sit in the list.
export const projects: Project[] = [
  {
    id: "12",
    title: "SayShip — Prompt-to-App Generation Platform",
    description:
      "Describe an app in plain English: SayShip plans it, streams the code file by file, and runs it in a sandboxed live preview with its own database-backed API.",
    longDescription:
      "A platform that turns a plain-English prompt into a running full-stack app. A planner agent writes a structured plan with OpenAI Structured Outputs, a writer agent streams each file over Server-Sent Events, an esbuild check blocks broken builds, and a repair pass feeds the compiler's file:line errors back to the model; runtime errors from the preview go to a fixer agent automatically. Untrusted generated code runs in an opaque-origin sandbox (an iframe without allow-same-origin, plus a CSP sandbox header) with a capability-keyed CRUD API per app, isolating it from platform sessions and data. Every generation is an immutable version, an atomic database lease allows one run per project, and apps can be published to a public URL, exported as a ZIP, or pushed to GitHub.",
    categories: ["Generative AI", "Backend & Systems"],
    techStack: [
      "TypeScript",
      "React 19",
      "Express 5",
      "PostgreSQL",
      "Drizzle ORM",
      "esbuild",
      "OpenAI API",
      "Playwright",
    ],
    results:
      "Covered by 67 Vitest/supertest and 10 Playwright end-to-end tests in GitHub Actions CI; a mock LLM provider lets the product and the full test suite run deterministically with no API key.",
    github: "https://github.com/amanparganiha/SayShip",
    demo: "https://say-ship--parganiha.replit.app",
    featured: true,
  },
  {
    id: "1",
    title: "Event-Driven RAG Agent for Document Ingestion & Q&A",
    description:
      "Event-driven RAG system that ingests multi-page PDFs asynchronously and answers questions with grounded, cited responses.",
    longDescription:
      "An event-driven RAG system with a FastAPI backend, a Streamlit chat UI, and Qdrant running in Docker. Ingestion is durable and fault-tolerant: Inngest runs parse → embed → store as steps that retry independently, over LlamaIndex chunking, OpenAI embeddings, and a Qdrant vector store. Chunking and embedding strategies stay swappable, and answers come back grounded in the retrieved context, with citations.",
    categories: ["Generative AI", "NLP", "Backend & Systems"],
    techStack: [
      "Python",
      "FastAPI",
      "Inngest",
      "LlamaIndex",
      "Qdrant",
      "OpenAI API",
      "Docker",
      "Streamlit",
    ],
    results:
      "Durable ingestion: parse, embed, and store steps retry independently, and every answer is grounded in retrieved, cited context.",
    github: "https://github.com/amanparganiha/Event-Driven-RAG-Agent",
    demo: "https://event-driven-rag-agent.streamlit.app/",
    featured: true,
  },
  {
    id: "2",
    title: "Multimodal Credit Risk Analysis using SEC XBRL & NLP",
    description:
      "End-to-end pipeline that turns 41M raw SEC XBRL records into a curated credit-risk dataset combining financial and NLP features.",
    longDescription:
      "An end-to-end pipeline that turns 41M raw SEC XBRL records (2022–2024) into a curated dataset of 35,000 companies with 47 features: 34 financial ratios and 13 NLP-derived sentiment features (NLTK/VADER). Random Forest, Gradient Boosting, Logistic Regression, and SVM are compared on binary and multi-class credit-rating tasks, with per-feature-set evaluation and leakage checks.",
    categories: ["Data Science", "NLP"],
    techStack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "NLTK/VADER",
      "Streamlit",
    ],
    results:
      "Reached 97.9% binary / 93.8% multi-class accuracy on financial features; per-feature-set evaluation and leakage checks exposed an inflated multimodal result, which was discarded.",
    github: "https://github.com/amanparganiha/FDA-10-Multimodal-Credit-Risk-Analysis",
    demo: "https://multimodal-credit-risk-analysis.streamlit.app/",
    featured: true,
  },
  {
    id: "13",
    title: "LiveJEPA — Real-Time Vision-Language Captioning",
    description:
      "M.Tech thesis (in progress): streaming video captioning built on Meta FAIR's VL-JEPA pipeline.",
    longDescription:
      "My M.Tech thesis, in progress. I'm reconstructing Meta FAIR's VL-JEPA pipeline for streaming video captioning: a frozen V-JEPA 2 video encoder with a lightweight predictor head aligned to the SONAR text-embedding space, evaluated on EgoExo4D.",
    categories: ["Computer Vision", "Research"],
    techStack: [
      "Python",
      "PyTorch",
      "V-JEPA 2",
      "SONAR",
      "Vision-Language Models",
    ],
    results:
      "In progress as my M.Tech thesis at IIIT Naya Raipur, with evaluation on EgoExo4D.",
    image: "/thumbs/livejepa.svg",
  },
  {
    id: "14",
    title: "DDPM from Scratch — Denoising Diffusion in PyTorch",
    description:
      "A Denoising Diffusion Probabilistic Model reimplemented from the paper, without any diffusion libraries.",
    longDescription:
      "A from-scratch implementation of DDPM (Ho et al., 2020) in PyTorch. The noise schedule, closed-form forward diffusion, noise-prediction (ε) training objective, and ancestral sampling loop are all written directly, along with a UNet denoiser that uses sinusoidal timestep embeddings and self-attention at low resolutions. Samples are drawn from an exponential moving average of the weights.",
    categories: ["Generative AI", "Computer Vision", "Research"],
    techStack: [
      "Python",
      "PyTorch",
      "Diffusion Models",
      "UNet",
      "Self-Attention",
    ],
    results:
      "On Fashion-MNIST, the 1.6M-parameter UNet generates recognizable samples after 30 epochs (about 45 minutes on an NVIDIA T1000), each from pure noise through the full 1000-step reverse process.",
    github: "https://github.com/amanparganiha/ddpm-from-scratch",
  },
  {
    id: "3",
    title: "GreenCloudRL — Meta-RL for Energy-Efficient Cloud Scheduling",
    description:
      "Hierarchical meta-RL scheduler with SHAP explainability that cut energy use by 14% on real Google and Alibaba cluster traces.",
    longDescription:
      "A research framework that combines Hierarchical Reinforcement Learning (A2C + PPO), Meta-Learning (Reptile), and SHAP explainability to produce adaptive, interpretable, and energy-efficient cloud scheduling policies. Trained and evaluated on real Google and Alibaba cluster traces. A manuscript on this work has been submitted.",
    categories: ["Reinforcement Learning", "Research"],
    techStack: [
      "Python",
      "Reinforcement Learning",
      "PPO",
      "A2C",
      "Meta-Learning",
      "SHAP",
    ],
    results:
      "Achieved a 14% energy reduction on Google and Alibaba cluster traces, with SHAP explanations for the scheduling decisions.",
    github: "https://github.com/amanparganiha/GreenCloudRL",
  },
  {
    id: "15",
    title: "Keyway — AI-Personalized Password-Manager Onboarding",
    description:
      "Cross-device onboarding assistant that builds a personalized setup plan and syncs progress between web and iPhone in real time.",
    longDescription:
      "An AI-personalized onboarding assistant for a password manager. OpenAI structured outputs pick, order, and rewrite setup steps from a fixed catalog based on the user's role, tools, and security comfort, and a rule-based planner takes over when there's no consent, no key, a timeout, or bad output. Progress syncs between the Next.js web app and a native SwiftUI iPhone app in real time (Server-Sent Events over Redis pub/sub). Friction detection turns errors and stalls into just-in-time guides, and a help assistant answers from help articles, with passwords and secrets redacted before anything reaches the model. A team-admin flow adds bulk invites and an onboarding funnel with activation metrics.",
    categories: ["Generative AI", "Backend & Systems"],
    techStack: [
      "TypeScript",
      "Next.js",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "OpenAI API",
      "SwiftUI",
      "Playwright",
    ],
    results:
      "Tested at every layer: Vitest unit and integration tests against real Postgres and Redis, Playwright end-to-end journeys, and XCTest for the iOS app on a macOS CI runner.",
    github: "https://github.com/amanparganiha/keyway",
  },
  {
    id: "16",
    title: "CampusBridge — Multi-Tenant School Platform API",
    description:
      "Production-grade, multi-tenant REST API for schools, with three independent layers of tenant isolation.",
    longDescription:
      "A multi-tenant REST API for schools covering courses, sections, enrollments, grades, and payments. Tenant isolation works in three independent layers: composite tenant foreign keys, a Prisma extension that scopes every query, and PostgreSQL row-level security. Auth covers password and OIDC SSO sign-in, short-lived JWTs, rotating refresh tokens with reuse detection, and RBAC combined with ownership rules. Side-effecting requests accept idempotency keys, every change writes its audit row and an outbox event in the same transaction, and integrations include Stripe webhooks, S3 presigned uploads, and BullMQ background jobs. Under active development.",
    categories: ["Backend & Systems"],
    techStack: [
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "OIDC",
      "Docker",
    ],
    results:
      "Seats can't be oversold — a test fires 20 simultaneous enrollments at a 5-seat section and expects exactly 5 to succeed — and a suite aims every id-taking route at another school's records, expecting 404.",
    github: "https://github.com/amanparganiha/CampusBridge",
  },
  {
    id: "10",
    title: "Air Canvas — Real-Time Hand-Tracking Drawing",
    description:
      "Draw in the air with your finger — real-time hand tracking that runs entirely in the browser, no backend.",
    longDescription:
      "A live, fully client-side computer-vision demo. A MediaPipe hand-landmark model streams 21 keypoints per frame from the webcam; on top of it I built the finger-state detection, a gesture classifier (point to draw, two fingers to move, dwell on a palette band to switch color), a One-Euro filter that smooths fingertip jitter into clean strokes, and a DPR-aware multi-canvas pipeline (mirrored video + persistent paint layer + per-frame skeleton overlay) with eraser, undo, and PNG export. Runs at interactive frame rates via the WebGL delegate and ships as a lazy-loaded route so it never affects the rest of the site.",
    categories: ["Computer Vision"],
    techStack: ["TypeScript", "React", "MediaPipe", "WebGL", "Canvas API", "Computer Vision"],
    results:
      "Runs in real time entirely in-browser with no server — try it live, no install required.",
    image: "/thumbs/air-canvas.svg",
    demo: "/projects/air-canvas",
  },
  {
    id: "17",
    title: "Schema-Aware Table Retrieval for Text-to-SQL",
    description:
      "Ranks the database tables needed to answer a natural-language question — with no hosted LLM APIs anywhere in the pipeline.",
    longDescription:
      "Given a natural-language question and a database schema, the system returns a ranked list of the tables needed to answer it. The schema uses legacy abbreviations (tbl_ord_hdr, pay_trn, rfnd_log), so naive BM25 over table names fails outright. The pipeline expands abbreviations, runs BM25 over separate title and body fields, optionally adds a local bge-small sentence-transformer, and fuses the scores with max-normalization rather than RRF so score gaps survive. A graph stage then adds bridge tables on shortest paths between retrieved tables, plus the lookup tables they reference along foreign keys.",
    categories: ["NLP"],
    techStack: [
      "Python",
      "BM25",
      "Sentence Transformers",
      "Information Retrieval",
      "Graph Algorithms",
    ],
    results:
      "Precision 0.92, recall 1.00, and F1 0.95 averaged over the three published samples, using lexical and graph retrieval alone.",
    github: "https://github.com/amanparganiha/fipl-table-retrieval",
  },
  {
    id: "18",
    title: "Intelligent Electricity Demand Forecasting",
    description:
      "Day-ahead load forecasts for every 10-minute block across three 132 kV grid feeders, served through a FastAPI control-room dashboard.",
    longDescription:
      "An end-to-end, containerized prototype that forecasts electricity demand for all 144 ten-minute blocks of the day across three 132 kV feeders on the Dhanbad, Jharkhand grid. EDA uncovered mixed date formats that silently turned 31,680 rows into missing values; routing each row to the right parser recovered a complete, gap-free series. One LightGBM model per feeder uses 31 leak-free features: calendar and cyclical encodings, Open-Meteo weather, a localized holiday calendar, and day-level lags. Built for the Exascale Deeptech & AI Data Science Developer Intern assignment.",
    categories: ["Data Science"],
    techStack: [
      "Python",
      "LightGBM",
      "Pandas",
      "Scikit-learn",
      "FastAPI",
      "Chart.js",
      "Docker",
    ],
    results:
      "Rolling-origin cross-validation (5 × 14-day folds): 4.9% MAPE on the largest feeder and 8.2% on the second; the volatile third feeder reaches 18.0%, a documented limitation.",
    github: "https://github.com/amanparganiha/ApuDemandForecasting",
    demo: "https://apu-forecast.onrender.com",
  },
  {
    id: "19",
    title: "Carbon Emissions Reporting Platform (GHG Protocol)",
    description:
      "Tracks and calculates Scope 1 & 2 greenhouse-gas emissions with versioned emission factors and an ESG analytics dashboard.",
    longDescription:
      "A containerized prototype for tracking, calculating, and visualizing an organization's greenhouse-gas emissions under the GHG Protocol, modelled on an integrated steel plant. Emission factors are versioned, and the calculation engine picks the factor whose validity window contains each activity's date, so restated prior years stay historically accurate; manual overrides are written to a full audit log. Analytics endpoints power an ESG dashboard with year-over-year totals by scope, emission intensity, source hotspots, and monthly trends. Built for the Exascale Deeptech & AI Data Science Developer Intern assignment.",
    categories: ["Backend & Systems", "Data Science"],
    techStack: [
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "SQLite",
      "Chart.js",
      "Docker",
    ],
    results:
      "One container serves the API and the Chart.js dashboard from a single origin, and the database is created and seeded with two years of sample data on first start.",
    github: "https://github.com/amanparganiha/GhgPlatform",
    demo: "https://ghgplatform.onrender.com",
  },
  {
    id: "7",
    title: "SHL Conversational Assessment Recommender",
    description:
      "Stateless FastAPI service that helps recruiters find the right SHL assessments through a multi-turn conversation.",
    longDescription:
      "A conversational recommender that clarifies vague requests, recommends assessments from a scraped SHL catalog, and supports refinement and comparison. Uses a single LLM call per turn (Groq) with full conversation history plus TF-IDF–retrieved candidates to classify intent as CLARIFY, RECOMMEND, COMPARE, or REFUSE. Hallucinations are defended in three layers — prompt constraints, JSON-mode enforcement, and server-side schema sanitization — so recommendations only ever reference real catalog items.",
    categories: ["NLP", "Generative AI"],
    techStack: [
      "Python",
      "FastAPI",
      "Groq LLM",
      "TF-IDF",
      "RAG",
    ],
    results:
      "Stays within a 30s latency budget per turn and is evaluated with trace-based Recall@10 retrieval metrics.",
    github: "https://github.com/amanparganiha/shl-agent",
  },
  {
    id: "4",
    title: "PDF RAG Agent with GPT-4o",
    description:
      "Conversational agent that reads your PDFs and answers questions using RAG, with web search and persistent memory.",
    longDescription:
      "A conversational AI agent powered by OpenAI's GPT-4o that reads PDF documents and answers questions about them using Retrieval-Augmented Generation. Supports web search and persistent memory across sessions.",
    categories: ["Generative AI", "NLP"],
    techStack: [
      "Python",
      "OpenAI API",
      "GPT-4o",
      "RAG",
      "Vector Search",
    ],
    results:
      "Enables grounded question-answering over personal documents with cross-session memory.",
    github: "https://github.com/amanparganiha/PdfRagAgent",
    demo: "https://pdfragagent.streamlit.app/",
  },
  {
    id: "8",
    title: "AI Resume Screening System",
    description:
      "AI-powered tool that ranks resumes against a job description with match scores, strengths, gaps, and recommendations.",
    longDescription:
      "A Streamlit application that evaluates multiple candidate resumes against a job description, ranking them by compatibility. Powered by OpenAI GPT-4o-mini, it produces structured output — a 0–100 match score, identified strengths and skill gaps, and actionable recommendations — for each candidate. Accepts TXT or PDF resumes, ships with a seven-resume demo dataset for instant testing, and exports ranked results to CSV.",
    categories: ["NLP", "Generative AI"],
    techStack: [
      "Python",
      "Streamlit",
      "OpenAI GPT-4o-mini",
      "Pandas",
    ],
    results:
      "Produces structured, ranked candidate evaluations with 0–100 match scores exportable as CSV.",
    github: "https://github.com/amanparganiha/ai-resume-screener",
  },
  {
    id: "9",
    title: "Incident Management System (IMS)",
    description:
      "High-throughput infrastructure monitoring and incident-response pipeline that groups failure signals into actionable incidents.",
    longDescription:
      "Built as a Zeotap SRE assignment, IMS ingests high-volume failure signals from distributed infrastructure and automatically consolidates related ones into single incidents. A rate-limited FastAPI endpoint returns 202 Accepted and pushes signals to Redis Streams for backpressure handling; an async consumer applies debounce logic (10s window) before persisting to PostgreSQL + TimescaleDB, with MongoDB for audit logs. Uses the Strategy pattern for alert evaluation and the State pattern for incident lifecycle, with a React 18 + Vite + Tailwind dashboard.",
    categories: ["Backend & Systems"],
    techStack: [
      "Python",
      "FastAPI",
      "Redis Streams",
      "PostgreSQL",
      "TimescaleDB",
      "Docker",
    ],
    results:
      "Designed for high-throughput ingestion: the rate-limited endpoint acknowledges immediately with 202 while Redis Streams decouple async processing.",
    github: "https://github.com/amanparganiha/ims-zeotap",
  },
  {
    id: "5",
    title: "Notify — AI Internship Automation Agent",
    description:
      "Multi-agent pipeline that discovers, ranks, and drafts emails for internships. Built for the Google AI Agents Intensive.",
    longDescription:
      "Notify is an AI-powered internship automation agent built for the Google AI Agents Intensive. It streamlines internship discovery, ranking, and personalized email drafting through a coordinated multi-agent pipeline.",
    categories: ["Generative AI"],
    techStack: [
      "Python",
      "LLM Agents",
      "Multi-Agent Systems",
      "Prompt Engineering",
    ],
    results:
      "Automates the end-to-end internship outreach workflow with a multi-agent system.",
    github: "https://github.com/amanparganiha/notify-capstone",
  },
  {
    id: "6",
    title: "COSMOS: AI-Pompeii — Heritage Preservation",
    description:
      "AI-driven heritage preservation and disaster-response system, built for the Google Gemini Vibe Coding Hackathon.",
    longDescription:
      "COSMOS: AI-POMPEII is an AI-driven heritage preservation and disaster-response system built for the Google Gemini Vibe Coding Hackathon, applying generative AI to support cultural-heritage monitoring and response.",
    categories: ["Generative AI"],
    techStack: [
      "TypeScript",
      "Google Gemini",
      "React",
    ],
    results:
      "Hackathon project applying Gemini to cultural-heritage preservation and disaster response.",
    github: "https://github.com/amanparganiha/cosmos-ai-pompeii",
  },
  {
    id: "11",
    title: "Role Prep Roadmaps — Learning Tracker",
    description:
      "Zero-dependency web app for tracking structured learning roadmaps, with curated AI/ML career tracks and interview resources.",
    longDescription:
      "A self-contained roadmap tracker that ships as a single HTML file — no framework, no build step, no backend. It organizes five curated tracks (AI/ML Engineer, Computer Vision Engineer, Forward Deployed Engineer, Remote AI Career, and my VL-JEPA thesis) into roadmaps, interview prep, Q&A banks, and resource lists. Progress is checked off per item and persisted in localStorage, with a live completion bar, light/dark themes, and adjustable text size.",
    categories: ["Tools"],
    techStack: ["HTML", "CSS", "JavaScript", "localStorage", "GitHub Pages"],
    results:
      "Single-file app with zero dependencies — per-track progress persists locally across sessions.",
    github: "https://github.com/amanparganiha/Roadmaps",
    demo: "https://amanparganiha.github.io/Roadmaps/roadmaps/index.html",
  },
];


// GitHub username — used for live activity (recent repos, contribution graph, PR feed).
export const githubUsername = "amanparganiha";

export interface Contribution {
  repo: string; // "owner/repo"
  url: string; // link to the merged PR (or the repo)
  title: string; // what the contribution was
  description: string; // a short note on what you did / why it mattered
  status: "merged" | "open" | "closed";
}

// Curated open-source highlights. The Open Source page also shows a live feed of
// all your pull requests pulled from the GitHub API, so this is just for the
// contributions you most want to feature.
export const contributions: Contribution[] = [
  {
    repo: "matplotlib/matplotlib",
    url: "https://github.com/matplotlib/matplotlib/pull/31422",
    title: "Improve legend loc and bbox_to_anchor documentation (#26620)",
    description:
      "Clarified the legend positioning docs for `loc` and `bbox_to_anchor`, resolving issue #26620. Reviewed and approved by core maintainer timhoffm, merged, and shipped in v3.11.0.",
    status: "merged",
  },
  {
    repo: "jupyterlab/jupyterlab",
    url: "https://github.com/jupyterlab/jupyterlab/pull/18610",
    title: "Remove explicit timeouts in terminal Playwright tests",
    description:
      "Improved the reliability of JupyterLab's terminal end-to-end test suite by removing brittle explicit timeouts. Merged after multi-round maintainer review.",
    status: "merged",
  },
  {
    repo: "jupyterlab/jupyterlab",
    url: "https://github.com/jupyterlab/jupyterlab/pull/18668",
    title: "Add documentation about the Metadata Editor — Advanced Tools interface",
    description:
      "Authored new documentation explaining the Metadata Editor in JupyterLab's Advanced Tools panel. Approved by maintainers and merged.",
    status: "merged",
  },
];
