import type { Screen } from '@/components/PrototypePage';
import { Pencil, Shield, Bell, HelpCircle, ChevronRight, Bookmark, MessageCircle, Star, ShieldCheck, Users, UsersRound, Store, ShieldQuestion, UserCog, HeartHandshake } from 'lucide-react';

export default function UserProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const isProvider = true; // Simulating a user who also has a claimed provider profile

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }}>
      
      {/* 1. Header Band */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 24px', 
        color: '#ffffff',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} className="animate-slide-up-fade">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              alt="Vashishta"
              style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}
            />
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
                Vashishta P.
              </h1>
              <p style={{ fontSize: '13px', margin: 0, color: '#e9d5ff', fontWeight: 500 }}>
                Hyderabad • Member since Oct 2024
              </p>
            </div>
          </div>
          <button onClick={() => onNavigate('edit-profile')} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(8px)'
          }}>
            <Pencil size={18} />
          </button>
        </div>

        {/* 2. Trust Identity Strip (Tappable Chips) */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '24px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }} className="animate-slide-up-fade delay-100">
          <button onClick={() => onNavigate('my-recommendations')} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            color: '#ffffff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            <Star size={16} color="#fbbf24" fill="#fbbf24" />
            12 recommendations given
          </button>
          
          <button onClick={() => onNavigate('trust-stats')} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            color: '#ffffff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            <ShieldCheck size={16} color="#10b981" />
            8 people trust your ratings
          </button>

          <button onClick={() => onNavigate('trust-stats')} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '16px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
            color: '#ffffff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap'
          }}>
            <Users size={16} color="#60a5fa" />
            34 contacts synced
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        
        {/* 3. Quick Actions Row */}
        <div className="animate-slide-up-fade delay-150" style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <button onClick={() => onNavigate('consensus-request')} style={{
            flex: 1, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px',
            padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ background: '#f5f3ff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={20} color="#7e22ce" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textAlign: 'center' }}>Ask my<br/>tribe</span>
          </button>

          <button onClick={() => onNavigate('add-recommendation')} style={{
            flex: 1, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px',
            padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ background: '#f0fdf4', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={20} color="#16a34a" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textAlign: 'center' }}>Add<br/>rating</span>
          </button>

          <button onClick={() => onNavigate('saved-providers')} style={{
            flex: 1, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px',
            padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ background: '#fffbeb', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bookmark size={20} color="#d97706" />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textAlign: 'center' }}>Saved<br/>providers</span>
          </button>
        </div>

        {/* 5. Provider Mode Toggle */}
        {isProvider && (
          <div className="animate-slide-up-fade delay-200" style={{ marginBottom: '32px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '20px', padding: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}>
                  <Store size={24} color="#60a5fa" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>Verified Provider</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Switch to Provider Mode</div>
                </div>
              </div>
              <button onClick={() => alert('Provider Dashboard coming soon!')} style={{
                background: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '24px',
                padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
              }}>
                Switch
              </button>
            </div>
          </div>
        )}

        {/* 4. Settings List */}
        <div className="animate-slide-up-fade delay-300">
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Settings
          </h2>
          
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            {[
              { icon: UserCog, label: 'Account & Security', route: 'edit-profile' as Screen },
              { icon: Bell, label: 'Notifications', route: 'notification-preferences' as Screen },
              { icon: Bookmark, label: 'My Bookings', route: 'my-bookings' as Screen },
              { icon: ShieldQuestion, label: 'Privacy & Data', route: 'privacy-data' as Screen },
              { icon: UsersRound, label: 'Household', route: 'household-linking' as Screen },
              { icon: HelpCircle, label: 'Help & Support', route: 'help-support' as Screen },
            ].map((item, i, arr) => (
              <div key={i} onClick={() => onNavigate(item.route)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px', borderBottom: i === arr.length - 1 ? 'none' : '1px solid #f8fafc', cursor: 'pointer',
                background: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <item.icon size={20} color="#64748b" />
                  <span style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600 }}>{item.label}</span>
                </div>
                <ChevronRight size={20} color="#cbd5e1" />
              </div>
            ))}
          </div>
        </div>

        {/* 6. Footer */}
        <div className="animate-slide-up-fade delay-300" style={{ marginTop: '48px', textAlign: 'center' }}>
          <button style={{
            background: 'transparent', border: 'none', color: '#ef4444', fontSize: '15px', fontWeight: 600, cursor: 'pointer', marginBottom: '16px'
          }}>
            Log out
          </button>
          <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
            Tribe App Version 1.2.4 (Build 402)
          </div>
        </div>

      </div>
    </div>
  );
}
