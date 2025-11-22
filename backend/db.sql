-- stores name and phone number

create table public.profiles (
  id uuid references auth.users not null, 
  updated_at timestamp with time zone,
  full_name text,                        
  phone_number text,                    
  primary key (id),
  constraint username_length check (char_length(full_name) >= 2)
);


alter table public.profiles enable row level security;

create policy "Users can view own profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );