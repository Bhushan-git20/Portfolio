# 🚀 Premium Developer Portfolio

A high-end, interactive developer portfolio built with React, TypeScript, and Vite. This portfolio is designed to immediately grab attention with a stunning Dark Mode UI, dynamic terminal animations, an interactive 3D physical ID card lanyard, smooth inertial scrolling, and a responsive custom canvas background.

![Portfolio Preview](./public/favicon.svg) <!-- Feel free to replace with a real screenshot! -->

## ✨ Features

- **Interactive 3D Lanyard**: A custom WebGL implementation using `@react-three/fiber` and `@react-three/rapier` to simulate a physics-based, swinging lanyard holding a 3D ID card. You can drag and throw it!
- **Interactive ShapeGrid Background**: A custom HTML5 Canvas-based animation grid (`<ShapeGrid />`) running in the Hero section, reacting dynamically with cursor hover trails, fading paths, and diagonal movement.
- **ScrollStack Projects Section**: A GPU-optimized stacked cards layout (`<ScrollStack />`) bound to the window scroll. Includes custom scale, rotation, and blur-out animations that stack project cards smoothly as you scroll down, optimized with coordinate caching to avoid layout thrashing.
- **Single-Instance Global Smooth Scrolling**: Driven by `lenis` on the document level, providing a liquid scrolling experience across all sections while preserving native scroll hooks.
- **Resilient RAG Chatbot**: Features a floating portfolio chat assistant utilizing the Gemini API (`gemini-2.0-flash`, `gemini-2.0-flash-lite`, and `gemini-1.5-flash-latest`), backed by a client-side rule-matching engine fallback to ensure 100% availability even when API quotas are exceeded.
- **Simulated Terminal**: A real-time visual demonstration of an automation script (`pipeline.py`) running in a mock terminal window.
- **Infinite Marquee**: The skills section continuously scrolls through the tech stack using custom CSS keyframes.
- **Project Storytelling**: Project cards are structured with Problem/Solution/Result blocks for maximum impact.
- **Web3Forms Integration**: Fully functional, serverless contact form.
- **Strict Dark Mode**: Sleek, immersive dark aesthetic customized for premium readability and contrast.

## 💻 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript (Strict Mode)
- **Bundler**: Vite
- **3D Engine**: Three.js, React Three Fiber, React Three Drei, Rapier Physics
- **Smooth Scroll**: Lenis v1
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid, custom `@keyframes`)
- **Icons**: `react-icons` (Feather, Simple Icons, FontAwesome)
- **Animations**: `framer-motion`

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
All user data is centralised at the top of `src/App.tsx`. You can easily modify the Hero title, Projects, Skills, and other details.

## ☁️ Deployment

This project is optimized for modern deployment platforms like Vercel or Netlify. 
1. Push your code to GitHub.
2. Import the repository into your dashboard.
3. Deploy!

---
*Designed & Built by Damisetti Bhushanam*
