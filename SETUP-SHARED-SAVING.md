# Make notes, ticks and "Can't make it" shared for the whole team

Right now the hub saves everything in each person's own browser. These steps connect it to
**Supabase**, a free online database, so whatever anyone saves shows up for everyone.

About 15 minutes. You don't need to write any code.

## What you're building

```
Teammate's browser ──reads──▶  Supabase table "hub_docs"
Teammate's browser ──saves──▶  hub_save function  ──▶  hub_docs
```

- **Anyone with the site link can read and save.** There's no login or passcode, so keep the link within the team.

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
4. Click **Run** (or Ctrl/⌘+Enter). You should see **Success. No rows returned**.

**What that script did, in plain English:**
- Made a table called `hub_docs` that stores every note, tick and "Can't make it" mark.
- Allowed anyone to *read* that table, and blocked writing to it directly.
- Created a `hub_save` function: the only way to save, and it only accepts the hub's own kinds of data.

To check: in the sidebar open **Table Editor**. You should see `hub_docs` (empty for now).

## Step 3: Copy your two connection values

1. In the sidebar, click **Project Settings** (the gear icon), then **API Keys**. (On some
   projects this sits under **Data API** or **API**.)
2. Copy these two:
   - **Project URL**: looks like `https://abcdefghijkl.supabase.co`
     (on the **Data API** page, or the **Connect** button at the top of the dashboard).
   - **Publishable key**: starts with `sb_publishable_…`. On older projects it's called the
     **anon public** key and is a long string starting with `eyJ…`.

> ✅ These two are **meant to be public**. They go inside the web page.
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
3. Add a note to a call and click **Save**.
4. Open the site on your phone or in a private window. Your note should be there.
5. In Supabase **Table Editor → hub_docs** you'll see the row you just saved.

## Step 6: Tell the team

Share the site link with the team privately, for example in Teams. Anyone who has the link can add
and change notes, so don't post it publicly.

---

## Good to know

- **Updates from others** appear within about 20 seconds, or straight away when you switch back to the tab.
- **Two people editing the same call's notes at once:** whoever clicks Save last wins. Agree on one
  note-taker per call.
- **Notes saved before this setup** stay in that person's browser and don't move across automatically.
  Copy them into the hub again after the switch.
- **Backup / export:** Supabase **Table Editor → hub_docs → Export → CSV**.
- **Who can read and edit:** anyone with the site link. Don't put anything in notes you wouldn't put
  on the page itself. If you later want to lock down editing, ask Claude to add a passcode or sign-in.

## Troubleshooting

| You see | Likely cause |
|---|---|
| "Notes saved in this browser only" | `SUPABASE_URL` / `SUPABASE_KEY` are still empty in the deployed page |
| "Shared notes unavailable right now" | Wrong URL or key, the setup script wasn't run, or the project is paused (open Supabase → Restore) |
| "Could not save… Check your connection" | No internet connection, or the setup script wasn't run |
