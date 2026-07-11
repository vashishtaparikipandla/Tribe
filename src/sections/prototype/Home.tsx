import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Search as SearchIcon, Check, Stethoscope, Wrench, Zap, GraduationCap, Car, ShieldCheck } from 'lucide-react';

const categories = [
  { label: 'Doctors', icon: Stethoscope },
  { label: 'Plumbers', icon: Wrench },
  { label: 'Electricians', icon: Zap },
  { label: 'Tutors', icon: GraduationCap },
  { label: 'Mechanics', icon: Car },
];

const feed = [
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
      { name: 'Mahendra', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Colleague' },
      { name: 'Megha', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Neighbour' },
      { name: 'Ravi', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Family' },
    ]
  },
  {
    id: 2,
    provider: 'Raju Plumbing Works',
    category: 'Plumber',
    categoryIcon: Wrench,
    score: 4.6,
    tags: ['On time', 'Fair pricing'],
    review: '"Fixed the leak in 45 mins flat. Showed up on time, quoted upfront. No drama whatsoever."',
    ago: '1d ago',
    saved: true,
    recommenders: [
      { name: 'Megha', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Neighbour' }
    ]
  },
  {
    id: 3,
    provider: 'Vikram\'s Auto',
    category: 'Mechanic',
    categoryIcon: Car,
    score: 4.9,
    tags: ['Transparent', 'Expert'],
    review: '"Trusted this guy with my car for 3 years. Never been overcharged, always explains the issue."',
    ago: '3d ago',
    saved: false,
    recommenders: [
      { name: 'Chunky', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Friend' },
      { name: 'Priya', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', relation: 'Friend' },
    ]
  },
];

export default function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [savedIds, setSavedIds] = useState<number[]>([2]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggle = (id: number) => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%' }}>
      {/* Welcome Banner (Dark Purple Gradient) */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 20px 32px', // 44px + 20px for status bar
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="animate-slide-up-fade delay-100">
          <p style={{ color: '#e9d5ff', fontSize: '15px', margin: '0 0 4px', fontWeight: 500 }}>Good evening,</p>
          <h2 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.5px' }}>
            Vashishta.
          </h2>
          
          {/* Search bar */}
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

      {/* Category Pills */}
      <div style={{ padding: '24px 0 12px' }} className="animate-slide-up-fade delay-200">
        <div style={{ display: 'flex', gap: '12px', padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '8px' }}>
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => setActiveCategory(cat.label === activeCategory ? null : cat.label)} style={{
              background: activeCategory === cat.label ? '#4c1d95' : '#ffffff',
              color: activeCategory === cat.label ? '#ffffff' : '#475569',
              border: '1px solid',
              borderColor: activeCategory === cat.label ? '#4c1d95' : '#e2e8f0',
              borderRadius: '32px',
              padding: '10px 16px', whiteSpace: 'nowrap',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: activeCategory === cat.label ? '0 4px 12px rgba(76, 29, 149, 0.2)' : '0 2px 4px rgba(0,0,0,0.02)',
            }}>
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="animate-slide-up-fade delay-300">
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', letterSpacing: '0.2px' }}>
            Recommended by your Tribe
          </span>
        </div>

        {feed.map((item, i) => (
          <div key={item.id} className={`animate-slide-up-fade delay-${(i + 3) * 100 > 500 ? 500 : (i + 3) * 100}`}>
            <FeedCard item={item} saved={savedIds.includes(item.id)} onSave={() => toggle(item.id)} onTap={() => onNavigate('provider-profile')} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeedCard({ item, saved, onSave, onTap }: { item: typeof feed[0]; saved: boolean; onSave: () => void; onTap: () => void }) {
  const Icon = item.categoryIcon;
  
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
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.2px' }}>{item.provider}</div>
            <div style={{ fontSize: '14px', color: '#64748b', marginTop: '2px', fontWeight: 500 }}>{item.category}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4c1d95', background: '#f5f3ff', padding: '6px 10px', borderRadius: '12px' }}>
          <ShieldCheck size={18} />
          <span style={{ fontSize: '16px', fontWeight: 700 }}>{item.score}</span>
        </div>
      </div>

      {/* Recommenders Stack */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
        <div style={{ display: 'flex' }}>
          {item.recommenders.map((rec, i) => (
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
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {item.tags.map((tag) => (
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

      {/* Review Quote */}
      <p style={{
        fontSize: '15px', color: '#334155',
        lineHeight: 1.6, margin: 0,
        fontStyle: 'italic'
      }}>
        {item.review}
      </p>

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
