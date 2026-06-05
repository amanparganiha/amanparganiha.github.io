import { githubUsername } from "@/data/portfolio";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  created_at: string;
  repository_url: string;
  pull_request?: { merged_at: string | null };
}

const API = "https://api.github.com";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** Most recently pushed non-fork repositories. */
export async function fetchRecentRepos(limit = 6): Promise<Repo[]> {
  const repos = await getJson<Repo[]>(
    `${API}/users/${githubUsername}/repos?sort=pushed&per_page=30`
  );
  return repos.filter((r) => !r.fork).slice(0, limit);
}

/** All pull requests authored by the user across GitHub, most recently updated first. */
export async function fetchPullRequests(limit = 30): Promise<PullRequest[]> {
  const data = await getJson<{ items: PullRequest[] }>(
    `${API}/search/issues?q=author:${githubUsername}+type:pr&sort=updated&order=desc&per_page=${limit}`
  );
  return data.items ?? [];
}

/** "owner/repo" derived from a repository_url like https://api.github.com/repos/owner/repo */
export function repoFromUrl(repositoryUrl: string): string {
  return repositoryUrl.replace(`${API}/repos/`, "");
}

export function prStatus(pr: PullRequest): "merged" | "open" | "closed" {
  if (pr.pull_request?.merged_at) return "merged";
  return pr.state;
}
