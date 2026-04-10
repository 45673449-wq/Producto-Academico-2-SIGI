# Producto Académico 2 - SIGI

## Overview
Academic project for Universidad Continental. A web application for SIGI (Sistema de Información de Gestión Institucional).

## Tech Stack
- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Frontend:** Static HTML/CSS served from `/public`

## Project Structure
```
├── server.js          # Express web server (port 5000)
├── public/
│   └── index.html     # Main frontend page
├── package.json       # Node.js dependencies
└── .gitignore
```

## Running the App
```bash
npm run dev
```
The app runs on port 5000 at `http://0.0.0.0:5000`.

## Deployment
Configured for autoscale deployment using `node server.js`.
