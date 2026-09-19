import { describe, it, expect } from "vitest";
import { projectCategories, projects } from "@/data/portfolio";

describe("projects data", () => {
  it("uses unique ids (the command palette deep-links /projects?p=<id>)", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every project at least one label, without repeats", () => {
    for (const p of projects) {
      expect(p.categories.length).toBeGreaterThan(0);
      expect(new Set(p.categories).size).toBe(p.categories.length);
    }
  });

  it("has no empty filter on the Projects page", () => {
    for (const c of projectCategories) {
      expect(projects.some((p) => p.categories.includes(c))).toBe(true);
    }
  });
});
