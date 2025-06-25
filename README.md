# Atletize - Template System

Welcome to the repository for the **Atletize Template System**, an innovative and customizable platform designed to empower university athletic associations (Atléticas) with a professional, fully-branded online presence.

This system provides a scalable, feature-rich solution for establishing a strong digital footprint, managing operations, and driving revenue. Each deployment is personalized to reflect the unique branding, colors, and identity of the athletic association.

**Live Preview:** <https://atletica-template.vercel.app/en>

## ✨ Key Features

This platform is more than just a website; it's a complete management ecosystem.

* **🏆 Hall of Fame:** Celebrate the legacy of standout athletes. Showcase their profiles, achievements, and contributions to the community in a dedicated and honorable section.
* **🏀 Modalities:** A comprehensive overview of all sports the association participates in. Includes detailed sections for achievements, trophies, competition schedules, and team training times.
* **📈 Management & History:** Introduce the leadership team, from the president to directors, with detailed profiles. Tell the story of the association's origins, mission, and values through a beautifully designed history page with an annual timeline.
* **🗳️ Interactive Voting System:** Engage the community by allowing members to vote for the "Best Player of the Season" or top athletes across different sports.
* **🛍️ E-Commerce Store:** Generate revenue with a fully integrated store for selling branded merchandise, including apparel, accessories, and event tickets.
* **💳 Associate Program & Digital Cards:** A complete membership system powered by Stripe for recurring subscriptions. Members get digital, QR-code-enabled membership cards that can be used for accessing events and partner discounts.
* **📱 Fully Responsive Design:** A clean, modern, and intuitive interface that looks and works great on any device, from desktops to mobile phones.

## 🚀 Technology Stack

This project is built on a powerful, modern, and scalable technology stack to ensure a high-quality user experience and developer efficiency.

* [**Next.js**](https://nextjs.org/): The core React framework, providing Server-Side Rendering (SSR), Static Site Generation (SSG), and a robust routing system.
* [**React**](https://reactjs.org/): The library for building interactive and dynamic user interfaces.
* [**Supabase**](https://supabase.io/): The open-source Firebase alternative used for database management, and authentication.
* [**Stripe**](https://stripe.com/): The industry standard for payment processing, integrated for handling e-commerce transactions and recurring membership subscriptions.
* [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework for rapid and consistent UI development.
* [**Shadcn/ui**](https://ui.shadcn.com/): A collection of beautifully designed, accessible, and reusable components built on top of Radix UI and Tailwind CSS.
* [**TypeScript**](https://www.typescriptlang.org/): For static typing, leading to a more robust and maintainable codebase.
* [**Vercel**](https://vercel.com/): The deployment platform, ensuring effortless, scalable, and high-performance hosting.

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.x or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A [Supabase](https://supabase.io/) account and project.
* A [Stripe](https://stripe.com/) account for payment processing.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/SavioCastellar/atletize.git](https://github.com/SavioCastellar/atletize.git)
    cd atletize/frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the `frontend` directory. You will need to get API keys and URLs from your Supabase and Stripe dashboards.
    ```env
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    # Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
    STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

5.  **Open the application:**
    Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

This project uses the Next.js App Router for its structure.

```
/src
|-- /app            # Main application directory for routes
|   |-- /api        # API routes for backend functions
|   |-- /(pages)    # Grouped routes for main pages (e.g., /dashboard, /store)
|   |   |-- /dashboard
|   |   |   |-- page.tsx
|   |-- layout.tsx  # Root layout
|   |-- page.tsx    # Home page
|
|-- /components     # Reusable components (using Shadcn/ui)
|   |-- /ui         # Unstyled components from Shadcn/ui
|   |-- /shared     # Custom shared components (e.g., Logo, Header)
|
|-- /lib            # Utility functions, helpers, and Supabase client
|-- /styles         # Global styles
```