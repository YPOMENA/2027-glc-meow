# MEO Workshop Hub

Static site, no build step.

## Deploy
- Vercel dashboard: Add New → Project → drag this folder in → Deploy (Framework preset: Other).
- Or CLI: `cd meo-workshop-hub && vercel --prod`

## Updating
Replace `index.html` with the new version and redeploy.

## Shared saving
Task ticks, "Can't make it" marks and meeting notes save in each viewer's own browser until
`SUPABASE_URL` and `SUPABASE_KEY` at the top of the script in `index.html` are filled in.
Once they are, everything is shared for the whole team through Supabase.
Step-by-step setup: [SETUP-SHARED-SAVING.md](SETUP-SHARED-SAVING.md). Database script: [supabase/setup.sql](supabase/setup.sql).
