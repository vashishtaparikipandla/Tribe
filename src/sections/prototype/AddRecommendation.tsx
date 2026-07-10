import React, { useState, useEffect } from 'react';
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
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center', background: '#ffffff' }}>
        <CheckCircle size={64} color="#003c33" style={{ marginBottom: '24px' }} />
        <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#17171c', margin: '0 0 16px', letterSpacing: '-0.3px', fontFamily: "'Space Grotesk', sans-serif" }}>Added to Tribe</h2>
        <p style={{ color: '#616161', fontSize: '16px', lineHeight: 1.5, margin: '0 0 32px' }}>
          Your recommendation for <strong>{form.name || 'the provider'}</strong> has been shared. It will now appear to your connections when they search.
        </p>
        <button onClick={() => onNavigate('home')} style={{
          background: '#17171c', color: '#ffffff',
          border: 'none', borderRadius: '32px', padding: '12px 24px',
          fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        }}>Back to Discover</button>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#17171c', color: '#ffffff' }}>
        <div style={{ width: '200px', height: '200px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '16px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '0', left: '0', width: '20px', height: '20px', borderTop: '4px solid #ffffff', borderLeft: '4px solid #ffffff' }} />
          <div style={{ position: 'absolute', top: '0', right: '0', width: '20px', height: '20px', borderTop: '4px solid #ffffff', borderRight: '4px solid #ffffff' }} />
          <div style={{ position: 'absolute', bottom: '0', left: '0', width: '20px', height: '20px', borderBottom: '4px solid #ffffff', borderLeft: '4px solid #ffffff' }} />
          <div style={{ position: 'absolute', bottom: '0', right: '0', width: '20px', height: '20px', borderBottom: '4px solid #ffffff', borderRight: '4px solid #ffffff' }} />
          <div style={{ width: '100%', height: '2px', background: '#1863dc', position: 'absolute', top: '50%', boxShadow: '0 0 8px #1863dc', animation: 'scan 2s infinite' }} />
        </div>
        <p style={{ marginTop: '24px', fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif" }}>Scanning provider QR code...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => step > 0 ? setStep(s => s - 1) : onNavigate('home')} style={{
          background: 'transparent', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0
        }}>
          <ArrowLeft size={24} color="#17171c" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#17171c' }}>Recommend</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '32px 24px' }}>
        {/* Step 1: Method */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#17171c', margin: '0 0 8px', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Who are you recommending?
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => setIsScanning(true)}
                style={{
                  background: '#003c33', color: '#ffffff',
                  borderRadius: '16px', padding: '24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  border: 'none', cursor: 'pointer'
                }}
              >
                <QrCode size={48} />
                <div style={{ fontSize: '18px', fontWeight: 600 }}>Scan Provider QR</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Fastest way to review. The provider can show you their code.</div>
              </button>

              <div style={{ textAlign: 'center', color: '#93939f', fontSize: '14px', margin: '8px 0' }}>or</div>

              <button 
                onClick={() => setStep(1)}
                style={{
                  background: '#ffffff', color: '#17171c',
                  borderRadius: '16px', padding: '24px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  border: '1px solid #e5e7eb', cursor: 'pointer'
                }}
              >
                <Search size={32} color="#17171c" />
                <div style={{ fontSize: '18px', fontWeight: 600 }}>Search Manually</div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Ratings */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#17171c', margin: '0 0 8px', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Rate your experience
              </h2>
              {form.name && (
                <div style={{ fontSize: '14px', color: '#616161', marginTop: '8px' }}>
                  Rating <strong>{form.name}</strong> ({form.category})
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ratingMetrics.map((m) => {
                const val = form.ratings[m.key] || 0;
                return (
                  <div key={m.key} style={{
                    background: '#ffffff', borderRadius: '12px', padding: '16px',
                    border: '1px solid #e5e7eb',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <m.icon size={20} color="#17171c" />
                        <span style={{ fontWeight: 500, fontSize: '14px', color: '#17171c' }}>{m.label}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => setForm(f => ({ ...f, ratings: { ...f.ratings, [m.key]: n } }))} style={{
                          flex: 1, height: '40px', borderRadius: '8px', border: '1px solid',
                          borderColor: n <= val ? '#17171c' : '#e5e7eb',
                          background: n <= val ? '#17171c' : '#ffffff',
                          cursor: 'pointer', transition: 'all 0.15s',
                          fontSize: '14px', fontWeight: 600, color: n <= val ? '#ffffff' : '#616161',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#17171c', margin: '0 0 8px', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
                Add your insight
              </h2>
            </div>

            <textarea
              value={form.review} onChange={(e) => setForm(f => ({ ...f, review: e.target.value }))}
              placeholder="Why are you recommending them? Be specific so your Tribe knows what to expect."
              rows={6}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px',
                border: '1px solid #e5e7eb', fontSize: '16px', fontFamily: 'inherit',
                color: '#17171c', outline: 'none', boxSizing: 'border-box',
                resize: 'none', lineHeight: 1.5, background: '#ffffff',
              }}
            />
          </div>
        )}
      </div>

      {/* CTA */}
      {step > 0 && (
        <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : setSubmitted(true)}
            style={{
              width: '100%', padding: '12px 24px',
              background: '#17171c', color: '#ffffff',
              border: 'none', borderRadius: '32px',
              fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {step < steps.length - 1 ? 'Continue' : 'Share with Tribe'}
          </button>
        </div>
      )}
    </div>
  );
}
