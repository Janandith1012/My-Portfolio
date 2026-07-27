-- Run this file in the Supabase SQL Editor.
-- Public visitors can view portfolio content. Only the authenticated owner can edit it.

create table if not exists public.portfolio_content (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('certificate', 'project', 'profile')),
  content jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

create policy "Portfolio content is publicly readable"
on public.portfolio_content
for select
to anon, authenticated
using (true);

create policy "Authenticated owner can add content"
on public.portfolio_content
for insert
to authenticated
with check ((select auth.uid()) is not null);

create policy "Authenticated owner can update content"
on public.portfolio_content
for update
to authenticated
using ((select auth.uid()) is not null)
with check ((select auth.uid()) is not null);

create policy "Authenticated owner can delete content"
on public.portfolio_content
for delete
to authenticated
using ((select auth.uid()) is not null);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  4194304,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do nothing;

create policy "Portfolio media is publicly readable"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'portfolio-media');

create policy "Authenticated owner can upload portfolio media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio-media' and (select auth.uid()) is not null);

create policy "Authenticated owner can update portfolio media"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio-media' and (select auth.uid()) is not null);

create policy "Authenticated owner can delete portfolio media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'portfolio-media' and (select auth.uid()) is not null);
