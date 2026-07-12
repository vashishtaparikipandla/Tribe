import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, User } from 'lucide-react';

export default function MyConsensusRequestsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'open' | 'past'>('open');

  const openRequests = [
    {
      id: 1,
      category: 'Plumbers',
      context: 'Need recommendations for: leak',
      responses: 2,
      timeAgo: '2 hours ago',
      specificProvider: false
    },
    {
      id: 2,
      category: 'Cardiologist',
      context: 'About Dr. Anand Sharma',
      responses: 0,
      timeAgo: '1 day ago',
      specificProvider: true
    }
  ];

  const pastRequests = [
    {
      id: 3,
      category: 'Electricians',
      context: '',
      responses: 5,
      timeAgo: '2 weeks ago',
      specificProvider: false
    }
  ];

  const requests = activeTab === 'open' ? openRequests : pastRequests;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      <div style={{
        background: '#ffffff', padding: '64px 24px 16px', borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{
          background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
          display: 'flex', alignItems: 'center'
        }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Your Requests</h1>
      </div>

      <div style={{ display: 'flex', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <button
          onClick={() => setActiveTab('open')}
          style={{
            flex: 1, padding: '16px', background: 'none', border: 'none', fontSize: '15px', fontWeight: 600,
            color: activeTab === 'open' ? '#7e22ce' : '#64748b', cursor: 'pointer', position: 'relative'
          }}
        >
          Open ({openRequests.length})
          {activeTab === 'open' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', background: '#7e22ce', borderRadius: '3px 3px 0 0' }} />}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          style={{
            flex: 1, padding: '16px', background: 'none', border: 'none', fontSize: '15px', fontWeight: 600,
            color: activeTab === 'past' ? '#7e22ce' : '#64748b', cursor: 'pointer', position: 'relative'
          }}
        >
          Past
          {activeTab === 'past' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', background: '#7e22ce', borderRadius: '3px 3px 0 0' }} />}
        </button>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            No requests found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {requests.map(req => (
              <div key={req.id} style={{
                background: '#ffffff', borderRadius: '20px', padding: '20px', border: '1px solid #f1f5f9',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#faf5ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7e22ce' }}>
                      {req.specificProvider ? <User size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{req.category}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {req.timeAgo}
                      </div>
                    </div>
                  </div>
                  {req.responses > 0 ? (
                    <div style={{ background: '#7e22ce', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                      {req.responses} New
                    </div>
                  ) : (
                    <div style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                      Waiting
                    </div>
                  )}
                </div>
                {req.context && (
                  <div style={{ fontSize: '14px', color: '#475569', marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                    "{req.context}"
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px', color: '#6b21a8', fontSize: '14px', fontWeight: 600 }}>
                  <span>View responses</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>
            Requests with 0 responses are automatically closed after 7 days to keep your feed clean.
          </p>
        </div>
      </div>
    </div>
  );
}
