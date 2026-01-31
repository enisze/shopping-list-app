# Shopping List App

A full-stack shopping list application built with React, TypeScript, Express, and MongoDB.

## Features

- Add products to your shopping list
- Mark items as bought (with strikethrough effect)
- Delete items from the list
- Real-time UI updates
- Responsive design

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **TanStack Query** for data fetching

### Backend
- **Express 5** with TypeScript
- **Mongoose** for MongoDB ODM
- **MongoDB** for data persistence

### Package Manager
- **Bun** for package management and script execution

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- [Docker](https://www.docker.com/)

## Setup

```bash
bun install
bun run install:all
cp backend/.env.example backend/.env
bun run db:start
bun run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start frontend and backend |
| `bun run db:start` | Start MongoDB container |
| `bun run db:stop` | Stop MongoDB container |
| `bun run db:reset` | Reset MongoDB (delete all data) |

## Project Structure

```
shopping-list-app/
├── backend/           # Express API
│   └── src/
│       ├── controllers/
│       ├── models/
│       └── routes/
├── frontend/          # React App
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       └── types/
└── docker-compose.yml
```

## External UI Libraries

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components (Skeleton)
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching
