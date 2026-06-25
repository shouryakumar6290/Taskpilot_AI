# TaskPilot AI 🚀

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.15.0-FFCA28?logo=firebase&logoColor=black&style=flat-square)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

TaskPilot AI is an advanced, high-fidelity productivity dashboard. Combining **real-time engine capabilities** with custom **risk-prediction algorithms**, TaskPilot AI goes beyond standard to-do lists to predict task failures before they happen, recalculate workflow health metrics dynamically, and reward progress with gamified progression states.

---

## 🎨 Visual Identity & Theme

TaskPilot is built with a custom-engineered **Dark Sci-Fi Cyberpunk Theme**:
* **High Contrast Elements:** Deep carbon-slate backdrops (`#09090b`) contrasted by luminous active glow states.
* **Fluid UI Motion:** Powered by `@motion/react` to deliver physical spring micro-animations, staggered card entrances, and smooth, responsive states.
* **Visual Rhythm:** Clean "Space Grotesk" displays paired with "JetBrains Mono" layouts for structural technical statistics.

---

## ⚡ Key Architectural Features

### 🔮 1. Risk-Predictive Priority Engine
The engine continuously assesses your tasks to classify their failure probability. It applies the following risk matrix dynamically:
* 🚨 **Critical:** Remaining hours to deadline are lower than the estimated completion time.
* ⚠️ **At Risk:** Urgent deadline approaching soon, requiring immediate attention.
* 📅 **Overdue:** The deadline timestamp has already passed.
* 🛡️ **Safe:** Plenty of buffer time exists, or the task has been marked as **completed**.

### 🗄️ 2. Hybrid Persistence Engine (Offline-First)
* **Instant Offline State:** Fully operational without network coverage. All tasks, completions, and progress metrics are backed up in the client-side `localStorage` state registry (`taskpilot_tasks`).
* **Firebase Sync Backup:** When a network connection and valid permissions are established, state changes seamlessly persist to Google Cloud Firestore in the background. If database write permissions are temporarily restricted, the system gracefully catches it to provide uninterrupted local performance.

### 🔐 3. Frictionless Authentication Bypass
* **Zero-config Guest Mode:** If Firebase Authentication methods are not enabled or undergo maintenance, users are safely redirected to a simulated Guest Account (`guest@taskpilot.ai`), avoiding blocking errors and providing immediate, full utility access.

---

## 🛠️ Built With (Technologies Used)

TaskPilot AI relies on a modern, high-performance web development stack:

### Frontend Layer
* **React 19:** Built with modern hooks, custom contexts, and performant functional components.
* **TypeScript:** End-to-end static type-safety, enforcing contracts for schemas, risk levels, and custom state actions.
* **Tailwind CSS v4:** High-performance, compile-time utility styling.
* **Motion (framer-motion):** Native spring mechanics and layout-preserving transitions.
* **Lucide React:** Lightweight, modern vector SVG icons.

### Server & Storage Layer
* **Vite 6:** Lightning-fast HMR and build pipelines.
* **Firebase Client SDK (v12):** Firestore real-time database listener subscriptions and Google Authentication popup integration.
* **Node.js (Express + TSX):** Full-stack server backend capabilities.
* **Esbuild:** Blazing fast production compilation of full-stack bundles.

---

## 📂 Project Structure

```bash
├── public/               # Static assets, icons, and logo assets
├── src/                  # Application source code
│   ├── components/       # Reusable UI controls, layout cards, and navigation bars
│   │   └── UI/           # Animated buttons, gradient typography, and custom panels
│   ├── contexts/         # React Context State Engine (TaskContext, AuthContext)
│   ├── pages/            # View components (Dashboard, Login, Analytics)
│   ├── services/         # Firebase app configuration integrations
│   ├── types.ts          # Strongly-typed Task, User, and Risk state models
│   ├── index.css         # Tailwind CSS directives & Custom theme definitions
│   └── main.tsx          # Client-side mounting entrypoint
├── README.md             # Project documentation and developer guidelines
├── index.html            # Main SPA HTML structure template
├── tailwind.config.js    # Tailwind CSS configuration and design theme extensions
└── vite.config.ts        # Vite execution, building, and alias configurations
```

---

## ⚙️ Installation & Setup

### Prerequisites
* Node.js (version 18 or above recommended)
* NPM or Yarn

### Step-by-Step Guide

1. **Clone the repository and navigate into the folder:**
   ```bash
   git clone https://github.com/yourusername/taskpilot-ai.git
   cd taskpilot-ai
   ```

2. **Install all workspace dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   *Create a `.env` file in the root directory:*
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Launch the developer instances:**
   ```bash
   npm run dev
   ```
   *Your local sandbox will spin up on [http://localhost:3000](http://localhost:3000).*

5. **Build and bundle for production deployment:**
   ```bash
   npm run build
   ```

6. **Start production server instance locally:**
   ```bash
   npm run start
   ```

---

## 📋 Firestore Collection Mapping

When linking your own Firebase project, your data structure will resolve dynamically. You do **not** need to create these folders ahead of time:

* **Users Registry:**
  `users/{userId}`  *(stores timestamp metadata of when users initialized their profile)*
* **Sub-Collections Tasks:**
  `users/{userId}/tasks/{taskId}`  *(tracks title, deadline, required hours, status, and custom category tags)*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
