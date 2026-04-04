# YourBrew

Startup landing page with a React/Vite frontend and an Express API that forwards inquiries to Google Forms.

## Local setup

Frontend:
- Copy `.env.example` to `.env`
- Keep `VITE_API_URL=http://localhost:5001` for local work
- Run `npm install`
- Run `npm run dev`

Backend:
- Copy `server/.env.example` to `server/.env`
- Run `cd server`
- Run `npm install`
- Run `npm start`

## Recommended deployment

- Frontend: Netlify
- Backend: Render

### Netlify

- Connect the repository
- Build command: `npm run build`
- Publish directory: `dist`
- Set environment variable:
  - `VITE_API_URL=https://your-render-service.onrender.com`

### Render

- Create a Web Service
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Set environment variables:
  - `FRONTEND_URL=https://your-netlify-site.netlify.app`
  - `SQLITE_ENABLED=false`

## Production notes

- The frontend uses `VITE_API_URL` in production and falls back to `/api` locally.
- Set `SQLITE_ENABLED=false` in production unless you intentionally add persistent storage.
- `netlify.toml` configures SPA routing.
- `render.yaml` provides a starter Render blueprint.

