# Producto Académico 2 - SIGI

## Overview
Academic project for Universidad Continental.  
SIGI — Sistema de Información de Gestión Institucional.

## Tech Stack
- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Database:** SQLite (via `better-sqlite3`)
- **Auth:** Password hashing with `bcrypt`
- **Frontend:** Static HTML/CSS served from `/public`

## Project Structure
```
├── server.js           # Express server (port 5000) — routes & API
├── database.js         # SQLite connection + schema + seed data
├── sigi.db             # SQLite database file (auto-created on first run)
├── public/
│   ├── login.html      # Login page (served at /)
│   └── dashboard.html  # Dashboard page (served at /dashboard)
├── package.json
└── .gitignore
```

## API Endpoints
| Method | Path         | Description                         |
|--------|--------------|-------------------------------------|
| GET    | `/`          | Login page                          |
| GET    | `/dashboard` | Main dashboard (after login)        |
| POST   | `/api/login` | Validate credentials against DB     |

## Database – Table: `usuarios`
| Column     | Type    | Notes                        |
|------------|---------|------------------------------|
| id         | INTEGER | Primary key, autoincrement   |
| nombre     | TEXT    | Full name                    |
| email      | TEXT    | Unique login identifier      |
| password   | TEXT    | bcrypt-hashed                |
| rol        | TEXT    | admin / docente / estudiante |
| creado_en  | TEXT    | datetime of creation         |

## Test Users (seeded automatically)
| Nombre        | Email                        | Password  | Rol         |
|---------------|------------------------------|-----------|-------------|
| Administrador | admin@sigi.edu.pe            | admin123  | admin       |
| Juan Pérez    | juan@continental.edu.pe      | juan123   | estudiante  |
| María López   | maria@continental.edu.pe     | maria123  | docente     |

## Running the App
```bash
npm run dev
```
The app runs on port 5000 at `http://0.0.0.0:5000`.

## Deployment
Configured for autoscale deployment using `node server.js`.
