-- Affiliate/Referral Program Schema
-- Supports multiple programs, custom rewards, and full attribution tracking

-- Programs table (for multi-tenant or multiple campaigns)
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  reward_type TEXT NOT NULL DEFAULT 'credit' CHECK (reward_type IN ('credit', 'cash', 'discount', 'custom')),
  reward_amount DECIMAL(10, 2) NOT NULL DEFAULT 10.00,
  reward_currency TEXT DEFAULT 'USD',
  referrer_reward DECIMAL(10, 2) NOT NULL DEFAULT 10.00,
  referee_reward DECIMAL(10, 2) NOT NULL DEFAULT 10.00,
  min_payout DECIMAL(10, 2) DEFAULT 50.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referral codes
CREATE TABLE referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  custom_code TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Click tracking
CREATE TABLE referral_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id UUID REFERENCES referral_codes(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  referer_url TEXT,
  landing_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Signup attribution
CREATE TABLE referral_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id UUID REFERENCES referral_codes(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL,
  referee_id UUID NOT NULL,
  click_id UUID REFERENCES referral_clicks(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'qualified', 'converted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  qualified_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ
);

-- Conversions (when referee completes qualifying action)
CREATE TABLE referral_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  signup_id UUID REFERENCES referral_signups(id) ON DELETE CASCADE,
  referrer_id UUID NOT NULL,
  referee_id UUID NOT NULL,
  program_id UUID REFERENCES programs(id),
  conversion_type TEXT NOT NULL, -- 'subscription', 'purchase', 'custom'
  conversion_value DECIMAL(10, 2),
  referrer_reward DECIMAL(10, 2) NOT NULL,
  referee_reward DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payouts
CREATE TABLE referral_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payout_method TEXT, -- 'stripe', 'paypal', 'bank', 'credit'
  payout_details JSONB,
  conversion_ids UUID[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- User balances (for credit-based rewards)
CREATE TABLE referral_balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  available_balance DECIMAL(10, 2) DEFAULT 0,
  pending_balance DECIMAL(10, 2) DEFAULT 0,
  total_earned DECIMAL(10, 2) DEFAULT 0,
  total_withdrawn DECIMAL(10, 2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_referral_codes_user ON referral_codes(user_id);
CREATE INDEX idx_referral_codes_code ON referral_codes(code);
CREATE INDEX idx_referral_clicks_code ON referral_clicks(code_id);
CREATE INDEX idx_referral_clicks_referrer ON referral_clicks(referrer_id);
CREATE INDEX idx_referral_signups_referrer ON referral_signups(referrer_id);
CREATE INDEX idx_referral_signups_referee ON referral_signups(referee_id);
CREATE INDEX idx_referral_conversions_referrer ON referral_conversions(referrer_id);

-- Enable RLS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_balances ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Programs: readable by all, writable by admins
CREATE POLICY "Programs are viewable by everyone" ON programs FOR SELECT USING (true);

-- Referral codes: users can manage their own
CREATE POLICY "Users can view their own codes" ON referral_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own codes" ON referral_codes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Clicks: insert for tracking, select for code owners
CREATE POLICY "Anyone can create clicks" ON referral_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Referrers can view their clicks" ON referral_clicks FOR SELECT USING (auth.uid() = referrer_id);

-- Signups: viewable by referrer and referee
CREATE POLICY "Users can view related signups" ON referral_signups FOR SELECT 
  USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

-- Conversions: viewable by participants
CREATE POLICY "Users can view related conversions" ON referral_conversions FOR SELECT 
  USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

-- Payouts: users can view their own
CREATE POLICY "Users can view their payouts" ON referral_payouts FOR SELECT USING (auth.uid() = user_id);

-- Balances: users can view their own
CREATE POLICY "Users can view their balance" ON referral_balances FOR SELECT USING (auth.uid() = user_id);

-- Insert default program
INSERT INTO programs (name, slug, description, reward_type, referrer_reward, referee_reward) 
VALUES ('Default Program', 'default', 'Get rewarded for referring friends!', 'credit', 10.00, 10.00);
