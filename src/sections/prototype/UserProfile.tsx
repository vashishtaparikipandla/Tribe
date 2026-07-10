import React from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Settings, Shield, Bell, HelpCircle, ChevronRight, Share, Activity, Award } from 'lucide-react';

export default function UserProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100%', paddingBottom: '32px' }}>
      {/* Header Band */}
      <div style={{
        background: '#003c33', // Deep Enterprise Green
        padding: '32px 24px',
        color: '#ffffff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="Vashishta"
            style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #ffffff' }}
          />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              Vashishta P.
            </h1>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.8 }}>Joined Oct 2024</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ padding: '24px', display: 'flex', gap: '12px', marginTop: '-24px' }}>
        <div style={{
          flex: 1, background: '#ffffff', borderRadius: '16px', padding: '16px',
          border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <Award size={20} color="#1863dc" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#17171c' }}>12</div>
          <div style={{ fontSize: '12px', color: '#616161' }}>Recommendations</div>
        </div>
        <div style={{
          flex: 1, background: '#ffffff', borderRadius: '16px', padding: '16px',
          border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <Activity size={20} color="#003c33" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#17171c' }}>34</div>
          <div style={{ fontSize: '12px', color: '#616161' }}>Helped Others</div>
        </div>
      </div>

      {/* Settings List */}
      <div style={{ padding: '0 24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#212121', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Account
        </h2>
        
        <div style={{ borderTop: '1px solid #d9d9dd' }}>
          {[
            { icon: Shield, label: 'Privacy & Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Preferences' },
            { icon: Share, label: 'Invite Friends' },
            { icon: HelpCircle, label: 'Support & FAQ' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0', borderBottom: '1px solid #d9d9dd', cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <item.icon size={20} color="#212121" />
                <span style={{ fontSize: '16px', color: '#212121' }}>{item.label}</span>
              </div>
              <ChevronRight size={20} color="#93939f" />
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: '32px 24px' }}>
        <button style={{
          width: '100%', padding: '14px',
          background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '32px',
          color: '#b30000', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
        }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
