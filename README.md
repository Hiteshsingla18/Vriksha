<div align="center">
  
# 🌳 Vriksha: The Living Talent Graph
**Build for Bharat 2.0 Hackathon — Intelligent Talent and Workforce Ecosystem**

[![Next.js](https://img.shields.io/badge/Built_with-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Google AI Studio](https://img.shields.io/badge/Powered_by-Google_AI_Studio-4285F4?logo=google)](https://aistudio.google.com/)
[![Database](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

*One unified skill graph. Six operational lenses. Zero padded resumes.*

</div>

---

## 🚨 The Disconnect (Problem Statement)
The tech ecosystem is fragmented and blind. Students learn *X*, colleges teach *Y*, and the industry demands *Z*. Resumes are keyword-padded, making them unreliable indicators of true competency, while educational institutions lack real-time telemetry to update their curricula before placements suffer.

## 💡 The Solution: Vriksha
Vriksha is a **Living Talent Graph** that breathes in real-time market demand and measures actual code comprehension rather than self-reported skills. By replacing static PDFs with a dynamic, AI-parsed capability matrix, Vriksha acts as a real-time translator between the Supply (Students), the Demand (Companies), and the Factory (Colleges).

---

## 🏗️ System Architecture

The ecosystem relies on an automated pipeline that ingests live job postings and verifies user competency through Proof-of-Work (PoW).

```mermaid
graph TD
    subgraph Input Layer
        A[Live Job Market Data] -->|Scraping/APIs| C(Data Normalization)
        B[User GitHub / Codebase] -->|AST Parsing| C
    end

    subgraph Intelligence Engine
        C --> D{Google AI Studio LLM}
        D -->|Entity Extraction| E[Global Skill Graph]
        D -->|Comprehension Check| F[Micro-Assessments]
    end

    subgraph The 6 Lenses
        E --> G[Explorer: Career Discovery]
        E --> H[Builder: Gap Analysis & Roadmaps]
        E --> I[Grower: Pro Mobility]
        E --> J[Colleges: Curriculum Diff]
        E --> K[Hiring: Verified Talent Matching]
        E --> L[Company: Build vs. Buy]
        
        F -.-> H
        F -.-> K
    end

    classDef core fill:#12180F,stroke:#4C9A3B,stroke-width:2px,color:#fff;
    classDef ai fill:#1A2015,stroke:#C9622F,stroke-width:2px,color:#fff;
    class E core;
    class D ai;
