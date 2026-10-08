# Deployment

This repository is set up as two services:

- `frontend/`: Vite/React app deployed to Vercel.
- `backend/`: Express API deployed as a Render web service.

## Deploy the backend to Render

1. Push the repository to GitHub and create a Render Blueprint from the repository. Render will use the root `render.yaml` file.
2. Add the values from `backend/.env.example` as Render environment variables. Render supplies `PORT` automatically; do not hard-code it in the dashboard.
3. Set `CORS_ORIGINS` to `https://harmoniq-fawn.vercel.app,http://localhost:3000` and redeploy the backend.
4. Confirm `https://harmoniq-sl5f.onrender.com/health` returns `{ "status": "ok" }`.

The backend's production command is `npm start`, and its health-check path is `/health`.

## Deploy the frontend to Vercel

1. Import the repository into Vercel.
2. Set the project root directory to `frontend`.
3. Add these environment variables:

   - `VITE_API_BASE_URL=https://harmoniq-sl5f.onrender.com/api`
   - `VITE_CLERK_PUBLISHABLE_KEY=...`

4. Deploy with the default Vite settings (`npm run build`, output directory `dist`).
5. The backend CORS configuration already includes `https://harmoniq-fawn.vercel.app`; keep this value updated if your Vercel domain changes.

The `frontend/vercel.json` rewrite keeps React Router routes working when a user refreshes a deep link.

## Clerk configuration

In Clerk, add the Vercel URL to the allowed origins/redirect URLs required by your Clerk application. Use the same publishable key in the frontend and matching secret key in Render.
