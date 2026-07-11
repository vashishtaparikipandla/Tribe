import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Search as SearchIcon, Check, ShieldCheck, Bell, ChevronRight, Stethoscope, Users } from 'lucide-react';

const categories = [
  { label: 'Doctors', subtitle: '124 trusted nearby', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop' },
  { label: 'Plumbers', subtitle: '85 trusted nearby', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=400&auto=format&fit=crop' },
  { label: 'Electricians', subtitle: '42 trusted nearby', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop', sponsored: true },
  { label: 'Tutors', subtitle: '190 trusted nearby', image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop', sponsored: true },
  { label: 'Mechanics', subtitle: '63 trusted nearby', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=400&auto=format&fit=crop' },
];

const initialFeed = [
  {
    id: 1,
    provider: 'Dr. Anand Sharma',
    category: 'Cardiologist',
    categoryIcon: Stethoscope,
    score: 4.8,
    tags: ['Budget Friendly', 'No wait time'],
    review: '"Genuinely listens. Doesn\'t rush. Explained everything clearly — rare to find this in Hyderabad."',
    ago: '2h ago',
    saved: false,
    recommenders: [
      { name: 'Mahendra', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact' },
      { name: 'Megha', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact' },
      { name: 'Ravi', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact' },
    ]
  },
  {
    id: 2,
    type: 'recommendation',
    provider: { name: 'QuickFix Plumbing', category: 'Plumber', rating: 4.5, reviews: 8 },
    author: { name: 'Megha', relation: 'Your Contact' },
    content: 'Fixed my leaking sink in 30 mins. Charged a fair price. Very professional.',
    ago: '1d ago',
    saved: true,
    recommenders: [
      { name: 'Megha', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Your Contact' }
    ]
  },
];

export default function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [savedIds, setSavedIds] = useState<number[]>([2]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [feed, setFeed] = useState<any[]>([]);

  const toggle = (id: number) => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%' }}>
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 20px 32px',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="animate-slide-up-fade delay-100">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ color: '#e9d5ff', fontSize: '15px', margin: '0 0 4px', fontWeight: 500 }}>Good evening,</p>
              <h2 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.5px' }}>
                Vashishta.
              </h2>
            </div>
            <button style={{
              background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', cursor: 'pointer', position: 'relative'
            }}>
              <Bell size={20} />
              <div style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, background: '#ef4444', borderRadius: '50%', border: '2px solid #4c1d95' }} />
            </button>
          </div>
          
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex', alignItems: 'center', gap: '12px',
            cursor: 'text',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }} onClick={() => onNavigate('search')}>
            <SearchIcon size={20} color="#6b21a8" />
            <span style={{ color: '#94a3b8', fontSize: '16px', fontWeight: 500 }}>Search plumber, doctor...</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px 0' }} className="animate-slide-up-fade delay-150">
        <div style={{
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          borderRadius: '24px', padding: '24px',
          color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}>
            <div style={{ background: '#3b82f6', color: '#ffffff', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'inline-block', marginBottom: '8px' }}>
              SUMMER SPECIAL
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Get 20% off AC Servicing</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', fontWeight: 500 }}>Book highly rated experts now</p>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <button style={{ background: '#ffffff', color: '#0f172a', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <ChevronRight size={24} />
            </button>
          </div>
          <div style={{ position: 'absolute', top: -30, right: -20, width: 120, height: 120, background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />
        </div>
      </div>

      <div style={{ padding: '24px 0 12px' }} className="animate-slide-up-fade delay-200">
        <div style={{ display: 'flex', gap: '16px', padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '16px' }}>
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => setActiveCategory(cat.label === activeCategory ? null : cat.label)} style={{
              background: '#ffffff',
              border: activeCategory === cat.label ? '2px solid #7e22ce' : '1px solid #e2e8f0',
              borderRadius: '24px',
              minWidth: '160px',
              padding: 0, overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              transition: 'all 0.2s ease',
              boxShadow: activeCategory === cat.label ? '0 8px 20px rgba(126, 34, 206, 0.15)' : '0 4px 12px rgba(0,0,0,0.03)',
            }}>
              <div style={{ width: '100%', height: '100px', background: '#f1f5f9', position: 'relative' }}>
                <img src={cat.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {cat.sponsored && (
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#ffffff', padding: '4px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', backdropFilter: 'blur(4px)' }}>
                    Sponsored
                  </div>
                )}
              </div>
              <div style={{ padding: '16px', textAlign: 'left' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{cat.label}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{cat.subtitle}</div>
              </div>
            </button>
            ))}
          </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
            Discover from your Tribe
          </h3>
          <button onClick={() => onNavigate('consensus-request')} style={{ background: '#f8fafc', color: '#6b21a8', border: '1px solid #e9d5ff', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            Ask My Tribe
          </button>
        </div>

        {feed.length === 0 ? (
          <div className="animate-slide-up-fade delay-300" style={{
            background: '#ffffff', borderRadius: '24px', padding: '32px 24px',
            border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
          }}>
            <div style={{ width: '64px', height: '64px', background: '#faf5ff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Users size={32} color="#7e22ce" />
            </div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>Your Tribe is empty</h4>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px', lineHeight: 1.5 }}>
              Tribe works best when your friends are here. Invite contacts to see their trusted service recommendations.
            </p>
            <button 
              onClick={() => setFeed(initialFeed)}
              style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #6b21a8, #4c1d95)',
                color: '#ffffff', border: 'none', borderRadius: '32px',
                fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(76, 29, 149, 0.2)'
              }}
            >
              Invite your first contact
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {feed.map((item, i) => (
              <div key={item.id} className={`animate-slide-up-fade delay-${300 + (i * 100)}`}>
                <FeedCard item={item} saved={savedIds.includes(item.id)} onSave={() => toggle(item.id)} onTap={() => onNavigate('provider-profile')} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FeedCard({ item, saved, onSave, onTap }: { item: any; saved: boolean; onSave: () => void; onTap: () => void }) {
  const Icon = item.categoryIcon || Stethoscope;
  
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: '16px',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onClick={onTap}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; }}
    >
      {/* Provider Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: '#faf5ff', color: '#7e22ce',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={24} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.2px' }}>
              {typeof item.provider === 'string' ? item.provider : item.provider.name}
            </div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', fontWeight: 500 }}>
              {typeof item.provider === 'string' ? item.category : item.provider.category}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4c1d95', background: '#f5f3ff', padding: '6px 10px', borderRadius: '12px' }}>
          <ShieldCheck size={18} />
          <span style={{ fontSize: '16px', fontWeight: 700 }}>
            {item.score || (typeof item.provider !== 'string' ? item.provider.rating : '')}
          </span>
        </div>
      </div>

      {/* Recommenders Stack */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
        <div style={{ display: 'flex' }}>
          {item.recommenders && item.recommenders.map((rec: any, i: number) => (
            <img 
              key={i} 
              src={rec.image} 
              alt={rec.name}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                border: '2px solid #ffffff',
                marginLeft: i > 0 ? '-12px' : 0,
                position: 'relative', zIndex: item.recommenders.length - i
              }} 
            />
          ))}
        </div>
        <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
          Recommended by <strong style={{ color: '#0f172a' }}>{item.recommenders[0].name}</strong> 
          {item.recommenders.length > 1 && ` and ${item.recommenders.length - 1} others`}
        </div>
      </div>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {item.tags.map((tag: string) => (
            <span key={tag} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              background: '#f8fafc', color: '#334155',
              padding: '6px 12px', borderRadius: '8px',
              fontSize: '12px', fontWeight: 600,
            }}>
              <Check size={14} color="#7e22ce" /> {tag}
            </span>
          ))}
        </div>
      )}

      {/* Review Quote */}
      {item.review && (
        <p style={{
          fontSize: '15px', color: '#334155',
          lineHeight: 1.6, margin: 0,
          fontStyle: 'italic'
        }}>
          {item.review}
        </p>
      )}
      
      {item.content && (
        <p style={{
          fontSize: '15px', color: '#334155',
          lineHeight: 1.6, margin: 0,
          fontStyle: 'italic'
        }}>
          "{item.content}"
        </p>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            color: saved ? '#7e22ce' : '#64748b',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'color 0.2s'
          }}
        >
          {saved ? 'Saved to lists' : 'Save provider'}
        </button>
      </div>
    </div>
  );
}
