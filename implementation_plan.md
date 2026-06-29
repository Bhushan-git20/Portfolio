# Portfolio Refactor & Upgrade Plan

This plan outlines the complete restructuring of the portfolio to improve recruiter clarity, highlight AI automation expertise, and add premium animations—all while strictly preserving the existing black-and-white visual identity, typography, and orange accent palette.

> [!IMPORTANT]
> **Design Rules Maintained:** No major layout/color redesigns, no particle effects/blobs, and no heavy parallax. The core aesthetic remains untouched.

## Open Questions

1. **React Bits Integration:** You mentioned the React Bits MCP server/CLI. I do not currently have the React Bits MCP server connected to my environment. However, we can definitely use React Bits! Should I install the React Bits CLI directly via `npx` into your project so we can scaffold those approved animations (e.g., text reveals, count-ups, and spotlight cards)?
2. **Architecture Diagrams:** For the MindCare and Job Automation Pipeline architecture flows, do you have any specific icons you want me to use for the nodes (React, FastAPI, n8n, etc.), or should I use simple text-based diagram blocks with animated connections?

## Proposed Changes

---

### 1. Navigation & Hero Section
*   **Nav Updates:** Ensure the navbar is sticky, with active section highlighting, smooth scrolling, and a subtle blur backdrop (`backdrop-filter: blur()`).
*   **Hero Updates:**
    *   Reduce profile image size by 30-40%.
    *   Make the headline the primary focal point: "AI Automation Engineer".
    *   Update subheadline: "Building AI agents, workflow automations, and intelligent systems that create measurable business outcomes."
    *   Remove any existing "Scroll" buttons.
    *   Refine the primary and secondary CTA buttons.
    *   *Animation:* Add Text Reveal effect from React Bits.

### 2. Stats Section
*   **Content Updates:** Remove CGPA and vanity metrics. Replace with:
    *   Projects Built
    *   AI Automations
    *   Internship Experience
    *   Research Publications
    *   Technologies Used
*   **Animation:** Integrate React Bits count-up animation for all numbers.

### 3. Projects Section (Highest Priority)
*   **Layout Conversion:** Remove the modal-based flow completely. Migrate all projects to the side-by-side "Inline Case Study" layout.
*   **Structure per Project:** `Problem → Solution → Impact → Tech Stack`.
*   **Project Ordering:**
    1. HireReady
    2. MindCare
    3. Job Automation Pipeline
    4. Remaining projects
*   **Animation:** Add React Bits Spotlight hover effect and subtle card lift on hover.

### 4. Architecture Diagrams (New)
*   Implement dedicated architecture sections for your top projects using a clean node-based layout.
*   **MindCare:** React → FastAPI → Gemini → Supabase
*   **Job Automation Pipeline:** Data Sources → n8n → AI Models → Notion → Telegram
*   **Animation:** Add subtle animated connection lines flowing between nodes.

### 5. Automation Expertise Section (New)
*   Add a new section titled: **"Automation Systems I Build"**.
*   List capabilities: AI Agents, Workflow Automation, Lead Generation Systems, CRM Automation, Research Automation, Document Processing, AI Chat Systems.

### 6. Experience & Education Section
*   **Layout:** Convert to a premium two-column layout (Professional Experience on Left, Education on Right).
*   **Animation:** Integrate a React Bits scroll progress animation. As the user scrolls down the timeline, the timeline line fills up and current milestones highlight.

### 7. AI Automation Lifecycle Section (New)
*   Add a new section showing your engineering process.
*   **Flow:** Problem Discovery → Workflow Design → AI Integration → Deployment → Optimization.
*   **Animation:** Implement a scroll-based progress line that fills and highlights the active step.

### 8. Contact Section
*   **Copy Update:** Change the main headline to "Let's Build Something Useful".
*   **Roles:** Add tags for "Open To: AI Engineer Roles, Python Developer Roles, AI Automation Engineer Roles, Freelance Automation Projects".

### 9. About Section
*   Keep the existing text content.
*   **Animation:** Integrate the React Bits ID card tilt effect with subtle 3D rotation and spring physics (inspired by Anand's portfolio).

---

## Verification Plan

### Manual Verification
- We will visually verify that the black/white/orange aesthetic is strictly preserved.
- We will scroll through the page to test all React Bits animations (tilt, scroll progress, text reveal).
- We will verify the side-by-side layout functions correctly on both desktop and mobile viewports.
- We will verify that no modal popups remain for the projects.
