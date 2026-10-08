-- MEO Workshop Hub: shared storage for meeting notes, task ticks and "Can't make it" marks.
-- Run this once in Supabase: SQL Editor → New query → paste everything → Run.
-- Anyone with the site link can read and save. There is no passcode.

-- 1. One table holds everything the hub saves.
create table if not exists public.hub_docs (
  collection text not null,           -- 'meetings', 'ticks' or 'rsvp'
  id         text not null,           -- which call / task / person
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

-- 2. Anyone with the site can read. Writing directly to the table is blocked.
alter table public.hub_docs enable row level security;
drop policy if exists "Anyone can read" on public.hub_docs;
create policy "Anyone can read" on public.hub_docs for select to anon, authenticated using (true);
grant select on public.hub_docs to anon, authenticated;

-- 3. Saving goes through this function, which only accepts the hub's own kinds of data.
drop function if exists public.hub_save(text, text, text, jsonb);
create or replace function public.hub_save(p_collection text, p_id text, p_data jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_collection not in ('meetings', 'ticks', 'rsvp') then
    raise exception 'unknown collection';
  end if;
  if length(p_id) > 100 or length(p_data::text) > 50000 then
    raise exception 'too large';
  end if;
  insert into hub_docs (collection, id, data, updated_at)
  values (p_collection, p_id, p_data, now())
  on conflict (collection, id) do update set data = excluded.data, updated_at = now();
end;
$$;
revoke all on function public.hub_save(text, text, jsonb) from public;
grant execute on function public.hub_save(text, text, jsonb) to anon, authenticated;
