import { useState, useEffect } from 'react';
import { Gift, Copy, Check, Users, TrendingUp, DollarSign, MousePointer } from 'lucide-react';
import { getOrCreateReferralCode, getReferralStats, ReferralCode, ReferralStats } from '../lib/referrals';

interface Props {
  userId: string;
  userName: string;
  baseUrl?: string;
}

export function ReferralDashboard({ userId, userName, baseUrl = window.location.origin }: Props) {
  const [code, setCode] = useState<ReferralCode | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [codeData, statsData] = await Promise.all([
        getOrCreateReferralCode(userId, userName),
        getReferralStats(userId)
      ]);
      setCode(codeData);
      setStats(statsData);
      setLoading(false);
    }
    load();
  }, [userId, userName]);

  const referralLink = code ? `${baseUrl}?ref=${code.code}` : '';

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Gift className="w-7 h-7 text-blue-600" />
          Refer & Earn
        </h1>
        <p className="text-gray-600 mt-1">
          Share your link and earn rewards for every friend who joins
        </p>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">Your Referral Link</h2>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-mono text-sm"
          />
          <button
            onClick={copyLink}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        {code?.custom_code && (
          <p className="text-sm text-gray-500 mt-2">
            Custom code: <code className="bg-gray-100 px-2 py-0.5 rounded">{code.custom_code}</code>
          </p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<MousePointer className="w-5 h-5" />}
          label="Link Clicks"
          value={stats?.clicks || 0}
          color="blue"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Sign Ups"
          value={stats?.signups || 0}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Conversions"
          value={stats?.conversions || 0}
          color="purple"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Earned"
          value={`$${stats?.totalEarnings.toFixed(2) || '0.00'}`}
          color="emerald"
        />
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="font-semibold text-gray-900 mb-4">How It Works</h2>
        <div className="space-y-4">
          <Step number={1} text="Share your unique referral link with friends" />
          <Step number={2} text="They sign up using your link" />
          <Step number={3} text="When they become a paying customer, you both earn rewards!" />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          No limit on referrals — the more you share, the more you earn!
        </p>
      </div>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <p className="text-gray-700 pt-0.5">{text}</p>
    </div>
  );
}
