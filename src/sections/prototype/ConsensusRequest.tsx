import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Send, Activity, CheckCircle2, User, List } from 'lucide-react';

const categories = ['Plumbers', 'Doctors', 'Tutors', 'Mechanics', 'Electricians'];

export default function ConsensusRequestScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'compose' | 'sending' | 'results'>('compose');
  const [category, setCategory] = useState('Plumbers');
  const [context, setContext] = useState('');
  const [specificProvider, setSpecificProvider] = useState(false);
  const [providerName, setProviderName] = useState('');
  
  // Animation state for sending
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    // Check for pre-filled data
    const prefillQuery = sessionStorage.getItem('prefill_query');
    const prefillProvider = sessionStorage.getItem('prefill_provider_name');
    
    if (prefillQuery) {
      setContext(`Need recommendations for: ${prefillQuery}`);
      sessionStorage.removeItem('prefill_query');
    }
    
    if (prefillProvider) {
      setSpecificProvider(true);
      setProviderName(prefillProvider);
      sessionStorage.removeItem('prefill_provider_name');
    }
  }, []);

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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => onNavigate('home')} style={{
            background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
            display: 'flex', alignItems: 'center'
          }}>
            <ArrowLeft size={24} />
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Ask Your Tribe</h1>
        </div>
        <button onClick={() => onNavigate('my-consensus-requests')} style={{ background: 'none', border: 'none', color: '#7e22ce', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
          <List size={18} /> History
        </button>
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

            {/* Target Provider Toggle */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>About a specific provider?</span>
                <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                  <input type="checkbox" checked={specificProvider} onChange={e => setSpecificProvider(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: specificProvider ? '#7e22ce' : '#cbd5e1', borderRadius: '34px', transition: '.4s' }}>
                    <span style={{ position: 'absolute', height: '18px', width: '18px', left: specificProvider ? '22px' : '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }} />
                  </span>
                </label>
              </div>
              
              {specificProvider && (
                <div className="animate-fade-in" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40px', height: '40px', background: '#e9d5ff', color: '#7e22ce', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Target Provider</div>
                    <input 
                      value={providerName} 
                      onChange={e => setProviderName(e.target.value)}
                      placeholder="Provider Name"
                      style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontWeight: 700, color: '#0f172a', width: '100%', padding: 0 }}
                    />
                  </div>
                </div>
              )}
            </div>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Where do you need them?</label>
            <div style={{ marginBottom: '24px' }}>
              <select style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1',
                background: '#ffffff', fontSize: '15px', color: '#0f172a', fontWeight: 600, outline: 'none',
                appearance: 'none'
              }}>
                <option value="Hyderabad">Hyderabad (Primary)</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

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

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Any specific context? (Optional, max 140 chars)</label>
            <textarea
              value={context}
              onChange={e => setContext(e.target.value.substring(0, 140))}
              placeholder="e.g. Need someone available this weekend for a leaky pipe..."
              style={{
                width: '100%', height: '100px', padding: '16px', borderRadius: '16px',
                border: '1px solid #e2e8f0', background: '#ffffff', fontSize: '15px',
                fontFamily: 'inherit', color: '#0f172a', resize: 'none', boxSizing: 'border-box',
                marginBottom: '8px'
              }}
            />
            <div style={{ fontSize: '12px', color: context.length >= 140 ? '#ef4444' : '#94a3b8', textAlign: 'right', marginBottom: '32px' }}>
              {context.length} / 140
            </div>

            <button
              onClick={() => setStep('sending')}
              style={{
                width: '100%', padding: '18px', background: 'linear-gradient(135deg, #6b21a8, #4c1d95)',
                color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '16px',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 8px 24px rgba(76, 29, 149, 0.25)'
              }}
            >
              <Send size={20} /> {specificProvider ? 'Ask about ' + (providerName || 'provider') : 'Send to my tribe'}
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
              {specificProvider 
                ? `Sent to contacts who haven't rated ${providerName || 'them'} yet.`
                : `Sent to contacts with ${category} reviews.`}
            </p>
          </div>
        )}

        {step === 'results' && (
          <div className="animate-fade-in">
            <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <CheckCircle2 size={24} />
              <span style={{ fontSize: '15px', fontWeight: 600 }}>Request sent successfully!</span>
            </div>

            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>We'll notify you when they respond</h3>
              <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px' }}>You can track all your active requests and responses in your history.</p>
              <button onClick={() => onNavigate('my-consensus-requests')} style={{ padding: '16px 32px', background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
                View Requests
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
