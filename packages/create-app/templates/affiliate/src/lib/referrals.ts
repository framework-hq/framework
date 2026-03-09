import { supabase, isConfigured } from './supabase';

export interface ReferralCode {
  id: string;
  user_id: string;
  program_id: string;
  code: string;
  custom_code?: string;
  is_active: boolean;
  created_at: string;
}

export interface ReferralStats {
  clicks: number;
  signups: number;
  conversions: number;
  pendingEarnings: number;
  totalEarnings: number;
}

export interface Program {
  id: string;
  name: string;
  slug: string;
  reward_type: string;
  referrer_reward: number;
  referee_reward: number;
}

// Generate a unique referral code
function generateCode(name: string): string {
  const clean = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}${random}`;
}

// Get or create referral code for a user
export async function getOrCreateReferralCode(
  userId: string, 
  userName: string,
  programSlug: string = 'default'
): Promise<ReferralCode | null> {
  if (!isConfigured || !supabase) return null;

  // Check if user already has a code for this program
  const { data: existing } = await supabase
    .from('referral_codes')
    .select('*, programs(*)')
    .eq('user_id', userId)
    .single();

  if (existing) return existing;

  // Get program
  const { data: program } = await supabase
    .from('programs')
    .select('id')
    .eq('slug', programSlug)
    .single();

  if (!program) return null;

  // Create new code
  const code = generateCode(userName);
  const { data: newCode, error } = await supabase
    .from('referral_codes')
    .insert({
      user_id: userId,
      program_id: program.id,
      code
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating referral code:', error);
    return null;
  }

  return newCode;
}

// Track a referral click
export async function trackClick(
  code: string,
  metadata: {
    ip?: string;
    userAgent?: string;
    referer?: string;
    landingPage?: string;
  } = {}
): Promise<string | null> {
  if (!isConfigured || !supabase) return null;

  // Find the referral code
  const { data: referralCode } = await supabase
    .from('referral_codes')
    .select('id, user_id')
    .eq('code', code)
    .eq('is_active', true)
    .single();

  if (!referralCode) return null;

  // Record the click
  const { data: click, error } = await supabase
    .from('referral_clicks')
    .insert({
      code_id: referralCode.id,
      referrer_id: referralCode.user_id,
      ip_address: metadata.ip,
      user_agent: metadata.userAgent,
      referer_url: metadata.referer,
      landing_page: metadata.landingPage
    })
    .select()
    .single();

  if (error) {
    console.error('Error tracking click:', error);
    return null;
  }

  // Store in cookie for attribution
  document.cookie = `ref_code=${code}; max-age=${7 * 24 * 60 * 60}; path=/`;
  document.cookie = `ref_click=${click.id}; max-age=${7 * 24 * 60 * 60}; path=/`;

  return click.id;
}

// Attribute a signup to a referrer
export async function attributeSignup(
  refereeId: string,
  referralCode?: string
): Promise<boolean> {
  if (!isConfigured || !supabase) return false;

  // Get code from parameter or cookie
  const code = referralCode || getCookie('ref_code');
  const clickId = getCookie('ref_click');

  if (!code) return false;

  // Find the referral code
  const { data: codeData } = await supabase
    .from('referral_codes')
    .select('id, user_id')
    .eq('code', code)
    .single();

  if (!codeData || codeData.user_id === refereeId) return false;

  // Create signup record
  const { error } = await supabase
    .from('referral_signups')
    .insert({
      code_id: codeData.id,
      referrer_id: codeData.user_id,
      referee_id: refereeId,
      click_id: clickId || null,
      status: 'pending'
    });

  if (error) {
    console.error('Error attributing signup:', error);
    return false;
  }

  // Clear cookies
  document.cookie = 'ref_code=; max-age=0; path=/';
  document.cookie = 'ref_click=; max-age=0; path=/';

  return true;
}

// Record a conversion
export async function recordConversion(
  refereeId: string,
  conversionType: string,
  conversionValue?: number
): Promise<boolean> {
  if (!isConfigured || !supabase) return false;

  // Find pending signup
  const { data: signup } = await supabase
    .from('referral_signups')
    .select('*, referral_codes(program_id, programs(*))')
    .eq('referee_id', refereeId)
    .eq('status', 'pending')
    .single();

  if (!signup) return false;

  const program = signup.referral_codes?.programs;
  if (!program) return false;

  // Create conversion
  const { error: convError } = await supabase
    .from('referral_conversions')
    .insert({
      signup_id: signup.id,
      referrer_id: signup.referrer_id,
      referee_id: refereeId,
      program_id: program.id,
      conversion_type: conversionType,
      conversion_value: conversionValue,
      referrer_reward: program.referrer_reward,
      referee_reward: program.referee_reward
    });

  if (convError) {
    console.error('Error recording conversion:', convError);
    return false;
  }

  // Update signup status
  await supabase
    .from('referral_signups')
    .update({ status: 'converted', converted_at: new Date().toISOString() })
    .eq('id', signup.id);

  // Update balances
  await updateBalance(signup.referrer_id, program.referrer_reward);
  await updateBalance(refereeId, program.referee_reward);

  return true;
}

// Update user balance
async function updateBalance(userId: string, amount: number): Promise<void> {
  if (!supabase) return;

  const { data: existing } = await supabase
    .from('referral_balances')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (existing) {
    await supabase
      .from('referral_balances')
      .update({
        available_balance: existing.available_balance + amount,
        total_earned: existing.total_earned + amount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
  } else {
    await supabase
      .from('referral_balances')
      .insert({
        user_id: userId,
        available_balance: amount,
        total_earned: amount
      });
  }
}

// Get referral stats for a user
export async function getReferralStats(userId: string): Promise<ReferralStats> {
  if (!isConfigured || !supabase) {
    return { clicks: 0, signups: 0, conversions: 0, pendingEarnings: 0, totalEarnings: 0 };
  }

  const [clicksRes, signupsRes, conversionsRes, balanceRes] = await Promise.all([
    supabase.from('referral_clicks').select('id', { count: 'exact' }).eq('referrer_id', userId),
    supabase.from('referral_signups').select('id', { count: 'exact' }).eq('referrer_id', userId),
    supabase.from('referral_conversions').select('id, referrer_reward', { count: 'exact' }).eq('referrer_id', userId),
    supabase.from('referral_balances').select('*').eq('user_id', userId).single()
  ]);

  return {
    clicks: clicksRes.count || 0,
    signups: signupsRes.count || 0,
    conversions: conversionsRes.count || 0,
    pendingEarnings: balanceRes.data?.pending_balance || 0,
    totalEarnings: balanceRes.data?.total_earned || 0
  };
}

// Initialize tracking on page load
export function initReferralTracking(): void {
  const params = new URLSearchParams(window.location.search);
  const refCode = params.get('ref');
  
  if (refCode) {
    trackClick(refCode, {
      userAgent: navigator.userAgent,
      referer: document.referrer,
      landingPage: window.location.href
    });
  }
}

// Helper to get cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
