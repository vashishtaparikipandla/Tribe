import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Bell, MessageCircle, Star, UsersRound, Calendar, ChevronDown } from 'lucide-react';

export default function NotificationPreferencesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [ambient, setAmbient] = useState(true);
  const [consensus, setConsensus] = useState(true);
  const [discoverFeed, setDiscoverFeed] = useState<'realtime' | 'daily' | 'off'>('daily');
  const [seasonal, setSeasonal] = useState(false);
  const [household, setHousehold] = useState(true);

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
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Notifications</h1>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Core Interactions */}
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Core Interactions</h2>
          <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: '16px', flex: 1, paddingRight: '16px' }}>
                <div style={{ background: '#faf5ff', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Star size={20} color="#7e22ce" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Ambient Review Prompts</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>"Was it them?" prompts when we detect a service visit.</div>
                </div>
              </div>
              <Toggle active={ambient} onChange={() => setAmbient(!ambient)} />
            </div>

            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', flex: 1, paddingRight: '16px' }}>
                <div style={{ background: '#faf5ff', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={20} color="#7e22ce" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Consensus Responses</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>When someone in your tribe answers your "Ask my tribe" request.</div>
                </div>
              </div>
              <Toggle active={consensus} onChange={() => setConsensus(!consensus)} />
            </div>

          </div>
        </div>

        {/* Feed & Updates */}
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Network Activity</h2>
          <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            
            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: '#f0fdf4', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bell size={20} color="#16a34a" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Discover Feed</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>Updates when people in your tribe rate new providers.</div>
                </div>
              </div>
              <div style={{ position: 'relative', marginLeft: '56px' }}>
                <select 
                  value={discoverFeed}
                  onChange={(e) => setDiscoverFeed(e.target.value as any)}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #cbd5e1',
                    background: '#f8fafc', fontSize: '14px', color: '#0f172a', fontWeight: 600, outline: 'none',
                    appearance: 'none', cursor: 'pointer'
                  }}
                >
                  <option value="realtime">Real-time (As it happens)</option>
                  <option value="daily">Daily Digest (Recommended)</option>
                  <option value="off">Off</option>
                </select>
                <ChevronDown size={20} color="#64748b" style={{ position: 'absolute', right: '16px', top: '12px', pointerEvents: 'none' }} />
              </div>
            </div>

            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', flex: 1, paddingRight: '16px' }}>
                <div style={{ background: '#f0fdf4', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <UsersRound size={20} color="#16a34a" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Household Activity</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>Updates from your linked household member.</div>
                </div>
              </div>
              <Toggle active={household} onChange={() => setHousehold(!household)} />
            </div>

          </div>
        </div>

        {/* Nudges */}
        <div>
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Nudges & Insights</h2>
          <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '16px', flex: 1, paddingRight: '16px' }}>
                <div style={{ background: '#fffbeb', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Calendar size={20} color="#d97706" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Seasonal & Milestone Nudges</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>E.g. "It's summer, time to check your AC" based on your tribe's booking trends.</div>
                </div>
              </div>
              <Toggle active={seasonal} onChange={() => setSeasonal(!seasonal)} />
            </div>

          </div>
        </div>

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
      position: 'relative', cursor: 'pointer', padding: 0, transition: 'background 0.2s',
      flexShrink: 0
    }}>
      <div style={{
        width: '20px', height: '20px', background: '#ffffff', borderRadius: '50%',
        position: 'absolute', top: '2px', left: active ? '22px' : '2px',
        transition: 'left 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </button>
  );
}
