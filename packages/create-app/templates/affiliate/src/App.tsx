import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Gift, LayoutDashboard, Users } from 'lucide-react';
import { ReferralDashboard } from './components/ReferralDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { initReferralTracking } from './lib/referrals';

// Demo user - replace with your auth system
const DEMO_USER = {
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@example.com',
  isAdmin: true
};

function App() {
  useEffect(() => {
    // Initialize referral tracking on app load
    initReferralTracking();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-64 p-8">
          <Routes>
            <Route path="/" element={
              <ReferralDashboard 
                userId={DEMO_USER.id} 
                userName={DEMO_USER.name} 
              />
            } />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Sidebar() {
  const location = useLocation();
  
  const links = [
    { path: '/', icon: Gift, label: 'My Referrals' },
    { path: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-gray-900">Affiliate Program</span>
      </div>
      
      <nav className="space-y-1">
        {links.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm font-medium text-gray-900">{DEMO_USER.name}</div>
          <div className="text-xs text-gray-500">{DEMO_USER.email}</div>
        </div>
      </div>
    </aside>
  );
}

export default App;
