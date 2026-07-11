import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, MapPin, Phone, ShieldCheck, Info, UserCheck, Mic, Calendar } from 'lucide-react';

const METRIC_DEFINITIONS = {
  'Budget Friendly': 'Did the price match what was quoted, and was it fair for the work done?',
  'Efficiency': 'Did they complete the job in a reasonable time without unnecessary delays?',
  'Quality': 'Did the work hold up — no follow-up issues or shortcuts?',
  'On-time Reliability': 'Did they show up when they said they would?',
};

const metrics = [
  { label: 'Budget Friendly', value: 3.8 },
  { label: 'Efficiency', value: 4.6 },
  { label: 'Quality', value: 4.9 },
  { label: 'On-time Reliability', value: 4.7 },
];

const recommenders = [
  { 
    name: 'Mahendra', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', 
    relation: 'Your Contact', 
    review: 'Superb. My go-to for 4 years. He never overcharges and is always upfront about costs.',
    type: 'text',
    mutuals: 3
  },
  { 
    name: 'Megha', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', 
    relation: 'Your Contact', 
    review: 'Fixed the issue on same day.',
    type: 'audio',
    mutuals: 0
  },
  { 
    name: 'Ravi', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', 
    relation: 'Your Contact', 
    review: 'Fair prices, solid work. Showed up 10 mins early.',
    type: 'text',
    mutuals: 1
  },
];

export default function ProviderProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        
        {/* Header Section */}
        <div style={{
          background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
          padding: '64px 24px 32px', color: '#ffffff',
          borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
          boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
          position: 'relative', zIndex: 2
        }}>
          <button onClick={() => onNavigate('home')} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', color: '#ffffff', padding: 0,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
            backdropFilter: 'blur(4px)'
          }}>
            <ArrowLeft size={20} />
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Dr. Anand Sharma
                <ShieldCheck size={24} color="#10b981" />
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ color: '#e9d5ff', fontSize: '15px', fontWeight: 600 }}>Cardiologist</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>•</span>
                <span style={{ color: '#ffffff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <MapPin size={14} /> Banjara Hills, Hyd
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <a href="tel:+919876543210" style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '6px', 
                  color: '#ffffff', fontSize: '14px', fontWeight: 600, 
                  textDecoration: 'none', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '20px'
                }}>
                  <Phone size={14} /> +91 98765 43210
                </a>
                <button onClick={() => onNavigate('provider-passport')} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px', 
                  color: '#10b981', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: 'rgba(16, 185, 129, 0.15)', padding: '6px 12px', borderRadius: '20px'
                }}>
                  View Passport
                </button>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                 style={{ width: '72px', height: '72px', borderRadius: '16px', border: '2px solid rgba(255,255,255,0.2)', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          
          {/* Chain of Trust */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Chain of Trust</h3>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#7e22ce', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>You</div>
              <div style={{ height: '2px', flex: 1, background: '#e2e8f0' }} />
              <img src={recommenders[0].image} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <div style={{ height: '2px', flex: 1, background: '#e2e8f0' }} />
              <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', color: '#64748b', fontWeight: 500, padding: '0 4px' }}>
              <span></span>
              <span>Mahendra</span>
              <span>Anand</span>
            </div>
          </div>

          {/* Metric Bar Chart */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Tribe Consensus</h2>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Based on 12 reviews</div>
            </div>
            
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              {metrics.map(m => (
                <div key={m.label} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#334155' }}>{m.label}</span>
                      <button onClick={() => setActiveTooltip(activeTooltip === m.label ? null : m.label)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: '#94a3b8' }}>
                        <Info size={14} />
                      </button>
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{m.value.toFixed(1)}</span>
                  </div>
                  
                  {activeTooltip === m.label && (
                    <div className="animate-fade-in" style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', fontSize: '13px', color: '#475569', marginBottom: '12px', lineHeight: 1.5, borderLeft: '3px solid #7e22ce' }}>
                      {METRIC_DEFINITIONS[m.label as keyof typeof METRIC_DEFINITIONS]}
                    </div>
                  )}

                  <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(m.value / 5) * 100}%`, background: m.value > 4.5 ? '#10b981' : m.value > 3.5 ? '#f59e0b' : '#ef4444', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Recommendations</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recommenders.map(r => (
                <div key={r.name} style={{ background: '#ffffff', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={r.image} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{r.name}</div>
                        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{r.relation}</div>
                      </div>
                    </div>
                    {r.mutuals > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                        <UserCheck size={14} /> {r.mutuals} in Tribe
                      </div>
                    )}
                  </div>

                  {r.type === 'text' ? (
                    <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>"{r.review}"</p>
                  ) : (
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#7e22ce', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Mic size={20} />
                      </button>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {[1,2,3,4,3,2,1,2,3,4,5,4,3,2,1].map((h, i) => (
                          <div key={i} style={{ width: '3px', height: `${h * 4}px`, background: '#cbd5e1', borderRadius: '2px' }} />
                        ))}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>0:12</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#ffffff', padding: '16px 24px 32px',
        borderTop: '1px solid #f1f5f9', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
        display: 'flex', gap: '12px', zIndex: 10
      }}>
        <button style={{
          flex: 1, padding: '16px', background: '#0f172a', color: '#ffffff',
          border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          <Calendar size={18} /> Book Now
        </button>
        <button onClick={() => onNavigate('add-recommendation')} style={{
          flex: 1, padding: '16px', background: '#f8fafc', color: '#0f172a',
          border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer'
        }}>
          Rate Them
        </button>
      </div>

    </div>
  );
}
