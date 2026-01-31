# Shopping List App

A full-stack shopping list application with React, TypeScript, Express, and MongoDB.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- [Docker](https://www.docker.com/)

## Setup

```bash
# Install dependencies
bun install && bun run install:all

# Copy environment file
cp backend/.env.example backend/.env

# Start MongoDB and the app
bun run db:start
bun run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Project Structure

```
shopping-list-app/
├── backend/       # Express + Mongoose API
└── frontend/      # React + Vite
```

## External UI Libraries

- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components (Skeleton)
- [TanStack Query](https://tanstack.com/query) - Data fetching
