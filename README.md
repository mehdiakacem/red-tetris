# Red Tetris

A fully functional online, real-time multiplayer Tetris game built with Full Stack JavaScript.

## Features

- 🎮 Real-time multiplayer gameplay via WebSocket
- ⚡ React frontend with functional components
- 🔧 Express.js backend with Socket.IO
- 📦 Modular server architecture with models
- 🧪 Jest unit testing setup
- ✨ ESLint + Prettier code quality tools

## Project Structure

```
red-tetris/
├── client/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── index.js           # Server entry point
│   └── models/            # Game logic models
│       ├── Player.js
│       ├── Game.js
│       └── Piece.js
├── package.json
├── .env.example
└── README.md
```

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mehdiakacem/red-tetris.git
cd red-tetris
```

2. Install root dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

4. Create `.env` file from template:
```bash
cp .env.example .env
```

## Running the Project

### Development (with hot reload)
```bash
npm run dev
```
This runs both server and client concurrently:
- **Server**: http://localhost:3000
- **Client**: http://localhost:5173

### Development (server only)
```bash
npm run dev:server
```

### Development (client only)
```bash
cd client
npm run dev
```

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Scripts

- `npm run dev` — Run server + client concurrently
- `npm run dev:server` — Run server with auto-reload (nodemon)
- `npm run dev:client` — Run client dev server
- `npm run build` — Build client for production
- `npm start` — Run server (production)
- `npm test` — Run Jest unit tests
- `npm run test:watch` — Run tests in watch mode
- `npm run test:coverage` — Generate coverage report
- `npm run lint` — Run ESLint on client code
- `npm run format` — Format code with Prettier

## Technology Stack

**Frontend:**
- React 19
- Vite (build tool)
- ESLint + Prettier (code quality)

**Backend:**
- Express.js 5
- Socket.IO (real-time communication)
- Node.js

**Testing & Quality:**
- Jest (unit testing)
- ESLint (linting)
- Prettier (code formatting)

## Environment Variables

See `.env.example` for available configuration options:
- `PORT` — Server port (default: 3000)
- `NODE_ENV` — Environment mode (development/production)
- `CLIENT_URL` — Client URL for CORS

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push branch: `git push origin feature/your-feature`
4. Open a pull request

## License

ISC

## Author

[mehdiakacem](https://github.com/mehdiakacem) 
