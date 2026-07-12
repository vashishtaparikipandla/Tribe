import { useState } from 'react';
import { UserPlus, ShieldAlert, Users, Wrench, Stethoscope, GraduationCap, ChevronRight, ChevronDown, ArrowLeft, Calendar, Settings, List, Orbit, MapPin, Info, MessageCircle, Phone } from 'lucide-react';
import { TribeLogo } from '@/components/TribeLogo';
import TribeMapView from './TribeMapView';
import ConstellationGraph from './ConstellationGraph';

const connections = [
  { id: 1, name: 'Mahendra', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 95, cx: 30, cy: 30 },
  { id: 2, name: 'Megha', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 80, cx: 70, cy: 20 },
  { id: 3, name: 'Chunky', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 60, cx: 50, cy: 80 },
  { id: 4, name: 'Priya', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 40, cx: 80, cy: 60 },
  { id: 5, name: 'Ravi', relation: 'Your Contact', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', interaction_score: 75, cx: 20, cy: 75 },
];

const groups = [
  { id: 'plumbers', name: 'Plumbers', icon: Wrench, members: 3, lastActivity: 'Mar 29, 2023', faces: [connections[0].image, connections[1].image] },
  { id: 'doctors', name: 'Doctors', icon: Stethoscope, members: 2, lastActivity: 'Feb 14, 2023', faces: [connections[2].image] },
  { id: 'tutors', name: 'Tutors', icon: GraduationCap, members: 5, lastActivity: 'Jun 16, 2022', faces: [connections[0].image, connections[2].image, connections[1].image] },
];

const mockProviders: Record<string, any[]> = {
  plumbers: [
    { 
      id: 101, name: 'Raju Plumbing Works', category: 'Plumber', composite_score: 9.4, 
      history: { date: 'Mar 29, 2023', costBand: '$$$', review: 'Fixed the leak in 45 mins flat. Showed up on time, quoted upfront.' },
      metrics: { budget: 85, efficiency: 95, quality: 90, reliability: 95 },
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      recommender_id: 1 
    },
    { 
      id: 102, name: 'A-1 Pipe Solutions', category: 'Plumber', composite_score: 7.2, 
      history: null,
      metrics: { budget: 60, efficiency: 80, quality: 75, reliability: 70 },
      image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      recommender_id: 2
    },
    { 
      id: 103, name: 'City Quick Fix', category: 'Plumber', composite_score: 8.8, 
      history: { date: 'Jan 10, 2023', costBand: '$', review: 'Very affordable, but arrived an hour late.' },
      metrics: { budget: 98, efficiency: 70, quality: 85, reliability: 60 },
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd37be?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      recommender_id: 5
    }
  ],
  doctors: [
    { 
      id: 201, name: 'Dr. Anand Sharma', category: 'Cardiologist', composite_score: 9.8, 
      history: { date: 'Feb 14, 2023', costBand: '$$', review: 'Excellent doctor. Highly recommended by my network.' },
      metrics: { budget: 70, efficiency: 90, quality: 98, reliability: 95 },
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      recommender_id: 3 
    }
  ],
  tutors: []
};

// Reusable Metric Bar Component
const MetricBar = ({ label, score }: { label: string, score: number }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', fontWeight: 600, marginBottom: '4px' }}>
      <span>{label}</span>
      <span>{score}%</span>
    </div>
    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ width: `${score}%`, height: '100%', background: score > 80 ? '#10b981' : score > 60 ? '#f59e0b' : '#ef4444', borderRadius: '3px' }} />
    </div>
  </div>
);

