import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, MapPin, DollarSign, Zap, Star, Clock, ShieldCheck, ExternalLink, Calendar, Languages } from 'lucide-react';

const metrics = [
  { label: 'Budget Friendly', value: 4.5, icon: DollarSign },
  { label: 'Efficiency', value: 4.6, icon: Zap },
  { label: 'Quality', value: 4.9, icon: Star },
  { label: 'On-time Reliability', value: 4.7, icon: Clock },
];

const recommenders = [
  { name: 'Mahendra', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact', review: 'Superb. My go-to for 4 years.' },
  { name: 'Megha', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact', review: 'Fixed the issue on same day.' },
  { name: 'Ravi', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact', review: 'Fair prices, solid work.' },
];

export default function ProviderProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'trust' | 'reviews' | 'details'>('trust');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', paddingBottom: '20px' }} className="animate-slide-up-fade">
      {/* Header Band (Dark Purple) */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 32px', // Space for status bar
        position: 'relative',
        color: '#ffffff',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        zIndex: 2,
      }}>
        {/* Back button */}
        <button onClick={() => onNavigate('home')} style={{
          background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px',
          color: '#ffffff', padding: 0,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px',
          backdropFilter: 'blur(4px)'
        }}>
          <ArrowLeft size={20} />
        </button>

        <div className="animate-slide-up-fade delay-100">
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Dr. Anand Sharma
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#e9d5ff', fontSize: '14px', fontWeight: 600 }}>Cardiologist</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
              <MapPin size={14} /> Banjara Hills, Hyd
            </span>
          </div>
        </div>

        {/* Score blocks */}
        <div style={{ display: 'flex', gap: '24px', marginTop: '32px' }} className="animate-slide-up-fade delay-200">
          <div>
            <div style={{ color: '#ffffff', fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>4.8</div>
            <div style={{ color: '#c084fc', fontSize: '11px', fontWeight: 700, marginTop: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>TRUST SCORE</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <div>
            <div style={{ color: '#ffffff', fontSize: '36px', fontWeight: 700, lineHeight: 1 }}>3</div>
            <div style={{ color: '#c084fc', fontSize: '11px', fontWeight: 700, marginTop: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>IN YOUR TRIBE</div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        background: '#f8fafc',
        display: 'flex',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 24px',
        marginTop: '8px'
      }} className="animate-slide-up-fade delay-200">
        {(['trust', 'reviews', 'details'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            marginRight: '24px', padding: '16px 0',
            background: 'none', border: 'none',
            borderBottom: activeTab === tab ? '2px solid #6b21a8' : '2px solid transparent',
            color: activeTab === tab ? '#6b21a8' : '#64748b',
            fontWeight: activeTab === tab ? 700 : 500,
            fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit',
            textTransform: 'capitalize', transition: 'all 0.2s',
          }}>{tab}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '24px' }}>
        {activeTab === 'trust' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-slide-up-fade delay-300">
            <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 8px', lineHeight: 1.5, fontWeight: 500 }}>
              <ShieldCheck size={18} color="#7e22ce" style={{ verticalAlign: 'text-bottom', marginRight: '6px' }} />
              Based on real experiences from your connections.
            </p>
            {metrics.map((m) => (
              <div key={m.label} style={{
                background: '#ffffff', borderRadius: '16px', padding: '16px',
                border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: '#faf5ff', padding: '6px', borderRadius: '8px' }}>
                      <m.icon size={18} color="#7e22ce" />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{m.label}</span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{m.value}</span>
                </div>
                <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(m.value / 5) * 100}%`, background: '#7e22ce', borderRadius: '6px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-slide-up-fade">
            {recommenders.map((r) => (
              <div key={r.name} style={{
                background: '#ffffff', borderRadius: '16px', padding: '20px',
                border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img 
                    src={r.image} 
                    alt={r.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>{r.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{r.relation}</div>
                  </div>
                </div>
                <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  "{r.review}"
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-slide-up-fade">
            {[
              { label: 'Hospital', value: 'Care Hospitals, Banjara Hills', icon: ExternalLink },
              { label: 'Experience', value: '18+ years', icon: Clock },
              { label: 'Consultation Fee', value: '₹800 – ₹1200', icon: DollarSign },
              { label: 'Availability', value: 'Mon–Sat, 10am–6pm', icon: Calendar },
              { label: 'Languages', value: 'Telugu, Hindi, English', icon: Languages },
            ].map((d) => (
              <div key={d.label} style={{
                background: '#ffffff', padding: '16px', borderRadius: '16px',
                border: '1px solid #f1f5f9', display: 'flex', gap: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                  <d.icon size={20} color="#64748b" style={{ flexShrink: 0 }} />
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{d.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
