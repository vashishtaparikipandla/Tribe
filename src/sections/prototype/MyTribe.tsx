

import { UserPlus, Settings, ShieldAlert } from 'lucide-react';

const connections = [
  { id: 1, name: 'Mahendra', relation: 'Colleague', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 12 },
  { id: 2, name: 'Megha', relation: 'Neighbour', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 8 },
  { id: 3, name: 'Chunky', relation: 'Friend', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 5 },
  { id: 4, name: 'Ravi', relation: 'Family', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 21 },
  { id: 5, name: 'Priya', relation: 'Friend', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 3 },
];

export default function MyTribeScreen() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }}>
      {/* Header Band */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 32px', // Accommodate status bar
        color: '#ffffff',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="animate-slide-up-fade">
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              My Tribe
            </h1>
            <p style={{ color: '#e9d5ff', fontSize: '15px', margin: 0, fontWeight: 500 }}>
              142 Connections Synced
            </p>
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px',
            width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(4px)'
          }}>
            <UserPlus size={24} />
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Sync Status */}
        <div className="animate-slide-up-fade delay-100" style={{
          background: '#ffffff', padding: '16px 20px', borderRadius: '16px',
          display: 'flex', alignItems: 'center', gap: '16px',
          border: '1px solid #f1f5f9', marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <div style={{ background: '#faf5ff', padding: '10px', borderRadius: '12px' }}>
            <ShieldAlert size={24} color="#7e22ce" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Contacts Synced Securely</div>
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>We never spam your contacts.</div>
          </div>
          <Settings size={20} color="#94a3b8" style={{ cursor: 'pointer' }} />
        </div>

        <div className="animate-slide-up-fade delay-200" style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Most Active Providers
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {connections.map((c, i) => (
            <div key={c.id} className={`animate-slide-up-fade delay-${(i + 3) * 100 > 500 ? 500 : (i + 3) * 100}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#ffffff', padding: '16px 20px', borderRadius: '16px',
              border: '1px solid #f1f5f9', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={c.image} 
                  alt={c.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{c.name}</div>
                  <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', fontWeight: 500 }}>{c.relation}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', background: '#f8fafc', padding: '8px 12px', borderRadius: '12px' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{c.count}</div>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Recs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