export default function MyTribeScreen({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'constellation' | 'map'>('list');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProvider, setExpandedProvider] = useState<number | null>(null);

  const selectedGroup = groups.find(g => g.id === activeGroup);
  const categoryProviders = activeGroup ? mockProviders[activeGroup] || [] : [];

  // Group Details Sub-View
  if (activeGroup && selectedGroup) {
    return (
      <div style={{ background: viewMode === 'constellation' ? '#020617' : '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column', transition: 'background 0.3s ease' }} className="animate-slide-up-fade">
        
        {/* Header */}
        <div style={{
          background: viewMode === 'constellation' ? 'transparent' : 'linear-gradient(135deg, #4c1d95, #3b0764)',
          padding: '64px 24px 24px', color: '#ffffff',
          position: 'relative', zIndex: 10,
          borderBottom: viewMode === 'constellation' ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
            <button onClick={() => { setActiveGroup(null); setViewMode('list'); }} style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', cursor: 'pointer', backdropFilter: 'blur(4px)', flexShrink: 0
            }}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
                {selectedGroup.name}
              </h1>
              <p style={{ color: viewMode === 'constellation' ? '#94a3b8' : '#e9d5ff', fontSize: '14px', margin: '2px 0 0', fontWeight: 500 }}>
                {categoryProviders.length} Providers in your network
              </p>
            </div>
          </div>
          
          {/* View Toggle */}
          <div style={{ display: 'flex', width: '100%', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '4px', backdropFilter: 'blur(8px)', marginBottom: '16px' }}>
            <button onClick={() => setViewMode('list')} style={{
              flex: 1, background: viewMode === 'list' ? '#ffffff' : 'transparent', color: viewMode === 'list' ? '#4c1d95' : '#ffffff',
              border: 'none', borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <List size={16} /> List
            </button>
            <button onClick={() => setViewMode('map')} style={{
              flex: 1, background: viewMode === 'map' ? '#ffffff' : 'transparent', color: viewMode === 'map' ? '#4c1d95' : '#ffffff',
              border: 'none', borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <MapPin size={16} /> Map
            </button>
            <button onClick={() => setViewMode('constellation')} style={{
              flex: 1, background: viewMode === 'constellation' ? '#ffffff' : 'transparent', color: viewMode === 'constellation' ? '#4c1d95' : '#ffffff',
              border: 'none', borderRadius: '8px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <Orbit size={16} /> Graph
            </button>
          </div>
          
          {/* Filter Chips - Persistent across views */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none', margin: '0 -24px', padding: '0 24px 4px 24px', WebkitOverflowScrolling: 'touch' }}>
            {['All', 'Trust 9+', '$$ Budget', 'Available This Week'].map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)} style={{
                background: activeFilter === filter ? '#ffffff' : 'rgba(255,255,255,0.1)',
                color: activeFilter === filter ? '#4c1d95' : '#ffffff',
                border: activeFilter === filter ? 'none' : '1px solid rgba(255,255,255,0.3)',
                borderRadius: '16px', padding: '6px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
              }}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categoryProviders.map((p, i) => {
                const isExpanded = expandedProvider === p.id;
                return (
                  <div key={p.id} className={`animate-slide-up-fade delay-${(i + 1) * 100}`} style={{
                    background: '#ffffff', borderRadius: '20px',
                    border: isExpanded ? '2px solid #7e22ce' : '1px solid #f1f5f9', 
                    overflow: 'hidden',
                    boxShadow: isExpanded ? '0 8px 24px rgba(126,34,206,0.1)' : '0 4px 12px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s ease'
                  }}>
                    {/* Collapsed Header */}
                    <div onClick={() => setExpandedProvider(isExpanded ? null : p.id)} style={{ padding: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                        <img src={p.image} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                          
                          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0' }}>
                            <MapPin size={12} /> 1.2 km away
                          </div>

                          <div style={{ display: 'flex', gap: '4px', height: '14px', alignItems: 'flex-end' }}>
                            <div style={{ width: '6px', height: `${p.metrics.budget}%`, background: p.metrics.budget > 80 ? '#10b981' : p.metrics.budget > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                            <div style={{ width: '6px', height: `${p.metrics.efficiency}%`, background: p.metrics.efficiency > 80 ? '#10b981' : p.metrics.efficiency > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                            <div style={{ width: '6px', height: `${p.metrics.quality}%`, background: p.metrics.quality > 80 ? '#10b981' : p.metrics.quality > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                            <div style={{ width: '6px', height: `${p.metrics.reliability}%`, background: p.metrics.reliability > 80 ? '#10b981' : p.metrics.reliability > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', marginLeft: '6px' }}>{p.composite_score}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <a href="tel:+1234567890" onClick={(e) => e.stopPropagation()} style={{
                          background: '#f0fdf4', color: '#16a34a', width: '36px', height: '36px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none'
                        }}>
                          <Phone size={16} fill="currentColor" />
                        </a>
                        {isExpanded ? <ChevronDown size={20} color="#cbd5e1" /> : <ChevronRight size={20} color="#cbd5e1" />}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="animate-fade-in" style={{ padding: '0 20px 20px', borderTop: '1px solid #f8fafc', paddingTop: '16px' }}>
                        {p.history ? (
                          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Calendar size={14} color="#6b21a8" /> Personal History
                              </span>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>{p.history.costBand}</span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>Last used: {p.history.date}</div>
                            <p style={{ fontSize: '14px', color: '#334155', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>"{p.history.review}"</p>
                          </div>
                        ) : (
                          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '8px', color: '#64748b', fontSize: '13px' }}>
                            <Info size={16} /> You haven't used this provider yet.
                          </div>
                        )}

                        <div>
                          <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tribe Consensus</h4>
                          <MetricBar label="Budget Friendly" score={p.metrics.budget} />
                          <MetricBar label="Efficiency" score={p.metrics.efficiency} />
                          <MetricBar label="Quality" score={p.metrics.quality} />
                          <MetricBar label="On-time Reliability" score={p.metrics.reliability} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {categoryProviders.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ color: '#64748b', fontSize: '15px', marginBottom: '16px' }}>
                    No providers found in this category from your Tribe.
                  </div>
                  <button onClick={() => onNavigate?.('consensus')} style={{
                    background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '12px', padding: '12px 24px',
                    fontSize: '15px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}>
                    <MessageCircle size={18} /> Ask my tribe
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : viewMode === 'map' ? (
          /* Map View */
          <div className="animate-fade-in" style={{ flex: 1 }}>
            <TribeMapView providers={categoryProviders} />
          </div>
        ) : (
          /* Constellation Physics View */
          <div className="animate-fade-in" style={{ flex: 1 }}>
            <ConstellationGraph 
              contacts={connections} 
              providers={categoryProviders} 
              onNodeClick={(id) => {
                // Future: navigate to provider profile
                console.log('Navigate to provider', id);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  // Main MyTribe View
  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '32px' }}>
      {/* Header Band */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 32px', color: '#ffffff',
        borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }} className="animate-slide-up-fade">
          <div>
            <div style={{ marginBottom: '12px' }}>
              <TribeLogo variant="mark" size="navIcon" background="dark" />
            </div>
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
      </div>

      <div style={{ padding: '24px' }}>
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{
            background: '#ffffff', padding: '16px 20px', borderRadius: '16px',
            display: 'flex', alignItems: 'center', gap: '16px',
            border: '1px solid #f1f5f9', marginBottom: '8px',
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

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '8px 0 0', letterSpacing: '-0.5px' }}>Your Trusted Categories</h3>

          {groups.map((g, i) => (
            <div key={g.id} className={`animate-slide-up-fade delay-${(i + 1) * 100}`} onClick={() => setActiveGroup(g.id)} style={{
                background: '#ffffff', padding: '20px', borderRadius: '16px',
                border: '1px solid #f1f5f9', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#faf5ff', padding: '10px', borderRadius: '12px' }}>
                      <g.icon size={24} color="#7e22ce" />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{g.name}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{g.members} Network Providers</div>
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
                    <Users size={16} /> Trusted by your Tribe
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
