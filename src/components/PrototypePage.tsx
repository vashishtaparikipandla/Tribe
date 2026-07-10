import React, { useState } from 'react';
import OnboardingFlow from '@/sections/prototype/Onboarding';
import HomeScreen from '@/sections/prototype/Home';
import ProviderProfileScreen from '@/sections/prototype/ProviderProfile';
import AddRecommendationScreen from '@/sections/prototype/AddRecommendation';
import MyTribeScreen from '@/sections/prototype/MyTribe';
import SearchScreen from '@/sections/prototype/Search';
import UserProfileScreen from '@/sections/prototype/UserProfile';
import { Home, Search as SearchIcon, Users, Tag, Plus, Menu } from 'lucide-react';

export type Screen =
  | 'onboarding'
  | 'home'
  | 'search'
  | 'provider-profile'
  | 'add-recommendation'
  | 'my-tribe'
  | 'user-profile';

export function PrototypePage() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'tribe' | 'deals'>('home');

  const showShell = screen !== 'onboarding';

  const handleTabChange = (tab: 'home' | 'search' | 'tribe' | 'deals') => {
    setActiveTab(tab);
    if (tab === 'home') setScreen('home');
    if (tab === 'search') setScreen('search');
    if (tab === 'tribe') setScreen('my-tribe');
    if (tab === 'deals') setScreen('home'); // Placeholder
  };

  const renderScreen = () => {
    switch (screen) {
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
        return <MyTribeScreen onNavigate={setScreen} />;
      case 'user-profile':
        return <UserProfileScreen onNavigate={setScreen} />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f2f2f2', // Card Border color for the presentation background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: '24px',
      }}
    >
      {/* Device Shell */}
      <div
        style={{
          width: '412px',
          height: '860px',
          transform: 'scale(0.82)',
          transformOrigin: 'top center',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#ffffff',
            borderRadius: '44px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            border: '8px solid #17171c', // Dark bezel for realistic look
          }}
        >
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
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: (screen === 'provider-profile' || screen === 'user-profile') ? '#ffffff' : '#17171c' }}>9:41</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: (screen === 'provider-profile' || screen === 'user-profile') ? '#ffffff' : '#17171c' }}>
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
            }}
          >
            {/* Top App Bar (shown only when not onboarding) */}
            {showShell && screen !== 'provider-profile' && screen !== 'add-recommendation' && screen !== 'user-profile' && (
              <TopBar screen={screen} onNavigate={setScreen} />
            )}
            
            {/* Pad top for screens without topbar but with status bar */}
            {(screen === 'provider-profile' || screen === 'add-recommendation' || screen === 'user-profile') && (
              <div style={{ height: '44px', background: screen === 'add-recommendation' ? '#ffffff' : '#003c33', flexShrink: 0 }} />
            )}

            {/* Screen Content */}
            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
              {renderScreen()}
            </div>

            {/* Bottom Nav */}
            {showShell && screen !== 'provider-profile' && screen !== 'add-recommendation' && (
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} onAdd={() => setScreen('add-recommendation')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ screen, onNavigate }: { screen: Screen; onNavigate: (s: Screen) => void }) {
  return (
    <div
      style={{
        height: '64px',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0,
        zIndex: 10,
        paddingTop: '44px', // Space for status bar
      }}
    >
      <div>
        <div style={{ fontSize: '24px', fontWeight: 800, color: '#17171c', letterSpacing: '-0.5px' }}>Tribe</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex' }}>
          <Menu size={24} color="#17171c" />
        </button>
        <button 
          onClick={() => onNavigate('user-profile')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
            alt="Profile"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </button>
      </div>
    </div>
  );
}

function BottomNav({ activeTab, onTabChange, onAdd }: {
  activeTab: 'home' | 'search' | 'tribe' | 'deals';
  onTabChange: (tab: 'home' | 'search' | 'tribe' | 'deals') => void;
  onAdd: () => void;
}) {
  return (
    <div
      style={{
        height: '80px',
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <NavTab icon={Home} label="Discover" active={activeTab === 'home'} onClick={() => onTabChange('home')} />
      <NavTab icon={SearchIcon} label="Search" active={activeTab === 'search'} onClick={() => onTabChange('search')} />

      {/* Primary Action Button (Cohere style pill) */}
      <button
        onClick={onAdd}
        style={{
          height: '48px',
          padding: '0 24px',
          background: '#17171c',
          color: '#ffffff',
          borderRadius: '32px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          fontWeight: 500, fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Plus size={20} />
        Add
      </button>

      <NavTab icon={Users} label="My Tribe" active={activeTab === 'tribe'} onClick={() => onTabChange('tribe')} />
      <NavTab icon={Tag} label="Deals" active={activeTab === 'deals'} onClick={() => onTabChange('deals')} />
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
        padding: '8px',
        flex: 1,
      }}
    >
      <Icon size={24} color={active ? '#17171c' : '#93939f'} strokeWidth={active ? 2.5 : 2} />
      <span style={{
        fontSize: '11px', fontWeight: active ? 600 : 400,
        color: active ? '#17171c' : '#93939f',
      }}>{label}</span>
    </button>
  );
}
