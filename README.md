
# LOUDERWORLD – FULL STACK EVENTS PLATFORM

This project is a full-stack events discovery and curation platform.

It consists of:
- A public-facing frontend for users to browse events
- An admin dashboard protected by Google OAuth
- A backend service that scrapes events automatically
- A MongoDB database for persistence

--------------------------------------------------------
TECH STACK
--------------------------------------------------------

Frontend:
- Next.js (App Router)
- React
- NextAuth (Google OAuth)
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express
- MongoDB (Mongoose)
- Puppeteer (Web scraping)
- Node-cron (Scheduled jobs)

Deployment:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Auth: Google OAuth

--------------------------------------------------------
HIGH LEVEL SYSTEM FLOW
--------------------------------------------------------

1. Automated Scraper
   - A cron job runs every few hours on the backend
   - Events are scraped from Eventbrite
   - New events are saved with status = "new"
   - Updated events are marked as "updated"
   - Removed events are marked as "inactive"

2. Public Users
   - Visit the homepage
   - Browse available events
   - Click "Get Tickets"
   - Enter email for lead capture
   - Redirected to original Eventbrite page

3. Admin Users
   - Visit /dashboard
   - Authenticate using Google OAuth
   - Review scraped events
   - Import selected events
   - Imported events are logged and tracked

--------------------------------------------------------
PUBLIC USER FLOW
--------------------------------------------------------

1. User visits the homepage:
   URL:
   [https://<frontend-domain>.vercel.app](https://louder-world-one.vercel.app/)

2. Homepage fetches events from backend:
   GET /api/events

3. User clicks "Get Tickets":
   - Email is captured
   - Consent is recorded
   - User is redirected to Eventbrite

4. Email lead is stored in the database

--------------------------------------------------------
ADMIN USER FLOW
--------------------------------------------------------

1. Admin visits dashboard:
   URL:
   [https://<frontend-domain>.vercel.app/dashboard](https://louder-world-one.vercel.app/dashboard)

2. If not authenticated:
   - Redirected to Google Login

3. After successful login:
   - Dashboard loads events
   - Admin can see status (new / updated / inactive / imported)

4. Admin imports an event:
   PATCH /api/dashboard/events/:id/import

5. Import is logged and event status updates

--------------------------------------------------------
AUTOMATED SCRAPING FLOW
--------------------------------------------------------

1. Cron job triggers scraper
2. Eventbrite listing pages are scraped
3. Event URLs are collected
4. Event detail pages are scraped (rate-limited)
5. Events are saved or updated in MongoDB
6. Hashing is used to detect changes

--------------------------------------------------------
IMPORTANT API ENDPOINTS
--------------------------------------------------------

Public APIs:
- GET    /api/events
- POST   /api/events/:id/lead

Admin APIs:
- GET    /api/dashboard/events
- PATCH  /api/dashboard/events/:id/import

--------------------------------------------------------
ENVIRONMENT VARIABLES
--------------------------------------------------------

Frontend (.env.local):

NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=[https://<frontend-domain>.vercel.app](https://louder-world-one.vercel.app/)

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_API_URL=[https://<backend-domain>.onrender.com/api](https://louder-world-assignment-xv7q.onrender.com)


Backend (.env):

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

--------------------------------------------------------
DEPLOYMENT URLs
--------------------------------------------------------

Frontend:
https://<frontend-domain>.vercel.app

Backend:
https://<backend-domain>.onrender.com

Google OAuth Redirect URI:
https://<frontend-domain>.vercel.app/api/auth/callback/google

--------------------------------------------------------
WHY THIS ARCHITECTURE
--------------------------------------------------------

- Public users do not need authentication
- Admin access is protected using Google OAuth
- Backend remains auth-provider agnostic
- Scraping is automated and resilient
- Human review is included before importing events
- Real-world ingestion constraints are handled gracefully

--------------------------------------------------------
FINAL NOTES
--------------------------------------------------------

- The homepage uses client-side data fetching to avoid build-time API dependency issues
- Scraping is rate-limited to avoid blocking
- Environment variables are used to protect secrets
- The project is structured as a single monorepo with frontend and backend folders

========================================================
END OF FILE
========================================================
-->
