# YourBrew — Official Website

> **The Ultimate Startup Enabler** | [yourbrew.online](https://yourbrew.online/)

The official marketing website for **YourBrew**, a startup enablement venture offering services ranging from cloud infrastructure setup and MVP development to fundraising support. This repository contains the complete frontend codebase built as a freelance commission project.

---

## 🌐 Live Website

🔗 **[https://yourbrew.online/](https://yourbrew.online/)**

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | React 19                          |
| Build Tool | Vite                              |
| Styling    | CSS (component-scoped)            |
| Linting    | ESLint                            |
| Deployment | Static hosting (single HTML build)|

---

## 📁 Project Structure

```
yourbrewofficial/
├── public/               # Static assets (favicon, images)
├── src/                  # React source code
│   └── main.jsx          # Application entry point
├── server/               # Server-side utilities (if any)
├── YourBrew.html         # Production build — injected & bundled output
├── inject_and_copy.py    # Script to inject build into deployable HTML
├── index.html            # Vite HTML entry point
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Dependencies & scripts
```

---

## ✨ Features

- **Fully responsive** marketing website tailored for YourBrew's startup-enabler brand
- **Single-page layout** with smooth navigation across service offerings
- **Production-ready build** compiled into a single `YourBrew.html` via a custom Python injection script
- SEO-friendly meta tags including description and viewport settings
- Optimised asset bundling via Vite for fast load times

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
git clone https://github.com/UtkarshArora09/yourbrewofficial.git
cd yourbrewofficial
npm install
```

### Development

```bash
npm run dev
```

Starts the local dev server at `http://localhost:5173` with Hot Module Replacement (HMR).

### Production Build

```bash
npm run build
```

Outputs optimised static files to the `dist/` folder.

### Deploy (Single HTML)

```bash
python inject_and_copy.py
```

Injects the Vite build into `YourBrew.html` — a self-contained deployable file.

---

## 🏢 About YourBrew

YourBrew is a startup enablement platform that helps early-stage founders navigate the most challenging phases of building a company — from setting up cloud infrastructure and building MVPs to securing fundraising. Learn more at [yourbrew.online](https://yourbrew.online/).

---

## 👨‍💻 Developer

**Frontend built by [Utkarsh Arora](https://github.com/UtkarshArora09)** — commissioned freelance work.

- 🔗 GitHub: [@UtkarshArora09](https://github.com/UtkarshArora09)

---

## 📄 License

This project was developed as a commercial commission for YourBrew. All rights to the brand, design, and content belong to YourBrew. The codebase is shared for portfolio purposes only.
