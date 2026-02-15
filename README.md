# Bookmarker

A simple web app to store and manage your bookmarks

## Technical Details

### Tech Stack

1. Next js
2. Supabase
3. Vercel
4. Typescript
5. Tailwind CSS

## Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/mnshrm/bookmarker.git
   cd bookmark
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```
   NEXT_PUBLIC_SUPABASE_URL=<supabase_project_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase_anon_key>
   ```

4. **Configure Supabase**
   - Create a new table called `bookmark` with this schema:
     ```sql
        id uuid default gen_random_uuid() primary key,
        user_id uuid references auth.users(id) on delete cascade not null,
        url text not null,
        title text not null,
        inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
     ```
   - Enable Row Level Security (RLS) on the bookmark table
   - Add RLS policy to restrict users to their own records
   - Set up Google OAuth provider in Supabase Authentication with your GCP credentials

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser

## Folder Structure

This project uses NextJS's app router, each folder inside app folder represents a specific route.

1. / : landing page for bookmarker project
2. /auth/callback : server side callback route, which redirects user to dashboard after successful login
3. /auth/signout : server side route which terminates user session and then redirects user to login page
4. /dashboard: user dashboard which lists all the bookmarks, and provides form to add new bookmark
5. /login: user login page

## Salient Features

1. Realtime updates across different active sessions whenever new bookmarks are added or removed.
2. User privacy at its core, no other user can see your bookmarks.
3. Works across multiple form factors (laptop, mobile, tablet).

## How I Built This Project

1. I used Gemini, to give a roadmap on how I could go about making this project, and integrating all the technologies.
2. After having a roadmap, I went on to NextJS and supabase docs to understand the required features I need to implement, for any part which I found hard to grasp, I utilized youtube videos and gemini to understand that.
3. After having a clear picture, I set up my next js project, and defined 3 pages, landing, login and dashboard page. Along with these pages I defined 2 components which would be used on dashboard page, bookmarkList and bookmarkForm components to show and add new item functionality respectively.
4. Given project's requirements, I created a simple db table bookmark in supabase with SQL editor with a foreign key to auth schema's user table.
5. To implement google Oauth, I created GCP oAuth client id and client secret using GCP console and configured supabase for google oAuth.
6. Created supabase server client and supabase browser client, which are utilized in pages.tsx files in our routes, for supabase tasks, such as updating DB, subscribing to DB changes, checking if user is logged in or not.
7. Finally used client to create logic for user sign in, db update, realtime subscription.

After completing all this and styling the app, I had a functional web app ready for deployement

## What Problems I Faced?

1. Since this was my first time using Supabase, I had a bit of a learning curve. I used the documentation and Gemini to understand how authentication and real-time features work. Gemini provided initial setup along with some code snippets of features I wished to implement.
2. I also had to adapt to Tailwind CSS, as I usually work with CSS Modules or MUI. Because I was on a tight schedule, I used Copilot to quickly build a basic white-and-blue theme. After some quick manual tweaks, the app looked and behaved as I wanted.
3. The hardest problem I faced was that when we added a bookmark on mobile device it was displayed on laptop but not on mobile, the issue was that on mobile, the browser was connecting to the WebSocket as an anonymous user before the authentication session had fully loaded, as a result our user was subscribed as an anon user to supabase, and according to RLS, anon users should not recieve any updates, I solved this issue, by forcing the app to wait for a valid session token before subscribing.
4. While testing realtime updates for database, I noticed that insertion operation updates were correctly being received across tabs, but it wasn't the same for deletion, after researching a bit I understood that I had to change the replica identity for my DB, basically to store the entire information about the deleted row in logs, so that supabase could use this information to send the deleted row to active user sessions, which could then be used in removing the row from UI.

## AI tools used and their purpose
1. Gemini 
2. Copilot
