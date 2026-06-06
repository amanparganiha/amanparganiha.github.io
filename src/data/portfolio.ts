export const personalInfo = {
  name: "Aman Parganiha",
  title: "AI & Software Engineer",
  tagline: "Building AI systems and scalable software that solve real-world problems.",
  photo: "/profile.jpg",
  email: "aman.parganiha.16@gmail.com",
  location: "India",
  about:
    "I'm an M.Tech CSE (AI/ML) student at IIIT Naya Raipur with strong foundations in Data Structures, Algorithms, and Software Systems. I build scalable AI applications including Retrieval-Augmented Generation (RAG) pipelines and multimodal machine learning systems. My focus is on clean software architecture and production-ready AI solutions.",

stats: [
    { label: "Projects Built", value: "9" },
    { label: "LeetCode Problems", value: "200+" },
    { label: "Current CGPA", value: "8.0/10" },
    { label: "Specialization", value: "AI/ML" },
  ],
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
  period: string;
  description: string;
  highlights: string[];
}

export const experiences = [
  {
    role: "M.Tech CSE (AI/ML)",
    company: "IIIT Naya Raipur",
    period: "2025 — Present",
    description:
      "Focused on AI/ML systems, scalable software engineering, and advanced computer science concepts.",
    highlights: [
      "Built scalable RAG pipelines for document retrieval",
      "Worked on multimodal machine learning systems",
      "Applied clean architecture and modular design principles",
    ],
  },
  // TODO(aman): add real internships/roles here. (Note: the ims-zeotap repo is labeled a
  // "Zeotap SRE Intern Assignment" — if that was an actual internship/role, add it; if it
  // was only an application/take-home assignment, do NOT list it as employment.)
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
    category: "Programming Languages",
    skills: ["C++", "Python", "SQL"],
  },
  {
    category: "Machine Learning & AI",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "NLP",
      "Deep Learning",
      "Model Evaluation",
    ],
  },
  {
    category: "Data Engineering & Tools",
    skills: [
      "Pandas",
      "NumPy",
      "Git",
      "Linux",
      "AWS",
      "ETL Pipelines",
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
  {
    category: "Software Engineering",
    skills: [
      "Scalable Systems",
      "Design Patterns",
      "Clean Code",
      "Debugging",
    ],
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


export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category:
    | "NLP"
    | "Computer Vision"
    | "Data Analysis"
    | "MLOps"
    | "Generative AI"
    | "Reinforcement Learning";
  techStack: string[];
  results: string;
  image?: string;
  github?: string;
  demo?: string;
}

export const projects = [
  {
    id: "1",
    title: "Event-Driven Retrieval-Augmented Generation Agent",
    description:
      "End-to-end RAG system for asynchronous document ingestion and semantic retrieval.",
    longDescription:
      "Architected a scalable RAG pipeline using Inngest workflows, Qdrant vector DB, and LlamaIndex. Integrated GPT-4o with context-aware prompting. Built FastAPI backend and Streamlit frontend, containerized with Docker.",
    category: "Generative AI",
    techStack: [
      "Python",
      "FastAPI",
      "Qdrant",
      "LlamaIndex",
      "OpenAI API",
      "Docker",
    ],
    results:
      "Optimized chunking and embedding strategy to improve retrieval precision.",
    github: "https://github.com/amanparganiha/Event-Driven-RAG-Agent",
  },
  {
    id: "2",
    title: "Multimodal Credit Risk Analysis using SEC XBRL & NLP",
    description:
      "Multimodal ML pipeline combining financial and NLP features for credit risk analysis.",
    longDescription:
      "Processed SEC XBRL filings and engineered financial ratios. Combined structured financial data with NLP-derived sentiment features to train binary and multiclass credit rating models.",
    category: "Data Analysis",
    techStack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "NLP",
      "Git",
    ],
    results:
      "Built scalable multimodal dataset and evaluated multiple ML models.",
    github: "https://github.com/amanparganiha/FDA-10-Multimodal-Credit-Risk-Analysis",
  },
  {
    id: "3",
    title: "GreenCloudRL — Energy-Efficient Cloud Scheduling",
    description:
      "Research framework combining hierarchical RL, meta-learning, and SHAP explainability for adaptive, energy-efficient cloud scheduling.",
    longDescription:
      "A novel research framework that combines Hierarchical Reinforcement Learning (A2C + PPO), Meta-Learning (Reptile), and SHAP explainability to produce adaptive, interpretable, and energy-efficient cloud scheduling policies. Trained and evaluated on real Google and Alibaba cluster traces.",
    category: "Reinforcement Learning",
    techStack: [
      "Python",
      "Reinforcement Learning",
      "PPO",
      "A2C",
      "Meta-Learning",
      "SHAP",
    ],
    results:
      "Trained on real Google and Alibaba cluster traces to deliver interpretable, energy-aware scheduling decisions.",
    github: "https://github.com/amanparganiha/GreenCloudRL",
  },
  {
    id: "4",
    title: "PDF RAG Agent with GPT-4o",
    description:
      "Conversational agent that reads your PDFs and answers questions using RAG, with web search and persistent memory.",
    longDescription:
      "A conversational AI agent powered by OpenAI's GPT-4o that reads PDF documents and answers questions about them using Retrieval-Augmented Generation. Supports web search and persistent memory across sessions.",
    category: "Generative AI",
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
  },
  {
    id: "5",
    title: "Notify — AI Internship Automation Agent",
    description:
      "Multi-agent pipeline that discovers, ranks, and drafts emails for internships. Built for the Google AI Agents Intensive.",
    longDescription:
      "Notify is an AI-powered internship automation agent built for the Google AI Agents Intensive. It streamlines internship discovery, ranking, and personalized email drafting through a coordinated multi-agent pipeline.",
    category: "Generative AI",
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
    category: "Generative AI",
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
    id: "7",
    title: "SHL Conversational Assessment Recommender",
    description:
      "Stateless FastAPI service that helps recruiters find the right SHL assessments through a multi-turn conversation.",
    longDescription:
      "A conversational recommender that clarifies vague requests, recommends assessments from a scraped SHL catalog, and supports refinement and comparison. Uses a single LLM call per turn (Groq) with full conversation history plus TF-IDF–retrieved candidates to classify intent as CLARIFY, RECOMMEND, COMPARE, or REFUSE. Hallucinations are defended in three layers — prompt constraints, JSON-mode enforcement, and server-side schema sanitization — so recommendations only ever reference real catalog items.",
    category: "NLP",
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
    id: "8",
    title: "AI Resume Screening System",
    description:
      "AI-powered tool that ranks resumes against a job description with match scores, strengths, gaps, and recommendations.",
    longDescription:
      "A Streamlit application that evaluates multiple candidate resumes against a job description, ranking them by compatibility. Powered by OpenAI GPT-4o-mini, it produces structured output — a 0–100 match score, identified strengths and skill gaps, and actionable recommendations — for each candidate. Accepts TXT or PDF resumes, ships with a seven-resume demo dataset for instant testing, and exports ranked results to CSV.",
    category: "NLP",
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
    category: "MLOps",
    techStack: [
      "Python",
      "FastAPI",
      "Redis Streams",
      "PostgreSQL",
      "TimescaleDB",
      "Docker",
    ],
    results:
      "Redis Streams buffer handles 10,000+ signals/sec with a 6,000 req/min ingestion endpoint and decoupled async processing.",
    github: "https://github.com/amanparganiha/ims-zeotap",
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
// TODO: replace with your real contributions, or leave empty to show only the live feed.
export const contributions: Contribution[] = [
  {
    repo: "matplotlib/matplotlib",
    url: "https://github.com/matplotlib/matplotlib/pull/31422",
    title: "Improve legend loc and bbox_to_anchor documentation (#26620)",
    description:
      "Clarified the legend positioning docs for `loc` and `bbox_to_anchor`. Merged into matplotlib and shipped in the v3.11.0 milestone.",
    status: "merged",
  },
  {
    repo: "jupyterlab/jupyterlab",
    url: "https://github.com/jupyterlab/jupyterlab/pull/18668",
    title: "Add documentation about the Metadata Editor — Advanced Tools interface",
    description:
      "Authored new documentation explaining the Metadata Editor in JupyterLab's Advanced Tools panel.",
    status: "open",
  },
  {
    repo: "jupyterlab/jupyterlab",
    url: "https://github.com/jupyterlab/jupyterlab/pull/18684",
    title: "Fix stdin input styling to match JupyterLab theme (#14458)",
    description:
      "Proposed a fix so terminal-style stdin input matches the active JupyterLab theme.",
    status: "closed",
  },
];
