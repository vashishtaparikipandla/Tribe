import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Phone, User, MapPin } from 'lucide-react';

export default function AuthScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [profile, setProfile] = useState({ name: '', city: '' });
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = (nextStep: 'phone' | 'otp' | 'profile' | 'done') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (nextStep === 'done') {
        onNavigate('onboarding');
      } else {
        setStep(nextStep);
      }
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div style={{ height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      
      {/* Decorative Header */}
      <div style={{
        height: '35%',
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Abstract shapes */}
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, rgba(255,255,255,0) 70%)',
          top: '-20px', right: '-20px', borderRadius: '50%'
        }} />
        <h1 className="animate-slide-up-fade" style={{ color: '#ffffff', fontSize: '40px', fontWeight: 800, letterSpacing: '-1px' }}>
          Tribe
        </h1>
      </div>

      {/* Forms Area */}
      <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
        
        {step === 'phone' && (
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
              Welcome back
            </h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px', fontWeight: 500 }}>
              Enter your phone number to continue or create a new account.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <Phone size={20} color="#64748b" />
              <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '16px', borderRight: '1px solid #cbd5e1', paddingRight: '12px' }}>
                +91
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

            <button 
              onClick={() => simulateLoading('otp')}
              disabled={phone.length < 10 || isLoading}
              style={{
                marginTop: 'auto', width: '100%', padding: '18px',
                background: phone.length >= 10 ? 'linear-gradient(135deg, #6b21a8, #4c1d95)' : '#e2e8f0',
                color: phone.length >= 10 ? '#ffffff' : '#94a3b8',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: phone.length >= 10 ? 'pointer' : 'not-allowed',
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
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px', fontWeight: 500 }}>
              We've sent a code to +91 {phone}
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <MapPin size={20} color="#64748b" />
                <input 
                  value={profile.city}
                  onChange={e => setProfile({...profile, city: e.target.value})}
                  placeholder="City / Area"
                  style={{
                    border: 'none', background: 'transparent', outline: 'none',
                    fontSize: '16px', fontWeight: 600, color: '#0f172a', width: '100%', fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <button 
              onClick={() => simulateLoading('done')}
              disabled={!profile.name || !profile.city || isLoading}
              style={{
                marginTop: 'auto', width: '100%', padding: '18px',
                background: profile.name && profile.city ? 'linear-gradient(135deg, #6b21a8, #4c1d95)' : '#e2e8f0',
                color: profile.name && profile.city ? '#ffffff' : '#94a3b8',
                border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700,
                cursor: profile.name && profile.city ? 'pointer' : 'not-allowed',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
            >
              {isLoading ? <span className="animate-pulse">Saving...</span> : 'Complete Setup'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
