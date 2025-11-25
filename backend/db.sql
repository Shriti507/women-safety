-- -- stores name and phone number

-- create table public.profiles (
--   id uuid references auth.users not null, 
--   updated_at timestamp with time zone,
--   full_name text,                        
--   phone_number text,                    
--   primary key (id),
--   constraint username_length check (char_length(full_name) >= 2)
-- );


-- alter table public.profiles enable row level security;

-- create policy "Users can view own profile."
--   on profiles for select
--   using ( auth.uid() = id );

-- create policy "Users can insert their own profile."
--   on profiles for insert
--   with check ( auth.uid() = id );

-- create policy "Users can update own profile."
--   on profiles for update
--   using ( auth.uid() = id );



-- ALTER TABLE public.profiles 
-- ADD COLUMN country_code text;



-- -- delete the current user's account
-- create or replace function delete_user()
-- returns void as $$
-- begin

--   -- Delete row from the profiles table 
--   delete from public.profiles where id = auth.uid(); 
  
--   -- Delete the actual user from auth.users (requires specific RLS policy)
--   delete from auth.users where id = auth.uid();
-- end;
-- $$ language plpgsql security definer;

-- -- Grant execution rights to authenticated users
-- grant execute on function public.delete_user() to authenticated;



-- -- 1. Create the contacts table
-- create table public.emergency_contacts (
--   id uuid default gen_random_uuid() primary key,
--   user_id uuid references auth.users not null, -- Links to your user
--   name text,
--   email text not null, -- The Guardian's Gmail
--   phone text,
--   created_at timestamp with time zone default timezone('utc'::text, now())
-- );

-- -- 2. Enable Security (RLS)
-- alter table public.emergency_contacts enable row level security;

-- -- 3. Policies (User can only see/edit their own contacts)
-- create policy "Users can view own contacts" 
-- on emergency_contacts for select using (auth.uid() = user_id);

-- create policy "Users can insert own contacts" 
-- on emergency_contacts for insert with check (auth.uid() = user_id);

-- create policy "Users can delete own contacts" 
-- on emergency_contacts for delete using (auth.uid() = user_id);



-- -- 1. Create the Live Tracking Table
-- create table public.user_locations (
--   user_id uuid references auth.users not null primary key, 
--   latitude float not null,
--   longitude float not null,
--   is_active boolean default false, 
--   updated_at timestamp with time zone default now()
-- );

-- -- 2. Enable Security
-- alter table public.user_locations enable row level security;



-- -- A. The User can Insert/Update their OWN location
-- create policy "Users can update own location"
--   on public.user_locations
--   for all 
--   using ( auth.uid() = user_id )
--   with check ( auth.uid() = user_id );


-- create policy "Public read location"
--   on public.user_locations
--   for select
--   using ( true );


-- profiles (unchanged except added NOT NULL on full_name optional)
create table public.profiles (
  id uuid references auth.users not null primary key, 
  updated_at timestamp with time zone,
  full_name text not null,                        
  phone_number text,                    
  constraint username_length check (char_length(full_name) >= 2)
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles
  for select
  using ( (SELECT auth.uid()) = id );

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check ( (SELECT auth.uid()) = id );

create policy "Users can update own profile"
  on public.profiles
  for update
  using ( (SELECT auth.uid()) = id )
  with check ( (SELECT auth.uid()) = id );

ALTER TABLE public.profiles 
ADD COLUMN country_code text;


create or replace function public.delete_user()
returns void as $$
begin
  -- delete related rows first to avoid FK issues
  delete from public.profiles where id = auth.uid();
  delete from public.emergency_contacts where user_id = auth.uid();
  delete from public.user_locations where user_id = auth.uid();

  -- finally remove auth user (be cautious)
  delete from auth.users where id = auth.uid();
end;
$$ language plpgsql security definer;

grant execute on function public.delete_user() to authenticated;


-- emergency_contacts
create table public.emergency_contacts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null, 
  name text,
  email text not null, 
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.emergency_contacts enable row level security;

create policy "Users can view own contacts" 
  on public.emergency_contacts
  for select
  using ( (SELECT auth.uid()) = user_id );

create policy "Users can insert own contacts" 
  on public.emergency_contacts
  for insert
  with check ( (SELECT auth.uid()) = user_id );

create policy "Users can delete own contacts" 
  on public.emergency_contacts
  for delete
  using ( (SELECT auth.uid()) = user_id );


-- user_locations
create table public.user_locations (
  user_id uuid references auth.users not null primary key, 
  latitude double precision not null,
  longitude double precision not null,
  is_active boolean default false, 
  updated_at timestamp with time zone default now()
);

alter table public.user_locations enable row level security;

-- Allow any authenticated user to SELECT (example)
create policy "Public: read user_locations"
  on public.user_locations
  for select
  using ( true );

-- Allow owners to insert/update/delete their own location
create policy "Owners can modify user_locations"
  on public.user_locations
  for all
  using ( (SELECT auth.uid()) = user_id )
  with check ( (SELECT auth.uid()) = user_id );