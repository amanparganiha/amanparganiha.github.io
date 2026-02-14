export const personalInfo = {
  name: "Aman Parganiha",
  title: "AI & Software Engineer",
  tagline: "Building AI systems and scalable software that solve real-world problems.",
  photo: "/ai-portfolio-builder/profile.jpg",
  email: "aman25300@iiitnr.edu.in",
  location: "India",
  about:
    "I'm an M.Tech CSE (AI/ML) student at IIIT Naya Raipur with strong foundations in Data Structures, Algorithms, and Software Systems. I build scalable AI applications including Retrieval-Augmented Generation (RAG) pipelines and multimodal machine learning systems. My focus is on clean software architecture and production-ready AI solutions.",

stats: [
    { label: "Projects Built", value: "10+" },
    { label: "LeetCode Problems", value: "200+" },
    { label: "Current CGPA", value: "8.09/10" },
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
    details: "CGPA: 8.09/10.0",
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


export const certifications = [
  "Google × Kaggle — 5-Day AI Agents Intensive Course",
  "Walmart USA — Advanced Software Engineering Job Simulation",
];


export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "NLP" | "Computer Vision" | "Data Analysis" | "MLOps" | "Generative AI";
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
    github: "YOUR_GITHUB_LINK",
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
    github: "YOUR_GITHUB_LINK",
  },
];


export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Fine-Tuning LLMs: A Practical Guide",
    excerpt:
      "A hands-on walkthrough of fine-tuning large language models for domain-specific tasks, including LoRA, QLoRA, and full fine-tuning approaches.",
    content: `Fine-tuning large language models has become one of the most impactful techniques in modern NLP. In this post, I'll walk through the practical steps of adapting a pre-trained LLM to your specific domain.\n\n## Why Fine-Tune?\n\nWhile pre-trained models like GPT-4 and Llama are incredibly capable, they often lack domain-specific knowledge. Fine-tuning bridges this gap efficiently.\n\n## Approaches\n\n### LoRA (Low-Rank Adaptation)\nLoRA freezes the pre-trained weights and injects trainable rank decomposition matrices. This dramatically reduces the number of trainable parameters.\n\n### QLoRA\nCombines quantization with LoRA for even more memory-efficient training. You can fine-tune a 65B parameter model on a single GPU.\n\n## Best Practices\n1. Start with a high-quality, curated dataset\n2. Use appropriate learning rates (1e-4 to 5e-5)\n3. Monitor for overfitting with validation metrics\n4. Evaluate on held-out test sets with domain-specific metrics`,
    date: "2024-12-15",
    readTime: "8 min",
    category: "NLP",
  },
  {
    id: "2",
    title: "Building Robust ML Pipelines with MLflow",
    excerpt:
      "How to structure your ML experiments for reproducibility, from data versioning to model deployment with MLflow.",
    content: `Reproducibility is one of the biggest challenges in machine learning. In this post, I share my approach to building robust ML pipelines using MLflow.\n\n## The Problem\n\nMost ML projects start as Jupyter notebooks that quickly become unmaintainable. Without proper tracking, it's impossible to reproduce results.\n\n## MLflow Components\n\n### Tracking\nLog parameters, metrics, and artifacts for every experiment run.\n\n### Projects\nPackage your code in a reproducible format with conda environments.\n\n### Model Registry\nVersion and stage your models (Staging → Production) with approval workflows.\n\n## Key Takeaways\n- Track everything from day one\n- Use consistent naming conventions\n- Automate your pipeline with CI/CD`,
    date: "2024-11-02",
    readTime: "6 min",
    category: "MLOps",
  },
  {
    id: "3",
    title: "The State of Computer Vision in 2024",
    excerpt:
      "An overview of the latest breakthroughs in computer vision, from foundation models to real-time edge deployment.",
    content: `Computer vision has seen remarkable progress in 2024. Let's explore the key trends shaping the field.\n\n## Foundation Models\n\nModels like SAM (Segment Anything) and DINOv2 have changed how we approach CV tasks. Instead of training from scratch, we can now leverage these foundation models.\n\n## Edge Deployment\n\nWith optimized architectures like EfficientNet and MobileNet, deploying CV models on edge devices is more practical than ever.\n\n## Multimodal Learning\n\nThe convergence of vision and language (CLIP, GPT-4V) is opening new possibilities for understanding visual content.\n\n## What's Next?\n- Video understanding at scale\n- 3D scene reconstruction\n- Embodied AI and robotics`,
    date: "2024-09-20",
    readTime: "5 min",
    category: "Computer Vision",
  },
  {
    id: "4",
    title: "Data Quality > Model Complexity",
    excerpt:
      "Why investing in data quality consistently outperforms chasing the latest model architectures.",
    content: `After years of building ML systems, I've learned one lesson that stands above all others: data quality matters more than model complexity.\n\n## The 80/20 Rule of ML\n\n80% of your model's performance comes from your data. The remaining 20% comes from architecture and hyperparameter choices.\n\n## Practical Steps\n\n### 1. Data Profiling\nUnderstand your data distributions, missing values, and outliers before training.\n\n### 2. Labeling Quality\nInvest in clear labeling guidelines and inter-annotator agreement metrics.\n\n### 3. Data Augmentation\nUse smart augmentation strategies that reflect real-world variation.\n\n## Conclusion\nBefore reaching for the latest transformer architecture, invest in understanding and cleaning your data. The ROI is almost always higher.`,
    date: "2024-08-05",
    readTime: "4 min",
    category: "Best Practices",
  },
];
