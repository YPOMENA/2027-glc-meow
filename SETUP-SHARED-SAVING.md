# Make notes, ticks and "Can't make it" shared for the whole team

Right now the hub saves everything in each person's own browser. These steps connect it to
**Supabase**, a free online database, so whatever anyone saves shows up for everyone.

About 15 minutes. You don't need to write any code.

## What you're building

```
Teammate's browser ──reads──▶  Supabase table "hub_docs"  (anyone with the site can read)
Teammate's browser ──saves──▶  hub_save + team passcode   (only people who know the passcode can change things)
```

- **Reading** is open to anyone who has the site link, same as the rest of the page.
- **Saving** asks for a **team passcode** the first time. The browser remembers it after that.

---

## Step 1: Create a free Supabase account and project

1. Go to **https://supabase.com** and click **Start your project**. Sign up (GitHub or email both work).
2. Click **New project**.
3. Fill in:
   - **Name:** `meo-workshop-hub`
   - **Database password:** click **Generate a password** and save it in your password manager.
     (The hub never uses it, but Supabase needs one.)
   - **Region:** pick the one closest to most of the team, for example *Central EU (Frankfurt)* or *Middle East*.
   - **Plan:** Free.
4. Click **Create new project** and wait 1–2 minutes while it sets up.

> Note: free projects pause after about a week with no activity. If that happens, open the project
> in Supabase and click **Restore**. Nothing is lost.

## Step 2: Create the table (copy and paste)

1. In the left sidebar, open **SQL Editor** (the `>_` icon).
2. Click **+ New query**.
3. Open [`supabase/setup.sql`](supabase/setup.sql) from this repo, copy **all** of it and paste it into the editor.
4. Near the bottom, replace `CHANGE-ME-TO-YOUR-TEAM-PASSCODE` with the passcode your team will use.
   Pick something not easy to guess, at least 12 characters, for example `glc27-meow-blue-falcon`.
   Keep the single quotes around it.
5. Click **Run** (or Ctrl/⌘+Enter). You should see **Success. No rows returned**.

**What that script did, in plain English:**
- Made a table called `hub_docs` that stores every note, tick and "Can't make it" mark.
- Allowed anyone to *read* that table, and nobody to write to it directly.
- Stored your passcode in a separate table the website can't see.
- Created a `hub_save` function: the only way to save, and it checks the passcode first.

To check: in the sidebar open **Table Editor**. You should see `hub_docs` (empty for now) and `hub_settings`.

## Step 3: Copy your two connection values

1. In the sidebar, click **Project Settings** (the gear icon), then **API Keys**. (On some
   projects this sits under **Data API** or **API**.)
2. Copy these two:
   - **Project URL**: looks like `https://abcdefghijkl.supabase.co`
     (on the **Data API** page, or the **Connect** button at the top of the dashboard).
   - **Publishable key**: starts with `sb_publishable_…`. On older projects it's called the
     **anon public** key and is a long string starting with `eyJ…`.

> ✅ These two are **meant to be public**. They go inside the web page, and the passcode protects saving.
>
> ⛔ **Never** copy the **secret** key (`sb_secret_…`) or the **service_role** key. They bypass all
> the protections and must not go into the page or be sent to anyone.

## Step 4: Put the values into the hub

At the top of the `<script>` section of `index.html` there's a clearly marked block:

```js
const SUPABASE_URL = '';
const SUPABASE_KEY = '';
```

Paste your values between the quotes:

```js
const SUPABASE_URL = 'https://abcdefghijkl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xxxxxxxxxxxxxxxx';
```

You can do this in either of two ways:
- **Ask Claude**: send it the Project URL and the publishable key and it will update the file for you.
- **On GitHub yourself**: open `index.html` in the repo, click the ✏️ pencil, use Ctrl/⌘+F to find
  `SUPABASE_URL`, paste the values, then click **Commit changes**.

## Step 5: Deploy and test

1. Deploy the updated `index.html` the way you normally do. If Vercel is linked to the GitHub repo
   this happens automatically.
2. Open the site and go to **Meeting notes & recordings**. Next to the heading it should now say
   **"Shared with the whole team"**. If it still says *"saved in this browser only"*, the new
   version isn't deployed yet.
3. Add a note to a call and click **Save**. It asks for the team passcode once. Enter it.
4. Open the site on your phone or in a private window. Your note should be there.
5. In Supabase **Table Editor → hub_docs** you'll see the row you just saved.

## Step 6: Tell the team

Send them the site link and the passcode, through Teams or another private channel and not in the
site itself. Each person enters the passcode the first time they save something.

---

## Good to know

- **Changing the passcode:** in the SQL Editor, run
  `update hub_settings set value = 'new-passcode' where name = 'passcode';`
  Everyone is asked for the new one the next time they save.
- **Updates from others** appear within about 20 seconds, or straight away when you switch back to the tab.
- **Two people editing the same call's notes at once:** whoever clicks Save last wins. Agree on one
  note-taker per call.
- **Notes saved before this setup** stay in that person's browser and don't move across automatically.
  Copy them into the hub again after the switch.
- **Backup / export:** Supabase **Table Editor → hub_docs → Export → CSV**.
- **Who can read:** anyone with the site link can read the notes, the same as the rest of the page.
  Don't put anything in notes you wouldn't put on the page itself.

## Troubleshooting

| You see | Likely cause |
|---|---|
| "Notes saved in this browser only" | `SUPABASE_URL` / `SUPABASE_KEY` are still empty in the deployed page |
| "Shared notes unavailable right now" | Wrong URL or key, the setup script wasn't run, or the project is paused (open Supabase → Restore) |
| "That passcode is not right" | Typo, or the passcode was changed. Ask the team lead |
| "Could not save… Check the team passcode" | Same as above, or no internet connection |
