import React, { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, MapPin, DollarSign, Zap, Star, Clock, ShieldCheck, ExternalLink, Calendar, Languages } from 'lucide-react';

const metrics = [
  { label: 'Budget Friendly', value: 4.5, icon: DollarSign, color: '#17171c' },
  { label: 'Efficiency', value: 4.6, icon: Zap, color: '#17171c' },
  { label: 'Quality', value: 4.9, icon: Star, color: '#17171c' },
  { label: 'On-time Reliability', value: 4.7, icon: Clock, color: '#17171c' },
];

const recommenders = [
  { name: 'Mahendra', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Colleague', review: 'Superb. My go-to for 4 years.' },
  { name: 'Megha', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Neighbour', review: 'Fixed the issue on same day.' },
  { name: 'Ravi', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Family', review: 'Fair prices, solid work.' },
];

export default function ProviderProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'trust' | 'reviews' | 'details'>('trust');

  return (
    <div style={{ background: '#ffffff', minHeight: '100%', paddingBottom: '20px' }}>
      {/* Header Band */}
      <div style={{
        background: '#003c33', // Cohere Deep Green
        padding: '24px',
        position: 'relative',
        color: '#ffffff'
      }}>
        {/* Back button */}
        <button onClick={() => onNavigate('home')} style={{
          background: 'transparent', border: 'none',
          color: '#ffffff', padding: 0,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px',
          fontWeight: 500,
        }}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
            Dr. Anand Sharma
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#edfce9', fontSize: '14px', fontWeight: 500 }}>Cardiologist</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>•</span>
            <span style={{ color: '#ffffff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} /> Banjara Hills, Hyd
            </span>
          </div>
        </div>

        {/* Score blocks */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <div>
            <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>4.8</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, marginTop: '8px', letterSpacing: '0.5px' }}>TRUST SCORE</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <div>
            <div style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>3</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 600, marginTop: '8px', letterSpacing: '0.5px' }}>IN YOUR TRIBE</div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{
        background: '#ffffff',
        display: 'flex',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky', top: 0, zIndex: 5,
        padding: '0 24px'
      }}>
        {(['trust', 'reviews', 'details'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            marginRight: '24px', padding: '16px 0',
            background: 'none', border: 'none',
            borderBottom: activeTab === tab ? '2px solid #17171c' : '2px solid transparent',
            color: activeTab === tab ? '#17171c' : '#93939f',
            fontWeight: activeTab === tab ? 600 : 500,
            fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit',
            textTransform: 'capitalize', transition: 'all 0.2s',
          }}>{tab}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '24px' }}>
        {activeTab === 'trust' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: '#616161', margin: '0 0 8px', lineHeight: 1.5 }}>
              <ShieldCheck size={16} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} />
              Based on real experiences from your connections.
            </p>
            {metrics.map((m) => (
              <div key={m.label} style={{
                background: '#ffffff', borderRadius: '12px', padding: '16px',
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <m.icon size={20} color="#17171c" />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#17171c' }}>{m.label}</span>
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: m.color }}>{m.value}</span>
                </div>
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(m.value / 5) * 100}%`, background: '#17171c', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recommenders.map((r) => (
              <div key={r.name} style={{
                background: '#ffffff', borderRadius: '12px', padding: '16px',
                border: '1px solid #e5e7eb',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <img 
                    src={r.image} 
                    alt={r.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#17171c' }}>{r.name}</div>
                    <div style={{ fontSize: '12px', color: '#616161' }}>{r.relation}</div>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#212121', lineHeight: 1.5, margin: 0 }}>
                  "{r.review}"
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Hospital', value: 'Care Hospitals, Banjara Hills', icon: ExternalLink },
              { label: 'Experience', value: '18+ years', icon: Clock },
              { label: 'Consultation Fee', value: '₹800 – ₹1200', icon: DollarSign },
              { label: 'Availability', value: 'Mon–Sat, 10am–6pm', icon: Calendar },
              { label: 'Languages', value: 'Telugu, Hindi, English', icon: Languages },
            ].map((d) => (
              <div key={d.label} style={{
                background: '#ffffff', padding: '16px 0',
                borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '16px',
              }}>
                <d.icon size={20} color="#616161" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#93939f', fontWeight: 500, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{d.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#17171c' }}>{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
