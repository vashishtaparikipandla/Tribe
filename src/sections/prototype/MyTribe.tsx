import { useState } from 'react';
import { UserPlus, Settings, ShieldAlert, Users, Wrench, Stethoscope, GraduationCap, ChevronRight, ArrowLeft, Star, Calendar } from 'lucide-react';

const connections = [
  { id: 1, name: 'Mahendra', relation: 'Colleague', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 12 },
  { id: 2, name: 'Megha', relation: 'Neighbour', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 8 },
  { id: 3, name: 'Chunky', relation: 'Friend', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', count: 5 },
];

const groups = [
  { id: 'plumbers', name: 'Plumbers', icon: Wrench, members: 3, lastActivity: 'Mar 29, 2023 3:40 PM', faces: [connections[0].image, connections[1].image] },
  { id: 'doctors', name: 'Doctors', icon: Stethoscope, members: 2, lastActivity: 'Mar 29, 2023 2:15 PM', faces: [connections[2].image] },
  { id: 'tutors', name: 'Tutors', icon: GraduationCap, members: 5, lastActivity: 'Jun 16, 2022 6:11 PM', faces: [connections[0].image, connections[2].image, connections[1].image] },
];

const plumbers = [
  { id: 101, name: 'Raju Plumbing Works', category: 'Plumber', rating: 4.8, date: 'Mar 29, 2023', review: 'Fixed the leak in 45 mins flat. Showed up on time, quoted upfront.', image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
  { id: 102, name: 'A-1 Pipe Solutions', category: 'Plumber', rating: 4.2, date: 'Feb 12, 2023', review: 'Decent work, slightly expensive.', image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }
];

export default function MyTribeScreen() {
  const [tab, setTab] = useState<'contact' | 'group'>('contact');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<number | null>(null);

  const selectedGroup = groups.find(g => g.id === activeGroup);
  const selectedProvider = plumbers.find(p => p.id === activeProvider);

  // Group Details Sub-View
  if (activeGroup && !activeProvider) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }} className="animate-slide-up-fade">
        <div style={{
          background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
          padding: '64px 24px 24px', color: '#ffffff',
          position: 'relative', zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setActiveGroup(null)} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(4px)'
            }}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
                {selectedGroup?.name}
              </h1>
              <p style={{ color: '#e9d5ff', fontSize: '14px', margin: '2px 0 0', fontWeight: 500 }}>
                {selectedGroup?.members} Providers used by you
              </p>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {plumbers.map((p, i) => (
              <div key={p.id} className={`animate-slide-up-fade delay-${(i + 1) * 100}`} onClick={() => setActiveProvider(p.id)} style={{
                background: '#ffffff', padding: '20px', borderRadius: '16px',
                border: '1px solid #f1f5f9', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={p.image} style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} color="#f59e0b" fill="#f59e0b" /> {p.rating}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#cbd5e1" />
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', fontSize: '13px', color: '#475569' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Last Service: </span> {p.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Provider History Sub-View
  if (activeProvider && selectedProvider) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }} className="animate-slide-up-fade">
        <div style={{
          background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
          padding: '64px 24px 32px', color: '#ffffff',
          borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px',
          boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
          position: 'relative', zIndex: 2
        }}>
          <button onClick={() => setActiveProvider(null)} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(4px)', marginBottom: '24px'
          }}>
            <ArrowLeft size={20} />
          </button>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <img src={selectedProvider.image} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }} />
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.5px' }}>{selectedProvider.name}</h1>
              <div style={{ color: '#e9d5ff', fontSize: '14px', fontWeight: 500 }}>{selectedProvider.category}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Your Service History</h2>
          <div style={{
            background: '#ffffff', padding: '20px', borderRadius: '16px',
            border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', background: '#f5f3ff', padding: '6px 12px', borderRadius: '8px' }}>
                <Calendar size={16} />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{selectedProvider.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: 700 }}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" /> {selectedProvider.rating}
              </div>
            </div>
            <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              "{selectedProvider.review}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main MyTribe View
  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }}>
      {/* Header Band */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 32px',
        color: '#ffffff',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }} className="animate-slide-up-fade">
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              My Tribe
            </h1>
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px',
            width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(4px)'
          }}>
            <UserPlus size={24} />
          </button>
        </div>

        {/* Toggle Switch */}
        <div className="animate-slide-up-fade delay-100" style={{
          background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '24px',
          display: 'flex', position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: '4px', left: tab === 'contact' ? '4px' : 'calc(50% - 2px)',
            width: 'calc(50% - 2px)', height: 'calc(100% - 8px)',
            background: '#ffffff', borderRadius: '20px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
          <button onClick={() => setTab('contact')} style={{
            flex: 1, padding: '12px 0', border: 'none', background: 'transparent',
            color: tab === 'contact' ? '#4c1d95' : '#ffffff', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', position: 'relative', zIndex: 2, transition: 'color 0.3s'
          }}>
            Contact
          </button>
          <button onClick={() => setTab('group')} style={{
            flex: 1, padding: '12px 0', border: 'none', background: 'transparent',
            color: tab === 'group' ? '#4c1d95' : '#ffffff', fontSize: '15px', fontWeight: 600,
            cursor: 'pointer', position: 'relative', zIndex: 2, transition: 'color 0.3s'
          }}>
            Group
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {tab === 'contact' && (
          <div className="animate-fade-in">
            <div style={{
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

            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Most Active Providers
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {connections.map((c, i) => (
                <div key={c.id} className={`animate-slide-up-fade delay-${(i + 1) * 100}`} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: '#ffffff', padding: '16px 20px', borderRadius: '16px',
                  border: '1px solid #f1f5f9', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={c.image} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
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
        )}

        {tab === 'group' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {groups.map((g, i) => (
              <div key={g.id} className={`animate-slide-up-fade delay-${(i + 1) * 100}`} onClick={() => setActiveGroup(g.id)} style={{
                background: '#ffffff', padding: '20px', borderRadius: '16px',
                border: '1px solid #f1f5f9', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#faf5ff', padding: '10px', borderRadius: '12px' }}>
                      <g.icon size={24} color="#7e22ce" />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{g.name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Last activity: {g.lastActivity}</div>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#cbd5e1" />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex' }}>
                    {g.faces.map((face, j) => (
                      <img key={j} src={face} style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: '2px solid #ffffff', marginLeft: j > 0 ? '-12px' : 0,
                        position: 'relative', zIndex: g.faces.length - j
                      }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '14px', fontWeight: 600 }}>
                    <Users size={16} /> {g.members} Member{g.members !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
