import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Send, Activity, CheckCircle2 } from 'lucide-react';

const categories = ['Plumbers', 'Doctors', 'Tutors', 'Mechanics', 'Electricians'];

export default function ConsensusRequestScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'compose' | 'sending' | 'results'>('compose');
  const [category, setCategory] = useState('Plumbers');
  const [context, setContext] = useState('');
  
  // Animation state for sending
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    if (step === 'sending') {
      const interval = setInterval(() => {
        setSentCount(prev => {
          if (prev >= 12) {
            clearInterval(interval);
            setTimeout(() => setStep('results'), 800);
            return 12;
          }
          return prev + 1;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Header */}
      <div style={{
        background: '#ffffff', padding: '64px 24px 16px', borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={() => onNavigate('home')} style={{
          background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
          display: 'flex', alignItems: 'center'
        }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Ask Your Tribe</h1>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        
        {step === 'compose' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Need a recommendation?
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 32px', lineHeight: 1.5 }}>
              Ask your direct contacts who have used a provider in this category. No spam, just targeted requests.
            </p>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>What do you need?</label>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '24px', scrollbarWidth: 'none' }}>
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: '12px 20px', borderRadius: '24px', whiteSpace: 'nowrap',
                  border: category === c ? '2px solid #6b21a8' : '1px solid #e2e8f0',
                  background: category === c ? '#faf5ff' : '#ffffff',
                  color: category === c ? '#6b21a8' : '#64748b',
                  fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {c}
                </button>
              ))}
            </div>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Any specific context? (Optional)</label>
            <textarea
              value={context}
              onChange={e => setContext(e.target.value)}
              placeholder="e.g. Need someone available this weekend for a leaky pipe..."
              style={{
                width: '100%', height: '120px', padding: '16px', borderRadius: '16px',
                border: '1px solid #e2e8f0', background: '#ffffff', fontSize: '15px',
                fontFamily: 'inherit', color: '#0f172a', resize: 'none', boxSizing: 'border-box',
                marginBottom: '48px'
              }}
            />

            <button
              onClick={() => setStep('sending')}
              style={{
                width: '100%', padding: '18px', background: 'linear-gradient(135deg, #6b21a8, #4c1d95)',
                color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '16px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(76, 29, 149, 0.25)'
              }}
            >
              <Send size={20} /> Request Consensus
            </button>
          </div>
        )}

        {step === 'sending' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
              <div style={{ position: 'absolute', inset: 0, background: '#e9d5ff', borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
              <div style={{ position: 'absolute', inset: 10, background: '#c084fc', borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '0.2s' }} />
              <div style={{ position: 'absolute', inset: 20, background: '#7e22ce', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', zIndex: 10 }}>
                <Activity size={40} />
              </div>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>Fanning out request...</h2>
            <p style={{ fontSize: '16px', color: '#64748b', margin: 0, fontWeight: 500 }}>
              Sent to <strong style={{ color: '#7e22ce' }}>{sentCount}</strong> contacts with {category} reviews.
            </p>
          </div>
        )}

        {step === 'results' && (
          <div className="animate-fade-in">
            <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <CheckCircle2 size={24} />
              <span style={{ fontSize: '15px', fontWeight: 600 }}>Request fulfilled! 4 friends responded.</span>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>Top Recommendations</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Result Card 1 */}
              <div style={{ background: '#ffffff', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, background: '#fef3c7', color: '#d97706', padding: '4px 12px', borderBottomLeftRadius: '16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                  #1 Choice
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>QuickFix Plumbing</div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Recommended by 3 friends</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#64748b' }}>+1</div>
                </div>

                <button onClick={() => onNavigate('provider-profile')} style={{ width: '100%', padding: '12px', background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  View Full Profile
                </button>
              </div>

              {/* Result Card 2 */}
              <div style={{ background: '#ffffff', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>City Pipes & Drains</div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Recommended by 1 friend</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                </div>

                <button style={{ width: '100%', padding: '12px', background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                  View Full Profile
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
