# 🚀 Premium Developer Portfolio

A high-end, interactive developer portfolio built with React, TypeScript, and Vite. Designed to immediately grab attention with a stunning Dark Mode UI, an interactive 3D physical ID card lanyard, smooth inertial scrolling, and a highly performant WebGL Starfield background.

![Portfolio Preview](./public/favicon.svg) <!-- Feel free to replace with a real screenshot! -->

## ✨ Key Features

- **Interactive 3D Lanyard**: A custom WebGL implementation using `@react-three/fiber` and `@react-three/rapier` to simulate a physics-based, swinging lanyard holding a 3D ID card. You can drag and throw it! (Fully memoized for performance).
- **Procedural WebGL Starfield**: An interactive, mouse-tracking 3D starfield running in the background globally (`<Starfield />`), built with Three.js.
- **Custom Hardware-Accelerated Cursor**: A buttery smooth custom cursor (`<CustomCursor />`) that tracks mouse movements bypassing React state for maximum 60FPS performance.
- **ScrollStack Projects Section**: A GPU-optimized stacked cards layout (`<ScrollStack />`) bound to the window scroll. Includes custom scale, rotation, and blur-out animations that stack project cards smoothly as you scroll down.
- **GSAP Text Reveal & Preloader**: A bespoke 0-100% counting preloader and character-by-character staggered slide-up hero text animation mirroring premium agency standards.
- **Single-Instance Global Smooth Scrolling**: Driven by `lenis` on the document level, providing a liquid scrolling experience across all sections while preserving native scroll hooks.
- **Floating AI Assistant (RAG Chatbot)**: Features a decoupled floating portfolio chat assistant (`<PortfolioChatbot />`) utilizing the Gemini API (`gemini-2.0-flash-lite`), backed by a client-side rule-matching engine fallback to ensure basic responses remain available even when API quotas are exceeded.
- **Live GitHub Calendar**: Real-time integration with `react-github-calendar` to showcase live open-source contributions.
- **Web3Forms Integration**: Fully functional, serverless contact form.

## 💻 Tech Stack

- **Framework**: React 19
- **Language**: TypeScript (Strict Mode)
- **Bundler**: Vite
- **3D Engine**: Three.js, React Three Fiber, React Three Drei, Rapier Physics
- **Smooth Scroll**: Lenis
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid, custom `@keyframes`)
- **Animations**: `framer-motion`, `gsap`
- **Data Extractor**: Fully modularized data architecture in `src/data/portfolioData.tsx`

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Bhushan-git20/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**

   Create a `.env` file in the root directory and add your Gemini API Key:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

## ⚙️ Configuration

### Customizing the 3D ID Card

To change the face of the 3D ID card:

1. Replace `public/bhushan.png` with your own image, or update the `frontImage` prop on the `<Lanyard />` component in `src/App.tsx`.

### Contact Form (Web3Forms)

To receive emails from the contact form:

1. Get a free API key from [Web3Forms](https://web3forms.com/).
2. Open `src/App.tsx`.
3. Locate the form section and replace the API key in the hidden input.

### Customizing Data

All static user data is centralised in `src/data/portfolioData.tsx`. You can easily modify the Projects, Skills, and other details by editing this single file without touching the UI logic.

## ☁️ Deployment

This project is optimized for modern deployment platforms like Vercel or Netlify.

1. Push your code to GitHub.
2. Import the repository into your dashboard.
3. Deploy!

---
> Architected & Built by Damisetti Bhushanam
