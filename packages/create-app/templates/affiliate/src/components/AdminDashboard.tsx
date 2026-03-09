import { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, MousePointer, ArrowUpRight, Settings } from 'lucide-react';
import { supabase, isConfigured } from '../lib/supabase';

interface ProgramStats {
  totalClicks: number;
  totalSignups: number;
  totalConversions: number;
  totalPaidOut: number;
  conversionRate: number;
}

interface TopReferrer {
  user_id: string;
  name: string;
  email: string;
  referrals: number;
  conversions: number;
  earnings: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<ProgramStats | null>(null);
  const [topReferrers, setTopReferrers] = useState<TopReferrer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!isConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const [clicksRes, signupsRes, conversionsRes, payoutsRes] = await Promise.all([
      supabase.from('referral_clicks').select('id', { count: 'exact' }),
      supabase.from('referral_signups').select('id', { count: 'exact' }),
      supabase.from('referral_conversions').select('id, referrer_reward'),
      supabase.from('referral_payouts').select('amount').eq('status', 'completed')
    ]);

    const totalClicks = clicksRes.count || 0;
    const totalSignups = signupsRes.count || 0;
    const totalConversions = conversionsRes.count || 0;
    const totalPaidOut = payoutsRes.data?.reduce((sum, p) => sum + p.amount, 0) || 0;

    setStats({
      totalClicks,
      totalSignups,
      totalConversions,
      totalPaidOut,
      conversionRate: totalSignups > 0 ? (totalConversions / totalSignups) * 100 : 0
    });

    // Load top referrers (simplified - would need a view or function in production)
    const { data: referrers } = await supabase
      .from('referral_balances')
      .select('user_id, total_earned')
      .order('total_earned', { ascending: false })
      .limit(10);

    if (referrers) {
      setTopReferrers(referrers.map(r => ({
        user_id: r.user_id,
        name: 'User',
        email: '',
        referrals: 0,
        conversions: 0,
        earnings: r.total_earned
      })));
    }

    setLoading(false);
  }

  if (!isConfigured) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Configure Supabase to view admin dashboard</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Affiliate Program Admin</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your referral program</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          icon={<MousePointer className="w-5 h-5" />}
          label="Total Clicks"
          value={stats?.totalClicks || 0}
          color="blue"
        />
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total Signups"
          value={stats?.totalSignups || 0}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="Conversions"
          value={stats?.totalConversions || 0}
          color="purple"
        />
        <StatCard
          icon={<ArrowUpRight className="w-5 h-5" />}
          label="Conversion Rate"
          value={`${stats?.conversionRate.toFixed(1)}%`}
          color="orange"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Paid Out"
          value={`$${stats?.totalPaidOut.toFixed(2)}`}
          color="emerald"
        />
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Referral Funnel</h2>
        <div className="flex items-end justify-between h-40 gap-4">
          <FunnelBar 
            label="Clicks" 
            value={stats?.totalClicks || 0} 
            percentage={100} 
            color="bg-blue-500" 
          />
          <FunnelBar 
            label="Signups" 
            value={stats?.totalSignups || 0} 
            percentage={stats?.totalClicks ? ((stats?.totalSignups || 0) / stats.totalClicks) * 100 : 0} 
            color="bg-green-500" 
          />
          <FunnelBar 
            label="Conversions" 
            value={stats?.totalConversions || 0} 
            percentage={stats?.totalClicks ? ((stats?.totalConversions || 0) / stats.totalClicks) * 100 : 0} 
            color="bg-purple-500" 
          />
        </div>
      </div>

      {/* Top Referrers */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Top Referrers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Earnings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topReferrers.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-gray-500">
                    No referrers yet
                  </td>
                </tr>
              ) : (
                topReferrers.map((referrer, i) => (
                  <tr key={referrer.user_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                          {i + 1}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">
                          {referrer.user_id.slice(0, 8)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                      ${referrer.earnings.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
    orange: 'bg-orange-50 text-orange-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function FunnelBar({ 
  label, 
  value, 
  percentage, 
  color 
}: { 
  label: string; 
  value: number; 
  percentage: number; 
  color: string; 
}) {
  const height = Math.max(percentage, 10);
  
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="text-lg font-bold text-gray-900 mb-1">{value}</div>
      <div 
        className={`w-full ${color} rounded-t-lg transition-all duration-500`} 
        style={{ height: `${height}%` }} 
      />
      <div className="text-sm text-gray-500 mt-2">{label}</div>
    </div>
  );
}
