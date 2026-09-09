# Harmoniq Project Changes

This file documents the fixes and integration changes made in the Harmoniq project.

## Backend Fixes

### Authentication and User Sync

- Added the correct `User` model import in `backend/src/controller/user.controller.js`.
- Restored the user model at `backend/src/models/user.model.js`.
- Kept `backend/src/routes/user.model.js` as a compatibility re-export for the old misplaced model path.
- Protected the auth callback route in `backend/src/routes/auth.routes.js`.
- Added Clerk session validation in `backend/src/controller/auth.controller.js`.
- Made Google user's `lastName` optional during account creation.
- Added validation logs and clearer errors for failed user synchronization.
- Updated protected route handling to use Clerk's `getAuth(req)` in:
  - `backend/src/middleware/auth.middleware.js`
  - `backend/src/controller/auth.controller.js`
  - `backend/src/controller/user.controller.js`

### Middleware and Environment Loading

- Loaded environment variables before application modules in `backend/src/app.js`.
- Moved `clerkMiddleware()` before the other Express middleware.
- Added a clear missing `MONGODB_URI` error in `backend/src/db/db.js`.
- Removed an unused auth import from `backend/src/routes/album.routes.js`.

### Songs and Albums

- Made all song listing endpoints public in `backend/src/routes/song.routes.js`.
- Added song duration parsing and validation in `backend/src/controller/admin.controller.js`.
- Saved song duration to MongoDB when creating a song.
- Fixed song deletion to use `Song.findByIdAndDelete()`.
- Added a `404` response when a song does not exist.
- Added album upload validation and numeric release-year parsing.
- Added the missing album creation response.
- Fixed the album schema typo from `tital` to `title` in `backend/src/models/album.model.js`.

## Frontend Fixes

### API and Backend Connection

- Added an API base URL fallback in `frontend/src/lib/axios.ts`:
  `http://localhost:5000/api`.
- Added featured-song fetching to `frontend/src/pages/Home/HomePage.tsx`.
- Added loading and backend error states to the home page.
- Added song cards with image, title, artist, and audio URL.

### Clerk Authentication

- Updated `frontend/src/providers/AuthProvider.tsx` to wait for Clerk loading and refresh the API token correctly.
- Updated `frontend/src/pages/Auth-callback/AuthCallbackPage.tsx` to:
  - Get a fresh Clerk token.
  - Send the token with the auth callback request.
  - Show the actual backend error message.
  - Navigate to the home page after successful user synchronization.
- Fixed the auth callback layout typo `item-center` to `items-center`.

### Routing and Admin UI

- Added the missing `/admin` route in `frontend/src/main.tsx`.
- Added `frontend/src/pages/Admin/AdminPage.tsx`.
- Replaced the hardcoded admin flag in `frontend/src/components/Topbar.tsx` with a backend admin check.

### TypeScript, Imports, and Lint

- Fixed case-sensitive UI imports from `Button` to `button`.
- Fixed the `cn` utility import in `frontend/src/components/ui/card.tsx`.
- Removed unused React imports.
- Fixed Fast Refresh lint issues in the button component and application entrypoint.
- Updated Vite alias resolution in `frontend/vite.config.ts` for reliable Node/Vite typing.
- Preserved old code below the corrected code in comments where behavior or imports were changed.

## Environment Configuration

- Added `backend/.env.example` with MongoDB, Clerk, Cloudinary, admin, and port variables.
- Added `frontend/.env.example` with Clerk publishable key and API URL variables.
- Added environment ignore rules so real `.env` files are not committed.
- Real `.env` values are intentionally not documented here.

## Verification Completed

- Frontend ESLint: passed.
- Frontend production build: passed.
- Backend JavaScript syntax checks: passed.
- Backend route/controller imports: passed.
- Git diff validation: passed.

## Current Commit

- Commit: `e4330cb`
- Message: `add environment configuration, update routes, and enhance user authentication`
