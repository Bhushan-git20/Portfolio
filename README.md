# 🚀 Premium Developer Portfolio

A high-end, interactive developer portfolio built with React, TypeScript, and Vite. This portfolio is designed to immediately grab attention with dynamic terminal animations, an infinite scrolling tech stack marquee, and a built-in AI chatbot interface.

![Portfolio Preview](./public/favicon.svg) <!-- Feel free to replace with a real screenshot! -->

## ✨ Features

- **Dynamic Typed Hero**: Utilises `react-type-animation` to actively type out the developer's core competencies.
- **Simulated Terminal**: A real-time visual demonstration of an automation script (`pipeline.py`) running in a mock terminal window.
- **Dark/Light Mode**: Full theme switching support with persistent CSS variables and dynamic icon color shifting.
- **Interactive Cursor Glow**: A custom `radial-gradient` that tracks the user's mouse movements, providing a "golden fire" ambient glow on the page.
- **Infinite Marquee**: The skills section continuously scrolls through the tech stack using custom CSS keyframes.
- **Project Storytelling**: Project cards are structured with Problem/Solution/Result blocks for maximum recruiter impact.
- **Click-to-Copy Email**: Custom tooltip implementation for quick clipboard copying.
- **Mini AI Chatbot**: A floating frontend UI widget for an AI assistant (live and hooked up via a Vercel proxy backend).
- **Web3Forms Integration**: Fully functional, serverless contact form.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid, custom `@keyframes`)
- **Icons**: `react-icons` (Feather, Simple Icons, FontAwesome)
- **Animations**: `react-type-animation`, Intersection Observer API
- **Analytics**: Vercel Analytics (`@vercel/analytics`)

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
   The application will be available at `http://localhost:5173` (or whatever port Vite assigns).

## ⚙️ Configuration

### Contact Form (Web3Forms)
To receive emails from the contact form:
1. Get a free API key from [Web3Forms](https://web3forms.com/).
2. Open `src/portfolio.jsx`.
3. Locate the form section and replace `"YOUR_ACCESS_KEY_HERE"` with your actual API key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
   ```

### Customizing Data
All user data is centralised at the top of `src/portfolio.jsx`. You can easily modify:
- `NAME_DATA` (Hero title)
- `PROJECTS` (Project cards and details)
- `SKILLS` (Marquee categories and icons)
- `CERTS` (Certifications list)

## 🌐 Deployment

This project is optimized for deployment on Vercel. 
1. Push your code to GitHub.
2. Import the repository into your Vercel dashboard.
3. Deploy! Vercel Analytics will automatically begin tracking visitors.

---
*Designed & Built by Damisetti Bhushanam*
