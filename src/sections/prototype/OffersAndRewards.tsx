import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Gift, Award, Star, TrendingUp, ChevronRight, Zap } from 'lucide-react';

const offers = [
  { id: 1, title: 'Summer AC Servicing', discount: '15% Off', category: 'AC Repair', color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
  { id: 2, title: 'Deep Home Cleaning', discount: 'Flat ₹500 Off', category: 'Cleaners', color: 'linear-gradient(135deg, #10b981, #047857)' },
  { id: 3, title: 'Pest Control', discount: '10% Off', category: 'Pest Control', color: 'linear-gradient(135deg, #f59e0b, #b45309)' },
];

const rewards = [
  { id: 1, action: 'Recommended Dr. Sharma', points: '+10', date: 'Today' },
  { id: 2, action: 'Megha joined your Tribe', points: '+50', date: '2 days ago' },
  { id: 3, action: 'Review marked helpful', points: '+5', date: '1 week ago' },
];

const badges = [
  { id: 'trusted', icon: Star, title: 'Trusted Voice', desc: '10+ recommendations', earned: true },
  { id: 'connector', icon: Users, title: 'Connector', desc: '5+ successful invites', earned: true },
  { id: 'responder', icon: Zap, title: 'First Responder', desc: 'Answered 3 requests', earned: false },
];

// Duplicate Users icon here since I forgot to import it above
import { Users } from 'lucide-react';

export default function OffersAndRewardsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'offers'|'rewards'>('offers');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%' }} className="animate-slide-up-fade">
      
      {/* Header */}
      <div style={{ background: '#ffffff', padding: '64px 24px 16px', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => onNavigate('home')} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.5px' }}>
            Offers & Rewards
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
          <button 
            onClick={() => setActiveTab('offers')}
            style={{ flex: 1, background: activeTab === 'offers' ? '#ffffff' : 'transparent', color: activeTab === 'offers' ? '#0f172a' : '#64748b', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeTab === 'offers' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
          >
            Sponsored Offers
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            style={{ flex: 1, background: activeTab === 'rewards' ? '#ffffff' : 'transparent', color: activeTab === 'rewards' ? '#0f172a' : '#64748b', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeTab === 'rewards' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}
          >
            My Rewards
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        
        {activeTab === 'offers' && (
          <div className="animate-fade-in">
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5 }}>
              Exclusive discounts from highly rated providers in your area. Sponsored by verified partners.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {offers.map(offer => (
                <div key={offer.id} onClick={() => onNavigate('category-directory')} style={{
                  background: offer.color, borderRadius: '20px', padding: '24px', color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)', cursor: 'pointer', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
                      SPONSORED
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px', lineHeight: 1.2 }}>{offer.title}</h3>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>{offer.discount}</div>
                    
                    <button style={{ background: '#ffffff', color: '#0f172a', border: 'none', padding: '8px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      View Providers <ChevronRight size={14} />
                    </button>
                  </div>
                  <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }}>
                    <Gift size={120} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="animate-fade-in">
            {/* Points Summary */}
            <div style={{ background: 'linear-gradient(135deg, #7e22ce, #4c1d95)', borderRadius: '24px', padding: '32px 24px', color: '#ffffff', textAlign: 'center', marginBottom: '32px', boxShadow: '0 8px 24px rgba(76, 29, 149, 0.2)' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#e9d5ff', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Trust Points</div>
              <div style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 16px', lineHeight: 1, letterSpacing: '-1px' }}>120</div>
              <p style={{ margin: 0, fontSize: '14px', color: '#e9d5ff', lineHeight: 1.5, padding: '0 20px' }}>
                Earn points by leaving honest reviews and growing the tribe.
              </p>
            </div>

            {/* Milestones */}
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Milestone Badges</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              {badges.map(badge => {
                const Icon = badge.icon;
                return (
                  <div key={badge.id} style={{ 
                    background: '#ffffff', borderRadius: '16px', padding: '16px', 
                    border: badge.earned ? '2px solid #10b981' : '1px dashed #cbd5e1',
                    opacity: badge.earned ? 1 : 0.6,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                  }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: badge.earned ? '#dcfce7' : '#f1f5f9', color: badge.earned ? '#10b981' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <Icon size={24} />
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{badge.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{badge.desc}</div>
                  </div>
                )
              })}
            </div>

            {/* Recent History */}
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Recent Points</h3>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '8px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
              {rewards.map((r, i) => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: i < rewards.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>{r.action}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>{r.date}</div>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981' }}>
                    {r.points}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
