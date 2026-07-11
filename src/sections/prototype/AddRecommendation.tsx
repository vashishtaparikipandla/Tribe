import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, QrCode, Search, UserPlus, CheckCircle, Mic, Square, Type, Calendar, Contact, Smartphone } from 'lucide-react';

type AddView = 'entry' | 'scan' | 'search' | 'new' | 'rating' | 'insight' | 'success';

const MOCK_PROVIDERS = [
  { id: 101, name: 'Raju Plumbing Works', category: 'Plumber', locality: 'Madhapur' },
  { id: 201, name: 'Dr. Anand Sharma', category: 'Cardiologist', locality: 'Banjara Hills' },
  { id: 301, name: 'Elite Tutors', category: 'Tutor', locality: 'Jubilee Hills' },
];

export default function AddRecommendationScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<AddView>('entry');
  const [form, setForm] = useState({
    name: '', category: '', phone: '',
    serviceDate: '', costBand: '',
    ratings: { budget: 3, efficiency: 3, quality: 3, reliability: 3 },
    reviewType: 'text' as 'text' | 'voice',
    reviewText: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  // Scan Simulation
  useEffect(() => {
    if (view === 'scan') {
      const timer = setTimeout(() => {
        setForm(f => ({ ...f, name: 'Dr. Anand Sharma', category: 'Cardiologist', serviceDate: new Date().toISOString().split('T')[0] }));
        setView('rating');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Voice Recording Simulation
  useEffect(() => {
    let interval: any;
    if (isRecording && recordTime < 30) {
      interval = setInterval(() => setRecordTime(t => t + 1), 1000);
    } else if (recordTime >= 30) {
      setIsRecording(false);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordTime]);

  const handleSliderChange = (key: string, val: number) => {
    setForm(f => ({ ...f, ratings: { ...f.ratings, [key]: val } }));
  };

  const getStepTitle = () => {
    switch (view) {
      case 'scan': return 'Scanning...';
      case 'search': return 'Find Provider';
      case 'new': return 'New Provider';
      case 'rating': return 'Rate Experience';
      case 'insight': return 'Add Insight';
      default: return 'Recommend';
    }
  };

  const handleBack = () => {
    if (view === 'entry') onNavigate('home');
    else if (view === 'scan' || view === 'search' || view === 'new') setView('entry');
    else if (view === 'rating') setView('entry');
    else if (view === 'insight') setView('rating');
  };

  if (view === 'success') {
    return (
      <div className="animate-slide-up-fade" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', background: '#f8fafc' }}>
        <CheckCircle size={80} color="#10b981" style={{ marginBottom: '32px' }} />
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.5px' }}>Added to Tribe</h2>
        <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, margin: '0 0 40px', fontWeight: 500 }}>
          Your recommendation for <strong>{form.name}</strong> is live! This boosts your Trust Constellation connection score with anyone in your Tribe who sees it.
        </p>
        <button onClick={() => onNavigate('home')} style={{
          background: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '32px', padding: '16px 32px',
          fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }}>Back to Discover</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      {/* Header */}
      {view !== 'scan' && (
        <div style={{ padding: '64px 24px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={handleBack} style={{
            background: '#f8fafc', border: 'none', borderRadius: '50%', width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <ArrowLeft size={20} color="#0f172a" />
          </button>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{getStepTitle()}</div>
        </div>
      )}

      <div style={{ flex: 1, padding: view === 'scan' ? 0 : '24px' }}>
        
        {/* Entry View */}
        {view === 'entry' && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Who are you recommending?</h2>
            
            <button onClick={() => setView('scan')} style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#ffffff', borderRadius: '24px', padding: '24px',
              display: 'flex', alignItems: 'center', gap: '20px', border: 'none', cursor: 'pointer', boxShadow: '0 12px 24px rgba(15, 23, 42, 0.15)'
            }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '20px' }}>
                <QrCode size={32} color="#c084fc" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Scan or Tap-to-Vouch</div>
                <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>NFC/QR. Fastest way to review.</div>
              </div>
            </button>

            <button onClick={() => setView('search')} style={{
              background: '#ffffff', color: '#0f172a', borderRadius: '24px', padding: '20px',
              display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '20px' }}>
                <Search size={28} color="#64748b" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Rate Existing Provider</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Search the Tribe directory.</div>
              </div>
            </button>

            <button onClick={() => setView('new')} style={{
              background: '#ffffff', color: '#0f172a', borderRadius: '24px', padding: '20px',
              display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
            }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '20px' }}>
                <UserPlus size={28} color="#64748b" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Add Someone New</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Help a provider claim their profile.</div>
              </div>
            </button>
          </div>
        )}

        {/* Scan/NFC Simulation View */}
        {view === 'scan' && (
          <div className="animate-fade-in" style={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#ffffff' }}>
            <div style={{ width: '280px', height: '280px', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '32px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '40px', height: '40px', borderTop: '4px solid #c084fc', borderLeft: '4px solid #c084fc', borderTopLeftRadius: '32px' }} />
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '40px', height: '40px', borderTop: '4px solid #c084fc', borderRight: '4px solid #c084fc', borderTopRightRadius: '32px' }} />
              <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '40px', height: '40px', borderBottom: '4px solid #c084fc', borderLeft: '4px solid #c084fc', borderBottomLeftRadius: '32px' }} />
              <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '40px', height: '40px', borderBottom: '4px solid #c084fc', borderRight: '4px solid #c084fc', borderBottomRightRadius: '32px' }} />
              <div style={{ width: '100%', height: '4px', background: '#c084fc', position: 'absolute', top: '50%', boxShadow: '0 0 20px 2px #c084fc', animation: 'scan 2s infinite ease-in-out' }} />
              <style>{`@keyframes scan { 0% { top: 10%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { top: 90%; opacity: 0; } }`}</style>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
                <QrCode size={48} />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Scanning...</span>
              </div>
            </div>
            <p style={{ marginTop: '40px', fontSize: '16px', fontWeight: 500, color: '#94a3b8' }}>Point at QR or hold near provider's phone (NFC)</p>
          </div>
        )}

        {/* Search Existing Provider */}
        {view === 'search' && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
              <input type="text" placeholder="Name or business..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', margin: '0 -24px', padding: '0 24px 8px' }}>
              {['Plumber', 'Doctor', 'Tutor', 'Electrician'].map(cat => (
                <div key={cat} style={{ padding: '8px 16px', background: '#e2e8f0', borderRadius: '20px', fontSize: '14px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>{cat}</div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MOCK_PROVIDERS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                <div key={p.id} onClick={() => { setForm(f => ({ ...f, name: p.name, category: p.category, serviceDate: '' })); setView('rating'); }}
                  style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{p.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginTop: '4px' }}>{p.category} • {p.locality}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Onboard New Provider */}
        {view === 'new' && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>Enter their details. We'll send them an SMS to claim their Reputation Passport once you submit your rating.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', marginLeft: '4px' }}>Provider / Business Name</label>
                <div style={{ position: 'relative' }}>
                  <Contact size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                  <input type="text" placeholder="e.g. Ramesh Plumbing" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', marginLeft: '4px' }}>Category</label>
                <input type="text" placeholder="e.g. Plumber" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', marginLeft: '4px' }}>Phone Number (for SMS invite)</label>
                <div style={{ position: 'relative' }}>
                  <Smartphone size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                  <input type="tel" placeholder="+91" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <button onClick={() => setView('rating')} disabled={!form.name || !form.category} style={{
              marginTop: '16px', width: '100%', padding: '16px', background: (!form.name || !form.category) ? '#cbd5e1' : '#0f172a', color: '#ffffff',
              border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s'
            }}>Continue to Rating</button>
          </div>
        )}

        {/* Rating Form */}
        {view === 'rating' && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{form.name}</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, marginTop: '4px' }}>{form.category}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Date & Cost */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Date of Service</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
                    <input type="date" value={form.serviceDate} onChange={e => setForm(f => ({ ...f, serviceDate: e.target.value }))}
                      style={{ width: '100%', padding: '15px 16px 15px 44px', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '15px', color: '#0f172a', fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>Cost Band (Optional)</label>
                  <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '16px', padding: '4px' }}>
                    {['₹', '₹₹', '₹₹₹'].map(band => (
                      <button key={band} onClick={() => setForm(f => ({ ...f, costBand: band }))} style={{
                        flex: 1, padding: '12px 0', border: 'none', borderRadius: '12px',
                        background: form.costBand === band ? '#ffffff' : 'transparent',
                        color: form.costBand === band ? '#10b981' : '#64748b',
                        fontSize: '15px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: form.costBand === band ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                      }}>{band}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 24px' }}>Rate Metrics</h3>
                <style>{`
                  input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; }
                  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 50%; background: #ffffff; border: 3px solid #7e22ce; cursor: pointer; margin-top: -10px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
                  input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 6px; cursor: pointer; background: #e2e8f0; border-radius: 3px; }
                `}</style>
                {[
                  { key: 'budget', label: 'Budget Friendly' },
                  { key: 'efficiency', label: 'Efficiency' },
                  { key: 'quality', label: 'Quality' },
                  { key: 'reliability', label: 'On-time Reliability' }
                ].map(metric => (
                  <div key={metric.key} style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>{metric.label}</span>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#7e22ce' }}>{(form.ratings as any)[metric.key]} / 5</span>
                    </div>
                    <input type="range" min="1" max="5" step="1" value={(form.ratings as any)[metric.key]} onChange={e => handleSliderChange(metric.key, parseInt(e.target.value))} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                      <span>Poor</span><span>Neutral</span><span>Excellent</span>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setView('insight')} disabled={!form.serviceDate} style={{
                width: '100%', padding: '16px', background: !form.serviceDate ? '#cbd5e1' : '#0f172a', color: '#ffffff',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s'
              }}>Add Review (Optional)</button>
            </div>
          </div>
        )}

        {/* Insight Form (Text or Voice) */}
        {view === 'insight' && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
            
            <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '16px', padding: '4px' }}>
              <button onClick={() => setForm(f => ({ ...f, reviewType: 'text' }))} style={{
                flex: 1, padding: '12px 0', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: form.reviewType === 'text' ? '#ffffff' : 'transparent', color: form.reviewType === 'text' ? '#0f172a' : '#64748b',
                fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: form.reviewType === 'text' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}><Type size={18} /> Text Review</button>
              
              <button onClick={() => setForm(f => ({ ...f, reviewType: 'voice' }))} style={{
                flex: 1, padding: '12px 0', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: form.reviewType === 'voice' ? '#ffffff' : 'transparent', color: form.reviewType === 'voice' ? '#7e22ce' : '#64748b',
                fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: form.reviewType === 'voice' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}><Mic size={18} /> Voice Note</button>
            </div>

            {form.reviewType === 'text' ? (
              <div style={{ position: 'relative' }}>
                <textarea
                  value={form.reviewText} onChange={(e) => { if(e.target.value.length <= 280) setForm(f => ({ ...f, reviewText: e.target.value })) }}
                  placeholder="Why are you recommending them? Be specific so your Tribe knows what to expect."
                  rows={8}
                  style={{
                    width: '100%', padding: '20px', borderRadius: '24px', border: '1px solid #e2e8f0', fontSize: '16px', fontFamily: 'inherit',
                    color: '#0f172a', outline: 'none', boxSizing: 'border-box', resize: 'none', lineHeight: 1.6, background: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', fontSize: '13px', fontWeight: 600, color: form.reviewText.length >= 280 ? '#ef4444' : '#94a3b8' }}>
                  {form.reviewText.length} / 280
                </div>
              </div>
            ) : (
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px 20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: isRecording ? '#ef4444' : '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                  00:{recordTime.toString().padStart(2, '0')} <span style={{ fontSize: '16px', color: '#94a3b8' }}>/ 00:30</span>
                </div>
                
                {isRecording && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '40px' }}>
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div key={i} style={{ width: '4px', background: '#7e22ce', borderRadius: '2px', animation: `pulse ${0.5 + (i%3)*0.2}s infinite alternate` }} />
                    ))}
                    <style>{`@keyframes pulse { 0% { height: 8px; } 100% { height: 40px; } }`}</style>
                  </div>
                )}

                <button onClick={() => { if(recordTime >= 30) return; setIsRecording(!isRecording); }} style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: isRecording ? '#fee2e2' : '#7e22ce',
                  border: isRecording ? '4px solid #ef4444' : '4px solid #f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                  {isRecording ? <Square size={32} color="#ef4444" fill="#ef4444" /> : <Mic size={36} color="#ffffff" />}
                </button>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
                  {isRecording ? 'Tap to stop' : recordTime > 0 ? 'Tap to re-record' : 'Tap to start recording'}
                </div>
              </div>
            )}

            <div style={{ marginTop: 'auto' }}>
              <button onClick={() => setView('success')} style={{
                width: '100%', padding: '16px', background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', color: '#ffffff',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(107, 33, 168, 0.25)'
              }}>Submit Recommendation</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
