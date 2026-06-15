-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Clients table
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  client_num serial unique,
  name text not null,
  industry text,
  location text,
  age_gap text,
  income_bracket text check (income_bracket in ('High Ticket', 'Low Ticket', 'High Vol')),
  keywords text[] default '{}',
  feels text[] default '{}',
  -- Brand & Design
  brand_themes text,
  brand_colors text,
  brand_logo_url text,
  brand_fonts text,
  brand_voice text,
  brand_competitors text[] default '{}',
  -- Meta
  meta_parameters jsonb default '{}',
  naics text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Campaigns table
create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  type text not null check (type in ('paid_media', 'organic_media', 'email')),
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'running', 'completed', 'paused')),
  start_date date,
  end_date date,
  budget numeric,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Campaign creatives table
create table if not exists campaign_creatives (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  platform text not null check (platform in ('meta_ads', 'facebook', 'instagram', 'pinterest', 'google', 'reddit', 'email')),
  content_type text not null check (content_type in ('image', 'video', 'copy', 'email_template', 'ad')),
  title text,
  body text,
  image_url text,
  status text default 'draft' check (status in ('draft', 'review', 'approved', 'rejected')),
  reviewer_notes text,
  ai_generated boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Campaign performance table
create table if not exists campaign_performance (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid references campaigns(id) on delete cascade,
  date date not null,
  impressions integer default 0,
  clicks integer default 0,
  conversions integer default 0,
  spend numeric default 0,
  revenue numeric default 0,
  platform text,
  created_at timestamptz default now()
);

-- Weekly reports table
create table if not exists weekly_reports (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  week_start date not null,
  week_end date not null,
  summary text,
  metrics jsonb default '{}',
  created_at timestamptz default now()
);

-- RLS Policies
alter table clients enable row level security;
alter table campaigns enable row level security;
alter table campaign_creatives enable row level security;
alter table campaign_performance enable row level security;
alter table weekly_reports enable row level security;

-- Allow all authenticated users for now (tighten later)
create policy "Authenticated users can do everything on clients"
  on clients for all using (auth.role() = 'authenticated');

create policy "Authenticated users can do everything on campaigns"
  on campaigns for all using (auth.role() = 'authenticated');

create policy "Authenticated users can do everything on campaign_creatives"
  on campaign_creatives for all using (auth.role() = 'authenticated');

create policy "Authenticated users can do everything on campaign_performance"
  on campaign_performance for all using (auth.role() = 'authenticated');

create policy "Authenticated users can do everything on weekly_reports"
  on weekly_reports for all using (auth.role() = 'authenticated');

-- Updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_clients_updated_at before update on clients
  for each row execute function update_updated_at();

create trigger update_campaigns_updated_at before update on campaigns
  for each row execute function update_updated_at();

create trigger update_campaign_creatives_updated_at before update on campaign_creatives
  for each row execute function update_updated_at();
