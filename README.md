

![nexusxai](https://socialify.git.ci/lalitdotdev/nexusxai/image?description=1&font=Raleway&language=1&logo=https%3A%2F%2Fi.pinimg.com%2F1200x%2F6f%2Fb2%2F74%2F6fb274904678d925afbcc4a4a4c60c1e.jpg&name=1&owner=1&pattern=Circuit%20Board&theme=Light)


🌐 AI Nexus
===========


Welcome to **AI Nexus**, an editorial platform that leverages advanced AI technologies to revolutionize content creation, editing, and management. This project combines the power of Anthropic's Claude, Sonnet SDK, and other modern tools to provide a seamless experience for reporters, editors, and administrators.

🚀 Key Features
---------------

*   **AI-Driven Content Creation**: Automatically rewrite and optimize articles using cutting-edge AI.
*   **Role-Based Dashboards**: Tailored interfaces for reporters, editors, and admins, each with specific functionalities.
*   **Real-Time Analytics**: Get insights into content performance, user activity, and more.
*   **Comprehensive User Management**: Manage reporters, editors, and users with advanced tools.
*   **Secure and Scalable**: Built with robust authentication, authorization, and database management.

🛠️ Tech Stack
--------------


| Technology      | Description                                  |
|-----------------|----------------------------------------------|
| **Next.js**     | React framework for building fast web apps   |
| **TypeScript**  | Type-safe JavaScript for better development  |
| **Tailwind CSS**| Utility-first CSS framework                  |
| **Prisma**      | Modern ORM for PostgreSQL                    |
| **TRPC**        | End-to-end typesafe APIs                     |
| **Anthropic SDK** | AI models for advanced content rewriting    |
| **Clerk**       | Authentication and user management           |
| **Stripe**      | Payment processing and subscription management|

## 📋 Project Scripts

| Script               | Description                                          |
|----------------------|------------------------------------------------------|
| `npm run dev`        | Start the development server                         |
| `npm run build`      | Build the project for production                     |
| `npm run start`      | Start the production server                          |
| `npm run lint`       | Run ESLint to find and fix problems                  |
| `npm run tsc`        | Run TypeScript compiler                              |
| `npm run format`     | Format the codebase using Prettier                   |
| `npm run prepare`    | Set up Husky for Git hooks                           |
| `npm run postinstall`| Automatically generate Prisma client                 |

## 🧰 Dependencies

### Production Dependencies

| Package                           | Version    | Description                                             |
|-----------------------------------|------------|---------------------------------------------------------|
| `@anthropic-ai/sdk`               | ^0.27.1    | SDK for integrating Anthropic AI models                 |
| `@clerk/nextjs`                   | ^5.3.7     | Clerk integration for Next.js                           |
| `@hookform/resolvers`             | ^3.9.0     | Resolver for React Hook Form                            |
| `@pinecone-database/pinecone`     | ^3.0.2     | Pinecone vector database client                         |
| `@prisma/client`                  | 5.18.0     | Prisma client for database access                       |
| `@radix-ui/react-*`               | ^1.1.0+    | Radix UI components for building accessible UI          |
| `@stripe/stripe-js`               | ^4.4.0     | Stripe.js library for frontend integration              |
| `@tanstack/react-query`           | 4.36.1     | React Query for data fetching and caching               |
| `@trpc/client`, `@trpc/server`    | ^10.45.2   | TRPC for typesafe APIs                                  |
| `@tsparticles/engine`             | ^3.5.0     | Particle engine for animations                          |
| `class-variance-authority`        | ^0.7.0     | Tailwind CSS utility for handling class names           |
| `clsx`                            | ^2.1.1     | Utility for conditional class names                     |
| `date-fns`                        | ^3.6.0     | Modern JavaScript date utility                          |
| `framer-motion`                   | ^11.3.31   | Motion library for React                                |
| `front-matter`                    | ^4.0.2     | YAML front matter parser                                |
| `lucide-react`                    | ^0.427.0   | React components for Lucide icons                       |
| `next`                            | 14.2.5     | Next.js framework                                       |
| `next-cloudinary`                 | ^6.11.0    | Cloudinary integration for Next.js                      |
| `next-themes`                     | ^0.3.0     | Theme toggler for Next.js                               |
| `react`, `react-dom`              | ^18.3.1    | React library for building UI                           |
| `react-hook-form`                 | ^7.53.0    | Performant form library for React                       |
| `react-loader-spinner`            | ^6.1.6     | React component for loading spinners                    |
| `react-markdown`                  | ^9.0.1     | Markdown renderer for React                             |
| `react-top-loading-bar`           | ^2.3.1     | React component for top loading bar                     |
| `remark-gfm`                      | ^4.0.0     | Remark plugin for GitHub Flavored Markdown              |
| `sonner`                          | ^1.5.0     | Notifications component for React                       |
| `stripe`                          | ^16.9.0    | Stripe Node.js library                                  |
| `tailwind-merge`                  | ^2.5.2     | Utility for merging Tailwind CSS classes                |
| `tailwindcss-accent`              | ^2.1.2     | Tailwind CSS plugin for accent colors                   |
| `tailwindcss-animate`             | ^1.0.7     | Tailwind CSS plugin for animations                      |
| `zod`                             | ^3.23.8    | TypeScript-first schema validation library              |

### Development Dependencies

| Package                           | Version    | Description                                             |
|-----------------------------------|------------|---------------------------------------------------------|
| `@next/eslint-plugin-next`        | ^14.2.7    | ESLint plugin for Next.js                               |
| `@types/node`                     | ^20.16.3   | TypeScript type definitions for Node.js                 |
| `@types/react`                    | ^18.3.5    | TypeScript type definitions for React                   |
| `@types/react-dom`                | ^18.3.0    | TypeScript type definitions for React DOM               |
| `eslint`                          | ^8         | Pluggable JavaScript linter                             |
| `eslint-config-next`              | 14.2.5     | ESLint configuration for Next.js                        |
| `eslint-plugin-react`             | ^7.35.0    | ESLint plugin for React                                 |
| `husky`                           | ^8.0.3     | Git hooks tool                                          |
| `postcss`                         | ^8.4.42    | CSS processing tool                                     |
| `prettier`                        | ^3.3.3     | Code formatter                                          |
| `prisma`                          | ^5.18.0    | Prisma ORM                                              |
| `tailwindcss`                     | ^3.4.10    | Utility-first CSS framework                             |
| `typescript`                      | ^5         | TypeScript language                                     |
📂 Folder Structure
-------------------

```plaintext
ai-nexus/
├── public/              # Public assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Next.js pages
│   ├── styles/          # Global styles
│   ├── trpc/            # TRPC configuration
│   ├── utils/           # Utility functions and helpers
│   └── forms/           # Forms and form validation
├── prisma/              # Prisma schema and migrations
├── .env                 # Environment variables
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

🔧 Setup & Installation
-----------------------

1.  **Clone the repository**:
    
    ```bash
    git clone https://github.com/yourusername/ai-nexus.git
    cd ai-nexus
    ```
    
2.  **Install dependencies**:
    
    ```bash
    npm install
    ```
    
3.  **Set up environment variables**:
    
    *   Create a `.env` file and configure it with your database credentials and API keys.
4.  **Run database migrations**:
    
    ```bash
    npx prisma migrate dev
    ```
    
5.  **Start the development server**:
    
    ```bash
    npm run dev
    ```
    

🛡️ Security & Authentication
-----------------------------

AI Nexus uses **Clerk** for user authentication and management. Ensure that you have properly set up your Clerk API keys in the `.env` file. The platform is designed with security best practices in mind, including role-based access control (RBAC) for managing different user permissions.

🚧 Contributing
---------------

We welcome contributions to the AI Nexus project! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature-branch`).
