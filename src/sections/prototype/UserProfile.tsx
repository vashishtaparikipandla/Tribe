

import type { Screen } from '@/components/PrototypePage';
import { Settings, Shield, Bell, HelpCircle, ChevronRight, Share, Activity, Award, Bookmark } from 'lucide-react';

export default function UserProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }}>
      {/* Header Band */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 48px', // Space for status bar + extra padding for overlap
        color: '#ffffff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="animate-slide-up-fade">
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="Vashishta"
            style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)' }}
          />
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
              Vashishta P.
            </h1>
            <p style={{ fontSize: '15px', margin: 0, color: '#e9d5ff', fontWeight: 500 }}>Joined Oct 2024</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="animate-slide-up-fade delay-100" style={{ padding: '0 24px', display: 'flex', gap: '16px', marginTop: '-24px', position: 'relative', zIndex: 2 }}>
        <div style={{
          flex: 1, background: '#ffffff', borderRadius: '20px', padding: '20px',
          border: '1px solid #f1f5f9', boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
        }}>
          <div style={{ background: '#faf5ff', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Award size={20} color="#7e22ce" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>12</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Recommendations</div>
        </div>
        <div style={{
          flex: 1, background: '#ffffff', borderRadius: '20px', padding: '20px',
          border: '1px solid #f1f5f9', boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
        }}>
          <div style={{ background: '#f5f3ff', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Activity size={20} color="#6b21a8" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a' }}>34</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Helped Others</div>
        </div>
      </div>

      {/* Saved Providers Entry Point */}
      <div className="animate-slide-up-fade delay-100" style={{ padding: '24px 24px 0' }}>
        <button onClick={() => onNavigate('saved-providers')} style={{
          width: '100%', background: '#ffffff', borderRadius: '20px', padding: '20px',
          border: '1px solid #e9d5ff', boxShadow: '0 8px 24px rgba(76, 29, 149, 0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#faf5ff', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bookmark size={24} color="#7e22ce" fill="#7e22ce" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Saved Providers</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Your private bookmarks</div>
            </div>
          </div>
          <ChevronRight size={24} color="#cbd5e1" />
        </button>
      </div>

      {/* Settings List */}
      <div className="animate-slide-up-fade delay-200" style={{ padding: '32px 24px 0' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Account
        </h2>
        
        <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          {[
            { icon: Shield, label: 'Privacy & Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Preferences' },
            { icon: Share, label: 'Invite Friends' },
            { icon: HelpCircle, label: 'Support & FAQ' },
          ].map((item, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px', borderBottom: i === arr.length - 1 ? 'none' : '1px solid #f1f5f9', cursor: 'pointer',
              background: '#ffffff'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <item.icon size={20} color="#64748b" />
                <span style={{ fontSize: '16px', color: '#0f172a', fontWeight: 500 }}>{item.label}</span>
              </div>
              <ChevronRight size={20} color="#cbd5e1" />
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="animate-slide-up-fade delay-300" style={{ padding: '32px 24px' }}>
        <button style={{
          width: '100%', padding: '16px',
          background: '#ffffff', border: '1px solid #fecaca', borderRadius: '32px',
          color: '#ef4444', fontSize: '16px', fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(239, 68, 68, 0.05)'
        }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
