import { useState } from 'react';
import { Target, Search, Users, Phone } from 'lucide-react';

const slides = [
  {
    id: 1,
    icon: Target,
    tag: 'REAL TALK',
    headline: "We're drowning\nin choices.",
    subhead: 'But when it comes to finding a plumber, doctor, or mechanic you can trust, you still ask your friends.',
  },
  {
    id: 2,
    icon: Search,
    tag: 'THE PROBLEM',
    headline: "Reviews are\nbroken.",
    subhead: 'Strangers on the internet have different standards than you. Fake reviews are everywhere. Trust is gone.',
  },
  {
    id: 3,
    icon: Users,
    tag: 'THE SOLUTION',
    headline: "Your Tribe\nknows best.",
    subhead: 'See recommendations only from people in your phone contacts. No strangers. No noise. Just trust.',
  },
  {
    id: 4,
    icon: Phone,
    tag: 'GET STARTED',
    headline: "Join the\nnetwork.",
    subhead: "Connect your contacts to see who your friends actually hire when things go wrong.",
  }
];

export default function OnboardingFlow({ onDone }: { onDone: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
    } else if (!showPersonalization) {
      // Simulate verifying phone and showing personalization instead of finishing
      setShowPersonalization(true);
    } else {
      onDone();
    }
  };

  const slide = slides[currentSlide];

  if (showPersonalization) {
    return (
      <div style={{ height: '100%', background: '#ffffff', display: 'flex', flexDirection: 'column', padding: '32px' }} className="animate-fade-in">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{ position: 'relative', width: '120px', height: '80px' }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #ffffff', position: 'absolute', left: 0, zIndex: 3 }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #ffffff', position: 'absolute', left: '30px', zIndex: 2 }} />
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #ffffff', position: 'absolute', left: '60px', zIndex: 1, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 700 }}>
                +1
              </div>
            </div>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', textAlign: 'center', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
            You're already in<br/>good company.
          </h1>
          
          <p style={{ fontSize: '18px', color: '#475569', textAlign: 'center', margin: '0 0 32px', lineHeight: 1.5, fontWeight: 500 }}>
            <strong style={{ color: '#0f172a' }}>Priya, Arjun</strong> and 1 other already have you in their contacts on Tribe.
          </p>

          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: '0 0 12px' }}>Why connect contacts?</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>See which providers Priya and Arjun trust.</li>
              <li>Your contacts stay private on your device.</li>
              <li>We never message anyone on your behalf.</li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
          <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} style={{ width: '20px', height: '20px', accentColor: '#7e22ce', marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            I agree to the <span style={{ color: '#7e22ce', fontWeight: 600, cursor: 'pointer' }}>Terms & Conditions</span> and <span style={{ color: '#7e22ce', fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span>. Account creation requires accepting these terms.
          </p>
        </div>

        <button disabled={!accepted} onClick={next} style={{
          width: '100%', padding: '18px', background: accepted ? 'linear-gradient(135deg, #6b21a8, #4c1d95)' : '#cbd5e1', color: '#ffffff',
          border: 'none', borderRadius: '32px', fontSize: '16px', fontWeight: 700, cursor: accepted ? 'pointer' : 'not-allowed',
          boxShadow: accepted ? '0 8px 16px rgba(107, 33, 168, 0.25)' : 'none', transition: 'transform 0.1s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          <Users size={20} /> Sync contacts to see their providers
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
    }}>
      {/* Visual Header Area (Dark Purple Gradient) */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
      }}>
        {/* Abstract shapes */}
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, rgba(255,255,255,0) 70%)',
          top: '-50px', right: '-50px', borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(255,255,255,0) 70%)',
          bottom: '-100px', left: '-100px', borderRadius: '50%'
        }} />

        <div key={currentSlide} className="animate-slide-up-fade" style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '32px', borderRadius: '32px',
          backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <slide.icon size={72} color="#ffffff" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        background: '#ffffff',
        padding: '40px 32px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minHeight: '45%', // Ensure enough space for content
      }}>
        <div key={`text-${currentSlide}`} className="animate-slide-up-fade delay-100">
          <div style={{
            fontSize: '12px', fontWeight: 800, color: '#7e22ce',
            letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            {slide.tag}
          </div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#0f172a',
            margin: '0 0 16px',
            whiteSpace: 'pre-line',
            letterSpacing: '-1px',
          }}>
            {slide.headline}
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            lineHeight: 1.6,
            margin: 0,
            fontWeight: 500
          }}>
            {slide.subhead}
          </p>
        </div>

        {/* Indicators and Button */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {slides.map((s, i) => (
              <div key={s.id} style={{
                height: '6px',
                width: i === currentSlide ? '32px' : '8px',
                background: i === currentSlide ? '#7e22ce' : '#e2e8f0',
                borderRadius: '6px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            ))}
          </div>

          <button onClick={next} style={{
            background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', color: '#ffffff',
            padding: '18px 32px', borderRadius: '32px',
            border: 'none', fontSize: '16px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%',
            boxShadow: '0 8px 16px rgba(76, 29, 149, 0.25)',
            transition: 'transform 0.1s'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {currentSlide === slides.length - 1 ? 'Connect Contacts' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
