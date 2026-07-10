import React from 'react';
import type { Screen } from '@/components/PrototypePage';
import { UserPlus, Settings, ShieldAlert } from 'lucide-react';

const connections = [
  { id: 1, name: 'Mahendra', relation: 'Colleague', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 12 },
  { id: 2, name: 'Megha', relation: 'Neighbour', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 8 },
  { id: 3, name: 'Chunky', relation: 'Friend', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 5 },
  { id: 4, name: 'Ravi', relation: 'Family', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 21 },
  { id: 5, name: 'Priya', relation: 'Friend', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 3 },
];

export default function MyTribeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#ffffff', minHeight: '100%', paddingBottom: '32px' }}>
      {/* Header Band */}
      <div style={{
        background: '#003c33', // Cohere Deep Green
        padding: '24px',
        color: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 400, margin: '0 0 4px', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
              My Tribe
            </h1>
            <p style={{ color: '#edfce9', fontSize: '14px', margin: 0, fontWeight: 500 }}>
              142 Connections Synced
            </p>
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', cursor: 'pointer'
          }}>
            <UserPlus size={20} />
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Sync Status */}
        <div style={{
          background: '#f8fafc', padding: '16px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', gap: '12px',
          border: '1px solid #e5e7eb', marginBottom: '24px'
        }}>
          <ShieldAlert size={24} color="#1863dc" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#17171c' }}>Contacts Synced Securely</div>
            <div style={{ fontSize: '12px', color: '#616161' }}>We never spam your contacts.</div>
          </div>
          <Settings size={16} color="#93939f" style={{ cursor: 'pointer' }} />
        </div>

        <div style={{ fontSize: '12px', fontWeight: 600, color: '#93939f', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Most Active Providers
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {connections.map((c) => (
            <div key={c.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#ffffff', padding: '16px', borderRadius: '12px',
              border: '1px solid #e5e7eb', cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={c.image} 
                  alt={c.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#17171c' }}>{c.name}</div>
                  <div style={{ fontSize: '13px', color: '#616161', marginTop: '2px' }}>{c.relation}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#17171c' }}>{c.count}</div>
                <div style={{ fontSize: '11px', color: '#93939f', textTransform: 'uppercase' }}>Recs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
