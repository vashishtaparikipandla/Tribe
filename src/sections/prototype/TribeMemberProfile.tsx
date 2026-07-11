import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Users, ShieldCheck, MessageCircle, Star, Search, MapPin, Check } from 'lucide-react';

const mockContact = {
  id: 1,
  name: 'Priya Sharma',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  memberSince: 'Mar 2025',
  mutuals: 12,
  interactionScore: 95,
  sharedCategories: 3
};

const recommendations = [
  {
    id: 1,
    provider: { name: 'QuickFix Plumbing', category: 'Plumber', rating: 4.8 },
    review: 'Fixed my leaking sink in 30 mins. Charged a fair price. Very professional.',
    ago: '2 months ago',
    tags: ['Budget Friendly', 'On-time']
  },
  {
    id: 2,
    provider: { name: 'Dr. Anand Sharma', category: 'Cardiologist', rating: 4.9 },
    review: 'Genuinely listens. Doesn\'t rush. Explained everything clearly.',
    ago: '5 months ago',
    tags: ['Quality', 'Efficiency']
  }
];

export default function TribeMemberProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 32px', color: '#ffffff',
        borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
        position: 'relative', zIndex: 2
      }}>
        <button onClick={() => onNavigate('home')} style={{
          background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px', color: '#ffffff', padding: 0,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', marginBottom: '24px'
        }}>
          <ArrowLeft size={20} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src={mockContact.image} style={{ width: '88px', height: '88px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', marginBottom: '16px', objectFit: 'cover' }} />
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            {mockContact.name}
          </h1>
          <p style={{ color: '#e9d5ff', fontSize: '14px', margin: '0 0 16px', fontWeight: 500 }}>
            In your tribe since {mockContact.memberSince}
          </p>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
              <Users size={14} /> {mockContact.mutuals} mutuals
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
              <ShieldCheck size={14} /> High Trust
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        
        {/* Shared Context */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ background: '#16a34a', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={16} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 700, color: '#166534' }}>Shared Providers</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#15803d', lineHeight: 1.5 }}>
              You and {mockContact.name.split(' ')[0]} both use {mockContact.sharedCategories} of the same providers.
            </p>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Recommendations Given
        </h3>

        {recommendations.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '120px' }}>
            {recommendations.map(rec => (
              <div key={rec.id} style={{ background: '#ffffff', borderRadius: '20px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{rec.provider.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>{rec.provider.category}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f8fafc', padding: '4px 8px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#4c1d95' }}>
                    <Star size={14} fill="#4c1d95" /> {rec.provider.rating}
                  </div>
                </div>
                
                <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', margin: '0 0 12px' }}>
                  "{rec.review}"
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  {rec.tags.map(tag => (
                    <span key={tag} style={{ background: '#f8fafc', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={12} color="#7e22ce" /> {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{rec.ago}</span>
                  <button onClick={() => onNavigate('provider-profile')} style={{ background: 'transparent', border: 'none', color: '#7e22ce', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    View Provider
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
            <Search size={32} color="#94a3b8" style={{ marginBottom: '16px' }} />
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>No recommendations yet</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{mockContact.name.split(' ')[0]} hasn't shared any public recommendations with the tribe yet.</div>
          </div>
        )}

      </div>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#ffffff', padding: '16px 24px 32px',
        borderTop: '1px solid #f1f5f9', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
        zIndex: 10
      }}>
        <button onClick={() => onNavigate('consensus-request')} style={{
          width: '100%', padding: '16px', background: '#0f172a', color: '#ffffff',
          border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
        }}>
          <MessageCircle size={18} /> Ask {mockContact.name.split(' ')[0]} for a recommendation
        </button>
      </div>
    </div>
  );
}
