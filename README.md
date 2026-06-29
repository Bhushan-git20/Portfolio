# 🚀 Premium Developer Portfolio

A high-end, interactive developer portfolio built with React, TypeScript, and Vite. This portfolio is designed to immediately grab attention with a stunning Dark Mode UI, dynamic terminal animations, and a real-time, fully interactable 3D physical ID card lanyard.

![Portfolio Preview](./public/favicon.svg) <!-- Feel free to replace with a real screenshot! -->

## ✨ Features

- **Interactive 3D Lanyard**: A custom WebGL implementation using `@react-three/fiber` and `@react-three/rapier` to simulate a physics-based, swinging lanyard holding a 3D ID card. You can drag and throw it!
- **Dynamic Typed Hero**: Utilises `react-type-animation` to actively type out core competencies.
- **Simulated Terminal**: A real-time visual demonstration of an automation script (`pipeline.py`) running in a mock terminal window.
- **Infinite Marquee**: The skills section continuously scrolls through the tech stack using custom CSS keyframes.
- **Project Storytelling**: Project cards are structured with Problem/Solution/Result blocks for maximum impact.
- **Mini AI Chatbot**: A floating frontend UI widget for an AI assistant.
- **Web3Forms Integration**: Fully functional, serverless contact form.
- **Strict Dark Mode**: Sleek, immersive dark aesthetic customized for premium readability and contrast.

## 💻 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite
- **3D Engine**: Three.js, React Three Fiber, React Three Drei, Rapier Physics
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid, custom `@keyframes`)
- **Icons**: `react-icons` (Feather, Simple Icons, FontAwesome)
- **Animations**: `framer-motion`, `react-type-animation`

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

3. **Run the development server:**
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
