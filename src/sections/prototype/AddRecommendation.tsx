import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, QrCode, Search, DollarSign, Zap, Star, Clock, CheckCircle } from 'lucide-react';

const steps = ['Method', 'Ratings', 'Review'];

const ratingMetrics = [
  { key: 'budget', label: 'Budget Friendly', icon: DollarSign },
  { key: 'efficiency', label: 'Efficiency', icon: Zap },
  { key: 'quality', label: 'Quality', icon: Star },
  { key: 'reliability', label: 'On-time Reliability', icon: Clock },
];

export default function AddRecommendationScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', category: '', area: '', review: '', ratings: {} as Record<string, number> });
  const [submitted, setSubmitted] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Mock scan effect
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setForm(f => ({ ...f, name: 'Dr. Anand Sharma', category: 'Cardiologist', area: 'Banjara Hills' }));
        setIsScanning(false);
        setStep(1); // Jump to ratings
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  if (submitted) {
    return (
      <div className="animate-slide-up-fade" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', background: '#ffffff' }}>
        <CheckCircle size={80} color="#7e22ce" style={{ marginBottom: '32px' }} />
        <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.5px' }}>Added to Tribe</h2>
        <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, margin: '0 0 40px', fontWeight: 500 }}>
          Your recommendation for <strong>{form.name || 'the provider'}</strong> has been shared. It will now appear to your connections when they search.
        </p>
        <button onClick={() => onNavigate('home')} style={{
          background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', color: '#ffffff',
          border: 'none', borderRadius: '32px', padding: '16px 32px',
          fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 8px 16px rgba(76, 29, 149, 0.25)'
        }}>Back to Discover</button>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#ffffff' }}>
        <div style={{ width: '240px', height: '240px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '32px', height: '32px', borderTop: '4px solid #c084fc', borderLeft: '4px solid #c084fc', borderTopLeftRadius: '24px' }} />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '32px', height: '32px', borderTop: '4px solid #c084fc', borderRight: '4px solid #c084fc', borderTopRightRadius: '24px' }} />
          <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '32px', height: '32px', borderBottom: '4px solid #c084fc', borderLeft: '4px solid #c084fc', borderBottomLeftRadius: '24px' }} />
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '32px', height: '32px', borderBottom: '4px solid #c084fc', borderRight: '4px solid #c084fc', borderBottomRightRadius: '24px' }} />
          <div style={{ width: '100%', height: '3px', background: '#c084fc', position: 'absolute', top: '50%', boxShadow: '0 0 16px #c084fc', animation: 'scan 2s infinite ease-in-out' }} />
          <style>{`@keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>
        </div>
        <p style={{ marginTop: '32px', fontSize: '15px', fontWeight: 500, color: '#e9d5ff' }}>Scanning provider QR code...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ padding: '64px 24px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => step > 0 ? setStep(s => s - 1) : onNavigate('home')} style={{
          background: '#f8fafc', border: 'none', borderRadius: '50%',
          width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0
        }}>
          <ArrowLeft size={20} color="#0f172a" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Recommend</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px 24px' }}>
        {/* Step 1: Method */}
        {step === 0 && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                Who are you recommending?
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <button 
                onClick={() => setIsScanning(true)}
                style={{
                  background: 'linear-gradient(135deg, #4c1d95, #3b0764)', color: '#ffffff',
                  borderRadius: '24px', padding: '32px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                  border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(76, 29, 149, 0.2)'
                }}
              >
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '20px' }}>
                  <QrCode size={48} color="#c084fc" />
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>Scan Provider QR</div>
                <div style={{ fontSize: '14px', color: '#e9d5ff', fontWeight: 500 }}>Fastest way to review. The provider can show you their code.</div>
              </button>

              <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '14px', margin: '4px 0', fontWeight: 600, textTransform: 'uppercase' }}>or</div>

              <button 
                onClick={() => setStep(1)}
                style={{
                  background: '#ffffff', color: '#0f172a',
                  borderRadius: '24px', padding: '24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                  border: '1px solid #e2e8f0', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '20px' }}>
                  <Search size={32} color="#64748b" />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700 }}>Search Manually</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Ratings */}
        {step === 1 && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                Rate your experience
              </h2>
              {form.name && (
                <div style={{ fontSize: '15px', color: '#475569', marginTop: '8px', fontWeight: 500 }}>
                  Rating <strong style={{ color: '#0f172a' }}>{form.name}</strong> ({form.category})
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ratingMetrics.map((m) => {
                const val = form.ratings[m.key] || 0;
                return (
                  <div key={m.key} style={{
                    background: '#ffffff', borderRadius: '16px', padding: '20px',
                    border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '10px' }}>
                          <m.icon size={20} color="#64748b" />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '15px', color: '#0f172a' }}>{m.label}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => setForm(f => ({ ...f, ratings: { ...f.ratings, [m.key]: n } }))} style={{
                          flex: 1, height: '48px', borderRadius: '12px', border: 'none',
                          background: n <= val ? '#7e22ce' : '#f1f5f9',
                          cursor: 'pointer', transition: 'all 0.15s',
                          fontSize: '15px', fontWeight: 700, color: n <= val ? '#ffffff' : '#64748b',
                        }}>{n}</button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 2 && (
          <div className="animate-slide-up-fade" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
                Add your insight
              </h2>
            </div>

            <textarea
              value={form.review} onChange={(e) => setForm(f => ({ ...f, review: e.target.value }))}
              placeholder="Why are you recommending them? Be specific so your Tribe knows what to expect."
              rows={8}
              style={{
                width: '100%', padding: '20px', borderRadius: '20px',
                border: '1px solid #e2e8f0', fontSize: '16px', fontFamily: 'inherit',
                color: '#0f172a', outline: 'none', boxSizing: 'border-box',
                resize: 'none', lineHeight: 1.6, background: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
            />
          </div>
        )}
      </div>

      {/* CTA */}
      {step > 0 && (
        <div style={{ padding: '24px', background: '#ffffff', borderTop: '1px solid #f1f5f9' }} className="animate-fade-in">
          <button
            onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : setSubmitted(true)}
            style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', color: '#ffffff',
              border: 'none', borderRadius: '32px',
              fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 8px 16px rgba(76, 29, 149, 0.25)'
            }}
          >
            {step < steps.length - 1 ? 'Continue' : 'Share with Tribe'}
          </button>
        </div>
      )}
    </div>
  );
}
