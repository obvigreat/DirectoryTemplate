-- Add role column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role') THEN
    ALTER TABLE public.users ADD COLUMN role TEXT DEFAULT 'user';
  END IF;
END $$;

-- Create index on role column
CREATE INDEX IF NOT EXISTS users_role_idx ON public.users(role);

-- Update existing users to have admin role (for development purposes)
UPDATE public.users SET role = 'admin' WHERE id IN (SELECT id FROM public.users LIMIT 1);
