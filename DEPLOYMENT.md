# Deployment

This repository is set up as two services:

- `frontend/`: Vite/React app deployed to Vercel.
- `backend/`: Express API deployed as a Render web service.

## Deploy the backend to Render

1. Push the repository to GitHub and create a Render Blueprint from the repository. Render will use the root `render.yaml` file.
2. Add the values from `backend/.env.example` as Render environment variables. Render supplies `PORT` automatically; do not hard-code it in the dashboard.
3. Set `CORS_ORIGINS` to the Vercel production URL, for example `https://your-frontend.vercel.app`, and include `http://localhost:3000` if local development is still needed.
4. Confirm `https://your-backend.onrender.com/health` returns `{ "status": "ok" }`.

The backend's production command is `npm start`, and its health-check path is `/health`.

## Deploy the frontend to Vercel

1. Import the repository into Vercel.
2. Set the project root directory to `frontend`.
3. Add these environment variables:

   - `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
   - `VITE_CLERK_PUBLISHABLE_KEY=...`

4. Deploy with the default Vite settings (`npm run build`, output directory `dist`).
5. Add the final Vercel URL to the backend's `CORS_ORIGINS` value and redeploy the backend.

The `frontend/vercel.json` rewrite keeps React Router routes working when a user refreshes a deep link.

## Clerk configuration

In Clerk, add the Vercel URL to the allowed origins/redirect URLs required by your Clerk application. Use the same publishable key in the frontend and matching secret key in Render.
