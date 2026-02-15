# Bookmarker

A simple web app to store and manage your bookmarks

## Technical Details

### Tech Stack

1. Next js
2. Supabase
3. Vercel

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn installed
- A Supabase account
- GCP OAuth credentials (Client ID and Secret)

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
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Configure Supabase**
   - Create a new table called `bookmark` with this schema:
     ```sql
     CREATE TABLE bookmark (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       user_id UUID NOT NULL REFERENCES auth.users(id),
       url TEXT NOT NULL,
       title TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
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

1. Realtime updates using supabase realtime, it allows realtime updates across different active sessions whenever new bookmarks are added or removed.
2. Row level security in database which ensures, that only authenticated users can access their own records, no one elses.
3. Works across multiple form factors (laptop, mobile, tablet).

## How I Built This Project

1. I used Gemini, to give a roadmap on how I could go about making this project, and integrating all the technologies.
2. After having a roadmap, I went on to NextJS and supabase docs to understand the required features I need to implement, for any part which I found hard to grasp, I utilized youtube videos and gemini to understand that.
3. After having a clear picture, I set up my next js project, and defined 3 pages, landing, login and dashboard page. Along with these pages I defined 2 components which would be used on dashboard page, bookmarkList and bookmarkForm components to show and add a new item functionality respectively.
4. Given project's requirements, I created a simple db table bookmark in supabase with SQL editor with a foreign key to auth schema's user table.
5. To implement google Oauth, I created GCP oAuth client id and client secret using GCP console and configured supabase for third party authentication provider.
6. Created supabase server client and supabase browser client functions, which will be utilized on pages.tsx files for our routes, for various supabase tasks, such as updating DB, subscribing to DB changes, checking if user is logged in or not.
7. Finally used client to create logic for user sign in, db update, realtime subscription.

After completing all this I had a functional web app. After tweaking the styling and some of the app's functionalities, project was ready for deployment.

## What Problems I Faced?

1. Since, It was the first time for me using supabase for auth, there was a small learning curve to understanding what supabase was and how could I use it for my project, here I used supabase documentation and Gemini to help me understand realtime and authentication features, Gemini helped me how to set it up and gave me code snippets as well for the same.
2. While testing realtime updates for database, I noticed that insertion operation updates were correctly being received across tabs, but it wasn't the same for deletion, after researching a bit I understood that I had to change the replica identity for my DB, basically to store the entire information about the deleted row in logs, so that supabase could use this information to send the deleted row to active user sessions, which could then be used in removing the row from UI
3. There was also an issue of styling, since I use either CSS modules or MUI, using tailwind was new to me, given the time constraint I preferred using CoPilot to style this app according to simple white-blue theme, CoPilot did the job in matter of minutes and after tweaking the styling my project was ready aesthetically.
