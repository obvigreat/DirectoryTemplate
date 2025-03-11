-- Create messages table for contact form submissions
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id INTEGER NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table for appointment bookings
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id INTEGER NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add triggers to update the updated_at column
DROP TRIGGER IF EXISTS update_messages_updated_at ON public.messages;
CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Listing owners can view messages for their listings
DROP POLICY IF EXISTS "Listing owners can view messages" ON public.messages;
CREATE POLICY "Listing owners can view messages"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.listings
            WHERE listings.id = messages.listing_id
            AND listings.user_id = auth.uid()
        )
    );

-- Users can view their own messages
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
CREATE POLICY "Users can view their own messages"
    ON public.messages FOR SELECT
    USING (user_id = auth.uid());

-- Users can create messages
DROP POLICY IF EXISTS "Users can create messages" ON public.messages;
CREATE POLICY "Users can create messages"
    ON public.messages FOR INSERT
    WITH CHECK (true);

-- Add RLS policies for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Listing owners can view and update bookings for their listings
DROP POLICY IF EXISTS "Listing owners can view bookings" ON public.bookings;
CREATE POLICY "Listing owners can view bookings"
    ON public.bookings FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.listings
            WHERE listings.id = bookings.listing_id
            AND listings.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Listing owners can update bookings" ON public.bookings;
CREATE POLICY "Listing owners can update bookings"
    ON public.bookings FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.listings
            WHERE listings.id = bookings.listing_id
            AND listings.user_id = auth.uid()
        )
    );

-- Users can view their own bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings"
    ON public.bookings FOR SELECT
    USING (user_id = auth.uid());

-- Users can create bookings
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
CREATE POLICY "Users can create bookings"
    ON public.bookings FOR INSERT
    WITH CHECK (true);

-- Add publication for realtime
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.bookings;
