# 🔎 RiskLens

### AI-Powered Environmental Risk Analysis Dashboard

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-Fast%20Build-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-green)

RiskLens is an **AI-powered environmental intelligence platform** that analyzes environmental signals and provides **risk insights, geospatial visualization, and AI-generated recommendations**.

The system integrates **AI reasoning, map visualization, automated summaries, and reporting tools** to help users understand environmental threats and take informed actions.

🌐 **Live Demo**

[https://risk-lens-gules.vercel.app/](https://risk-lens-gules.vercel.app/)

---

# 🚀 Features

### 🌍 Interactive Risk Map

Visualize environmental regions and monitor risk signals directly on a **2D interactive map**.

### 🤖 AI Risk Analysis

Uses **Google Gemini AI** to analyze environmental signals and generate insights.

### 💬 AI Chat Assistant

Ask questions and interact with an AI assistant for deeper environmental insights.

### 📊 Automated Risk Summaries

AI generates structured summaries explaining risk patterns and mitigation steps.

### 🚨 Alert Monitoring

High-risk environmental signals trigger alerts on the dashboard.

### 📄 Report Export

Generate **PDF reports** containing analysis summaries.

### 🌐 Multi-Language Support

Translation support to make the platform accessible globally.

---

# 🎥 Demo

### Dashboard Demo

*(Add a GIF here later)*

```
docs/dashboard-demo.gif
```

Example once you add it:

```markdown
![Dashboard Demo](docs/dashboard-demo.gif)
```

---

# 📸 Screenshots

### Risk Dashboard

```
docs/dashboard.png
```

### Map Visualization

```
docs/map.png
```

### AI Chat Assistant

```
docs/chatbot.png
```

### Risk Analysis Summary

```
docs/analysis.png
```

*(Create a `docs` folder in your repo and place images there.)*

---

# 🧠 System Architecture

```
User
  │
  ▼
React + Vite Frontend
  │
  ▼
AI Service Layer
(Google Gemini API)
  │
  ▼
Risk Analysis Engine
  │
  ▼
Visualization Layer
(Map + Dashboard + Charts)
  │
  ▼
Report Generator
(html2canvas + jsPDF)
```

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS

## AI Integration

* Google Gemini API

## Visualization

* Interactive Map Component
* Dashboard UI

## Utilities

* html2canvas
* jsPDF
* React Markdown

## Deployment

* Vercel

---

# 📂 Project Structure

```
RiskLens
│
├── components
│   ├── AlertOverlay.tsx
│   ├── AnalysisSummary.tsx
│   ├── ChatBot.tsx
│   ├── Map2D.tsx
│   ├── Sidebar.tsx
│   └── Header.tsx
│
├── services
│   └── geminiService.ts
│
├── public
│   ├── images
│   └── assets
│
├── App.tsx
├── index.tsx
├── types.ts
└── vite.config.ts
```

---

# ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/AMANkumar0004/RiskLens.git
```

### Navigate to project folder

```bash
cd RiskLens
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```
VITE_GEMINI_API_KEY=your_api_key_here
```

# 📈 Future Improvements

* Satellite data integration
* Flood prediction models
* Historical risk trend analysis
* Advanced geospatial analytics
* Role-based authentication
* Real-time environmental data feeds

---

# 🎯 Use Cases

* Environmental risk monitoring
* Disaster preparedness
* Smart city analytics
* Urban planning
* Academic research

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the project
🛠 Contribute improvements

---

MIT License

Copyright (c) 2026 Aman Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

