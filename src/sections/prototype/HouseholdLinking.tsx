import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, UsersRound, Link, Unlink, UserPlus, Phone, Check } from 'lucide-react';

export default function HouseholdLinkingScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [inviteSent, setInviteSent] = useState(false);
  const [linked, setLinked] = useState(true); // Simulate already linked state for demo
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Toggles
  const [shareSaved, setShareSaved] = useState(true);
  const [shareRecs, setShareRecs] = useState(true);

  const handleInvite = () => {
    if (phoneNumber.length > 5) {
      setInviteSent(true);
      setTimeout(() => {
        setLinked(true);
        setInviteSent(false);
        setPhoneNumber('');
      }, 2000); // Simulate acceptance
    }
  };

  const handleUnlink = () => {
    if (confirm("Are you sure you want to unlink? This immediately stops all sharing between your accounts.")) {
      setLinked(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Header */}
      <div style={{
        background: '#ffffff',
        padding: '64px 24px 16px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: '16px',
        position: 'relative', zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={24} color="#0f172a" />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Household Linking</h1>
      </div>

      <div style={{ padding: '24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ background: '#f0fdf4', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <UsersRound size={32} color="#16a34a" />
          </div>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
            Link your account with a partner or family member to optionally share your saved providers and recommendations without merging your profiles.
          </p>
        </div>

        {linked ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Linked Status Card */}
            <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Priya Sharma</div>
                    <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Link size={12} /> Linked Household
                    </div>
                  </div>
                </div>
                <button onClick={handleUnlink} style={{ background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Unlink size={14} /> Unlink
                </button>
              </div>
            </div>

            {/* Sharing Permissions */}
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Sharing Permissions</h3>
              <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ flex: 1, paddingRight: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Share my saved providers</div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>Priya will be able to see your private bookmarks.</div>
                  </div>
                  <Toggle active={shareSaved} onChange={() => setShareSaved(!shareSaved)} />
                </div>

                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Share my recommendations feed</div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>Priya will see activity from your extended network.</div>
                  </div>
                  <Toggle active={shareRecs} onChange={() => setShareRecs(!shareRecs)} />
                </div>

              </div>
            </div>
            
          </div>
        ) : (
          <div className="animate-fade-in" style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Link a Household Member</h3>
            
            <div style={{
              display: 'flex', alignItems: 'center', padding: '12px 16px', background: '#f8fafc',
              border: '1px solid #cbd5e1', borderRadius: '12px', marginBottom: '16px'
            }}>
              <Phone size={18} color="#94a3b8" style={{ marginRight: '12px' }} />
              <input 
                type="tel"
                placeholder="Enter mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', color: '#0f172a' }}
              />
            </div>

            <button onClick={handleInvite} disabled={phoneNumber.length < 6 || inviteSent} style={{
              width: '100%', background: inviteSent ? '#f0fdf4' : '#16a34a', color: inviteSent ? '#16a34a' : '#ffffff',
              border: 'none', borderRadius: '12px', padding: '16px', fontSize: '15px', fontWeight: 700,
              cursor: phoneNumber.length < 6 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.2s'
            }}>
              {inviteSent ? <><Check size={18} /> Invite Sent</> : <><UserPlus size={18} /> Send Request</>}
            </button>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '12px 0 0', textAlign: 'center' }}>
              We will send an in-app request. They must accept before accounts are linked.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

// Simple internal toggle component
function Toggle({ active, onChange }: { active: boolean, onChange: () => void }) {
  return (
    <button onClick={onChange} style={{
      width: '44px', height: '24px', borderRadius: '12px',
      background: active ? '#7e22ce' : '#cbd5e1', border: 'none',
      position: 'relative', cursor: 'pointer', padding: 0, transition: 'background 0.2s'
    }}>
      <div style={{
        width: '20px', height: '20px', background: '#ffffff', borderRadius: '50%',
        position: 'absolute', top: '2px', left: active ? '22px' : '2px',
        transition: 'left 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </button>
  );
}
