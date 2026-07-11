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

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      onDone();
    }
  };

  const slide = slides[currentSlide];

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
