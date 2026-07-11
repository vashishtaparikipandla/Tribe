import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Orbit, Users, Share, Target, TrendingUp } from 'lucide-react';
// Re-using the Constellation Graph for the mini preview
import ConstellationGraph from './ConstellationGraph';

const mockContacts = [
  { id: 1, name: 'Mahendra', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 95, cx: 30, cy: 30 },
  { id: 2, name: 'Megha', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 80, cx: 70, cy: 20 },
];

export default function TrustStatsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#0f172a', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Dark Header */}
      <div style={{
        padding: '64px 24px 16px',
        display: 'flex', alignItems: 'center', gap: '16px',
        position: 'relative', zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={24} color="#ffffff" />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#ffffff' }}>Trust Stats</h1>
      </div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Footprint Stats */}
        <div style={{ background: 'linear-gradient(135deg, #4c1d95, #3b0764)', borderRadius: '24px', padding: '24px', color: '#ffffff', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '12px' }}>
              <Target size={24} color="#a78bfa" />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Your Footprint</h2>
              <p style={{ fontSize: '13px', color: '#c4b5fd', margin: '2px 0 0' }}>How you help your network</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff' }}>4</div>
              <div style={{ fontSize: '14px', color: '#e9d5ff', lineHeight: 1.4 }}>
                people booked a provider after seeing your recommendation
              </div>
            </div>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff' }}>128</div>
              <div style={{ fontSize: '14px', color: '#e9d5ff', lineHeight: 1.4 }}>
                views on your provider ratings across your tribe
              </div>
            </div>
          </div>
        </div>

        {/* Constellation Preview */}
        <div style={{ background: '#1e293b', borderRadius: '24px', overflow: 'hidden', border: '1px solid #334155' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px' }}>Your Constellation</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Visualizing your active network</p>
            </div>
            <Orbit size={24} color="#60a5fa" />
          </div>
          
          <div style={{ height: '200px', position: 'relative', pointerEvents: 'none' }}>
            <ConstellationGraph contacts={mockContacts} providers={[]} onNodeClick={() => {}} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,41,59,0) 50%, rgba(30,41,59,1))' }} />
          </div>

          <div style={{ padding: '16px' }}>
            <button onClick={() => onNavigate('my-tribe')} style={{
              width: '100%', background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '16px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer'
            }}>
              Explore full constellation
            </button>
          </div>
        </div>

        {/* Contact Sync Status */}
        <div style={{ background: '#1e293b', borderRadius: '24px', padding: '20px', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Users size={18} color="#10b981" />
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>34 contacts synced</span>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Build your tribe faster</p>
          </div>
          <button style={{
            background: '#ffffff', color: '#0f172a', border: 'none', borderRadius: '16px',
            padding: '10px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <Share size={16} /> Invite
          </button>
        </div>

      </div>
    </div>
  );
}
