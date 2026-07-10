import React, { useState } from 'react';
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
      {/* Visual Header Area */}
      <div style={{
        flex: 1,
        background: '#003c33', // Deep Green
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract shapes for editorial feel */}
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%',
          top: '-50px', right: '-50px'
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%',
          bottom: '-100px', left: '-100px'
        }} />

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '24px', borderRadius: '24px',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <slide.icon size={64} color="#ffffff" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        background: '#ffffff',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minHeight: '45%' // Ensure enough space for content
      }}>
        <div>
          <div style={{
            fontSize: '11px', fontWeight: 700, color: '#003c33',
            letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            {slide.tag}
          </div>
          
          <h1 style={{
            fontSize: '36px',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#17171c',
            margin: '0 0 16px',
            whiteSpace: 'pre-line',
            letterSpacing: '-1px',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            {slide.headline}
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: '#616161',
            lineHeight: 1.5,
            margin: 0
          }}>
            {slide.subhead}
          </p>
        </div>

        {/* Indicators and Button */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {slides.map((s, i) => (
              <div key={s.id} style={{
                height: '4px',
                width: i === currentSlide ? '24px' : '8px',
                background: i === currentSlide ? '#17171c' : '#e5e7eb',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>

          <button onClick={next} style={{
            background: '#17171c', color: '#ffffff',
            padding: '16px 32px', borderRadius: '32px',
            border: 'none', fontSize: '16px', fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%',
            transition: 'transform 0.1s'
          }}>
            {currentSlide === slides.length - 1 ? 'Connect Contacts' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
