-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  stripe_product_id TEXT,
  product_name TEXT,
  status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscriptions
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON user_subscriptions;
CREATE POLICY "Users can view their own subscriptions"
ON user_subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Only the system can insert/update subscriptions
DROP POLICY IF EXISTS "Only the system can manage subscriptions" ON user_subscriptions;
CREATE POLICY "Only the system can manage subscriptions"
ON user_subscriptions FOR ALL
USING (auth.uid() IN (
  SELECT id FROM users WHERE role = 'admin'
));

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE user_subscriptions;
