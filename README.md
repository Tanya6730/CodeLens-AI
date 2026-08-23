# CodeLens AI

> **AI-powered code review and developer assistance platform.**

CodeLens AI helps developers understand, review, and improve source code using large language models. It analyzes submitted code, identifies potential issues, explains why they matter, and provides actionable recommendations for improving quality, readability, maintainability, and correctness.

---

## Overview

CodeLens AI is a full-stack developer tool designed to bring AI-assisted code review into the development workflow.

Instead of manually searching through code for common issues, developers can submit code to CodeLens AI and receive structured feedback covering areas such as:

* Code quality
* Bugs and potential runtime issues
* Code smells
* Maintainability
* Readability
* Best practices
* Possible improvements

The platform combines a modern web interface with a backend API and an AI-powered analysis service.

---

## Key Capabilities

### AI Code Analysis

Analyze source code using an LLM-powered review pipeline and receive contextual feedback rather than simple syntax-based checks.

### Structured Code Reviews

Reviews are organized into clear categories so developers can quickly understand what needs attention.

### Issue Explanation

CodeLens AI doesn't just identify an issue. It explains the problem and why the implementation could be improved.

### Improvement Suggestions

Developers receive practical suggestions and, where appropriate, improved implementations.

### Developer-Focused Interface

A dedicated code editor and review interface make it easy to submit code, trigger analysis, and inspect results.

---

## Architecture

```text
                         ┌─────────────────────┐
                         │       Developer     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │  Code Editor        │
                         │  Review Interface   │
                         │  Results UI         │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │                     │
                         │  Routes             │
                         │  Controllers        │
                         │  Services           │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    AI Service       │
                         │                     │
                         │  Prompt Engineering │
                         │  Code Analysis      │
                         │  Review Generation   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Gemini API      │
                         │       LLM           │
                         └─────────────────────┘
```

---

## Technology Stack

| Layer           | Technology        |
| --------------- | ----------------- |
| Frontend        | React.js          |
| Build Tool      | Vite              |
| Backend         | Node.js           |
| API Framework   | Express.js        |
| AI Integration  | Google Gemini API |
| Communication   | REST API          |
| Development     | VS Code           |
| API Testing     | Postman           |
| Version Control | Git / GitHub      |

---

## Repository Structure

```text
codelens-ai/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ai.controllers.js
│   │   │
│   │   ├── routes/
│   │   │   └── ai.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js 18+
* npm
* Git
* A Google Gemini API key

Verify your installation:

```bash
node --version
npm --version
git --version
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/codelens-ai.git

cd codelens-ai
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=3000
GOOGLE_GEMINI_KEY=your_gemini_api_key
```

> Never commit API keys or environment files to source control.

### 4. Start the Backend

```bash
npm run dev
```

The API will start on:

```text
http://localhost:3000
```

### 5. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

Open the local development URL displayed by Vite.

---

# API

## Code Review

### Endpoint

```http
POST /api/ai/review
```

### Request

```json
{
  "code": "function add() { return 2; }"
}
```

### Response

```json
{
  "review": "The function contains hardcoded logic and does not accept parameters..."
}
```

> The exact response structure may evolve as the review pipeline becomes more structured.

---

# Review Pipeline

A typical CodeLens AI request follows this flow:

```text
Code Submission
      │
      ▼
Input Validation
      │
      ▼
Backend Controller
      │
      ▼
AI Service
      │
      ▼
Prompt Construction
      │
      ▼
Gemini API
      │
      ▼
AI Generated Review
      │
      ▼
Response Processing
      │
      ▼
Frontend Review UI
```

---

# Development

Start the frontend and backend independently during development.

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

For API testing, tools such as Postman can be used to send requests directly to the backend.

---

# Project Status

**Status:** 🚧 Active Development

CodeLens AI is currently under active development. Features, APIs, and internal architecture may change as the platform evolves.

---

<p align="center">
  <strong>CodeLens AI</strong><br>
  Review smarter. Understand deeper. Build better.
</p>
