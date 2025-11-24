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



ALTER TABLE public.profiles 
ADD COLUMN country_code text;



-- delete the current user's account
create or replace function delete_user()
returns void as $$
begin

  -- Delete row from the profiles table 
  delete from public.profiles where id = auth.uid(); 
  
  -- Delete the actual user from auth.users (requires specific RLS policy)
  delete from auth.users where id = auth.uid();
end;
$$ language plpgsql security definer;

-- Grant execution rights to authenticated users
grant execute on function public.delete_user() to authenticated;