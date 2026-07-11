import { useState } from 'react';
import OnboardingFlow from '@/sections/prototype/Onboarding';
import AuthScreen from '@/sections/prototype/Auth';
import HomeScreen from '@/sections/prototype/Home';
import ProviderProfileScreen from '@/sections/prototype/ProviderProfile';
import AddRecommendationScreen from '@/sections/prototype/AddRecommendation';
import MyTribeScreen from '@/sections/prototype/MyTribe';
import SearchScreen from '@/sections/prototype/Search';
import UserProfileScreen from '@/sections/prototype/UserProfile';
import ProviderPassportScreen from '@/sections/prototype/ProviderPassport';
import ConsensusRequestScreen from '@/sections/prototype/ConsensusRequest';
import { Home, Search as SearchIcon, Users, Plus, User } from 'lucide-react'; // Removed Tag for Deals

export type Screen =
  | 'auth'
  | 'onboarding'
  | 'home'
  | 'search'
  | 'provider-profile'
  | 'add-recommendation'
  | 'my-tribe'
  | 'user-profile'
  | 'provider-passport'
  | 'consensus-request';

export function PrototypePage() {
  const [screen, setScreen] = useState<Screen>('auth');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'tribe' | 'profile'>('home');

  const showShell = screen !== 'auth' && screen !== 'onboarding';

  const handleTabChange = (tab: 'home' | 'search' | 'tribe' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'home') setScreen('home');
    if (tab === 'search') setScreen('search');
    if (tab === 'tribe') setScreen('my-tribe');
    if (tab === 'profile') setScreen('user-profile');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'auth':
        return <AuthScreen onNavigate={setScreen} />;
      case 'onboarding':
        return <OnboardingFlow onDone={() => { setScreen('home'); setActiveTab('home'); }} />;
      case 'home':
        return <HomeScreen onNavigate={setScreen} />;
      case 'search':
        return <SearchScreen onNavigate={setScreen} />;
      case 'provider-profile':
        return <ProviderProfileScreen onNavigate={setScreen} />;
      case 'add-recommendation':
        return <AddRecommendationScreen onNavigate={setScreen} />;
      case 'my-tribe':
        return <MyTribeScreen />;
      case 'user-profile':
        return <UserProfileScreen />;
      case 'provider-passport':
        return <ProviderPassportScreen onNavigate={setScreen} />;
      case 'consensus-request':
        return <ConsensusRequestScreen onNavigate={setScreen} />;
    }
  };

  // Determine if current screen has a dark header (so status bar text should be white)
  const hasDarkHeader = ['auth', 'home', 'search', 'provider-profile', 'my-tribe', 'user-profile', 'provider-passport'].includes(screen);

  return (
    <div className="prototype-container">
      {/* Device Shell */}
      <div className="animate-slide-up-fade device-shell">
        {/* Status Bar */}
          <div
            style={{
              height: '44px',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              flexShrink: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: hasDarkHeader ? '#ffffff' : '#17171c' }}>9:41</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: hasDarkHeader ? '#ffffff' : '#17171c' }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="3" width="3" height="9" rx="1" fill="currentColor" />
                <rect x="4.5" y="2" width="3" height="10" rx="1" fill="currentColor" />
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="currentColor" />
                <rect x="13.5" y="0.5" width="2.5" height="11.5" rx="1" fill="currentColor" opacity="0.3" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35" />
                <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: '#f8fafc',
            }}
          >
            {/* Screen Content */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
              {renderScreen()}
            </div>

            {/* Bottom Nav */}
            {showShell && !['provider-profile', 'add-recommendation', 'provider-passport', 'consensus-request'].includes(screen) && (
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} onAdd={() => setScreen('add-recommendation')} />
            )}
          </div>
        </div>
      </div>
  );
}

function BottomNav({ activeTab, onTabChange, onAdd }: {
  activeTab: 'home' | 'search' | 'tribe' | 'profile';
  onTabChange: (tab: 'home' | 'search' | 'tribe' | 'profile') => void;
  onAdd: () => void;
}) {
  return (
    <div
      style={{
        height: '84px',
        background: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'flex-start', // Align to top because of padding bottom
        justifyContent: 'space-around',
        padding: '12px 16px 24px 16px', // Extra bottom padding for home indicator
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.03)'
      }}
    >
      <NavTab icon={Home} label="Discover" active={activeTab === 'home'} onClick={() => onTabChange('home')} />
      <NavTab icon={SearchIcon} label="Search" active={activeTab === 'search'} onClick={() => onTabChange('search')} />

      {/* Primary Action Button (Dark Purple) */}
      <button
        onClick={onAdd}
        style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', // Dark purple gradient
          color: '#ffffff',
          borderRadius: '28px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 16px rgba(76, 29, 149, 0.25)',
          transform: 'translateY(-20px)',
          transition: 'transform 0.2s',
        }}
        onMouseDown={e => e.currentTarget.style.transform = 'translateY(-16px) scale(0.95)'}
        onMouseUp={e => e.currentTarget.style.transform = 'translateY(-20px) scale(1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-20px) scale(1)'}
      >
        <Plus size={28} />
      </button>

      <NavTab icon={Users} label="My Tribe" active={activeTab === 'tribe'} onClick={() => onTabChange('tribe')} />
      <NavTab icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
    </div>
  );
}

function NavTab({ icon: Icon, label, active, onClick }: { icon: any; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        padding: '4px',
        flex: 1,
        transition: 'color 0.2s'
      }}
    >
      <Icon size={24} color={active ? '#4c1d95' : '#94a3b8'} strokeWidth={active ? 2.5 : 2} />
      <span style={{
        fontSize: '11px', fontWeight: active ? 600 : 500,
        color: active ? '#4c1d95' : '#94a3b8',
      }}>{label}</span>
    </button>
  );
}
