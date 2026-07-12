import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { User, MapPin, Camera, ShieldCheck, Lock, ChevronDown } from 'lucide-react';

export type AuthStep = 'splash' | 'phone' | 'otp' | 'profile' | 'contact_permission' | 'hashing_contacts' | 'location_permission';

export default function AuthScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<AuthStep>('splash');
  const [phone, setPhone] = useState('');
  const [countryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [profile, setProfile] = useState({ name: '', city: '' });
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [hashingProgress, setHashingProgress] = useState(0);

  // Splash Screen
  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => setStep('phone'), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // OTP Countdown
  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  // Hashing Progress
  useEffect(() => {
    if (step === 'hashing_contacts') {
      const interval = setInterval(() => {
        setHashingProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('location_permission'), 500);
            return 100;
          }
          return p + Math.floor(Math.random() * 5) + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const simulateLoading = (nextStep: AuthStep | 'done') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (nextStep === 'done') {
        onNavigate('home');
      } else {
        setStep(nextStep as AuthStep);
        if (nextStep === 'otp') setCountdown(60);
      }
    }, 800);
  };

  if (step === 'splash') {
    return (
      <div style={{ height: '100%', background: 'linear-gradient(135deg, #4c1d95, #3b0764)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ width: '80px', height: '80px', background: '#ffffff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.3)' }}>
          <h1 style={{ color: '#4c1d95', fontSize: '48px', fontWeight: 900, margin: 0, lineHeight: 1 }}>T</h1>
        </div>
        <h1 className="animate-slide-up-fade" style={{ color: '#ffffff', fontSize: '36px', fontWeight: 800, letterSpacing: '-1px' }}>
          Tribe
        </h1>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      
      {/* Decorative Header */}
      {['phone', 'otp', 'profile'].includes(step) && (
        <div style={{
          height: '25%', background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
          borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, rgba(255,255,255,0) 70%)', top: '-20px', right: '-20px', borderRadius: '50%' }} />
          <h1 className="animate-fade-in" style={{ color: '#ffffff', fontSize: '32px', fontWeight: 800 }}>Tribe</h1>
        </div>
      )}

      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {step === 'phone' && (
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Welcome back
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px', fontWeight: 500 }}>
              Enter your phone number to continue or create a new account.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '8px 16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', paddingRight: '12px', borderRight: '1px solid #cbd5e1' }}>
                <span style={{ fontSize: '20px' }}>🇮🇳</span>
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '16px' }}>{countryCode}</span>
                <ChevronDown size={16} color="#64748b" />
              </div>
              <input 
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="00000 00000"
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '18px', fontWeight: 600, color: '#0f172a', width: '100%', fontFamily: 'inherit', letterSpacing: '1px'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: 'auto', marginBottom: '24px' }}>
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreed} 
                onChange={e => setAgreed(e.target.checked)} 
                style={{ width: '20px', height: '20px', accentColor: '#6b21a8', cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}
              />
              <label htmlFor="terms" style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, cursor: 'pointer' }}>
                I agree to the <span style={{ color: '#0f172a', fontWeight: 600 }}>Terms & Conditions</span> and <span style={{ color: '#0f172a', fontWeight: 600 }}>Privacy Policy</span>.
              </label>
            </div>

            <button 
              onClick={() => simulateLoading('otp')}
              disabled={phone.length < 10 || !agreed || isLoading}
              style={{
                width: '100%', padding: '18px',
                background: phone.length >= 10 && agreed ? 'linear-gradient(135deg, #6b21a8, #4c1d95)' : '#e2e8f0',
                color: phone.length >= 10 && agreed ? '#ffffff' : '#94a3b8',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: phone.length >= 10 && agreed ? 'pointer' : 'not-allowed',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
              }}
            >
              {isLoading ? <span className="animate-pulse">Sending OTP...</span> : 'Continue'}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Verify it's you
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px', fontWeight: 500, lineHeight: 1.5 }}>
              We've sent a code to {countryCode} {phone}.<br/>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>Auto-reading OTP via SMS...</span>
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
              {otp.map((digit, i) => (
                <input 
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  style={{
                    width: '45px', height: '56px',
                    border: `1.5px solid ${digit ? '#7e22ce' : '#e2e8f0'}`,
                    borderRadius: '12px', background: digit ? '#faf5ff' : '#f8fafc',
                    fontSize: '24px', fontWeight: 700, textAlign: 'center', color: '#0f172a',
                    outline: 'none', transition: 'all 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#7e22ce'}
                  onBlur={e => e.target.style.borderColor = digit ? '#7e22ce' : '#e2e8f0'}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
              {countdown > 0 ? (
                <span>Resend code in <span style={{ color: '#0f172a', fontWeight: 600 }}>00:{countdown.toString().padStart(2, '0')}</span></span>
              ) : (
                <button onClick={() => setCountdown(60)} style={{ background: 'none', border: 'none', color: '#6b21a8', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
                  Resend OTP
                </button>
              )}
            </div>

            <button 
              onClick={() => simulateLoading('profile')}
              disabled={otp.join('').length < 6 || isLoading}
              style={{
                marginTop: 'auto', width: '100%', padding: '18px',
                background: otp.join('').length === 6 ? 'linear-gradient(135deg, #6b21a8, #4c1d95)' : '#e2e8f0',
                color: otp.join('').length === 6 ? '#ffffff' : '#94a3b8',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: otp.join('').length === 6 ? 'pointer' : 'not-allowed',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              {isLoading ? <span className="animate-pulse">Verifying...</span> : 'Verify Code'}
            </button>
          </div>
        )}

        {step === 'profile' && (
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Almost there
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px', fontWeight: 500 }}>
              Let's set up your profile so your Tribe knows who you are.
            </p>

            {/* Avatar Upload UI */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <button style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: '#f1f5f9', border: '2px dashed #cbd5e1',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748b', transition: 'all 0.2s'
              }}>
                <Camera size={28} style={{ marginBottom: '4px' }} />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Add Photo</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <User size={20} color="#64748b" />
                <input 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  placeholder="Full Name"
                  style={{
                    border: 'none', background: 'transparent', outline: 'none',
                    fontSize: '16px', fontWeight: 600, color: '#0f172a', width: '100%', fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <button 
              onClick={() => simulateLoading('contact_permission')}
              disabled={!profile.name || isLoading}
              style={{
                marginTop: 'auto', width: '100%', padding: '18px',
                background: profile.name ? 'linear-gradient(135deg, #6b21a8, #4c1d95)' : '#e2e8f0',
                color: profile.name ? '#ffffff' : '#94a3b8',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: profile.name ? 'pointer' : 'not-allowed',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              {isLoading ? <span className="animate-pulse">Saving...</span> : 'Continue'}
            </button>
          </div>
        )}

        {step === 'contact_permission' && (
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '32px' }}>
            <div style={{ width: '80px', height: '80px', background: '#faf5ff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <ShieldCheck size={40} color="#7e22ce" />
            </div>
            
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
              Find your Tribe
            </h2>
            
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                <Lock size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Contacts synced securely</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>Numbers are hashed (SHA-256) before comparison. We never see your raw contact list.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ShieldCheck size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>No spam. Ever.</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>We never message your contacts without your explicit action.</div>
                </div>
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '15px', margin: '0 0 32px', fontWeight: 500, lineHeight: 1.5 }}>
              Tribe relies on your network to show you highly trusted recommendations from people you actually know.
            </p>

            <button 
              onClick={() => setStep('hashing_contacts')}
              style={{
                width: '100%', padding: '18px', marginBottom: '16px',
                background: 'linear-gradient(135deg, #6b21a8, #4c1d95)',
                color: '#ffffff',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              Grant Access
            </button>
            <button 
              onClick={() => simulateLoading('location_permission')}
              style={{
                background: 'none', border: 'none', color: '#94a3b8', fontSize: '15px', fontWeight: 600, cursor: 'pointer', padding: '8px'
              }}
            >
              Skip for now
            </button>
          </div>
        )}

        {step === 'hashing_contacts' && (
          <div className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px' }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#7e22ce" strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * hashingProgress) / 100} style={{ transition: 'stroke-dashoffset 0.1s ease-out' }} />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
                {hashingProgress}%
              </div>
            </div>
            
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Securing Contacts
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0', fontWeight: 500, maxWidth: '280px' }}>
              Hashing numbers and securely matching you with your Tribe...
            </p>
          </div>
        )}

        {step === 'location_permission' && (
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '32px' }}>
            <div style={{ width: '80px', height: '80px', background: '#faf5ff', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <MapPin size={40} color="#7e22ce" />
            </div>
            
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px', letterSpacing: '-0.5px' }}>
              Find local pros
            </h2>
            
            <p style={{ color: '#475569', fontSize: '15px', margin: '0 0 32px', fontWeight: 500, lineHeight: 1.5 }}>
              Tribe needs your city-level location to show you relevant service providers in your radius.
            </p>

            <button 
              onClick={() => simulateLoading('done')}
              style={{
                marginTop: 'auto', width: '100%', padding: '18px', marginBottom: '16px',
                background: 'linear-gradient(135deg, #6b21a8, #4c1d95)',
                color: '#ffffff',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              {isLoading ? <span className="animate-pulse">Loading...</span> : 'Allow Location'}
            </button>
            <button 
              onClick={() => simulateLoading('done')}
              disabled={isLoading}
              style={{
                background: 'none', border: 'none', color: '#94a3b8', fontSize: '15px', fontWeight: 600, cursor: 'pointer', padding: '8px'
              }}
            >
              Skip for now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
