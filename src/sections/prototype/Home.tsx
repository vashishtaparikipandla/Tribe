import React, { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Search as SearchIcon, Check, Stethoscope, Wrench, Zap, GraduationCap, Car, HardHat, Scissors, Leaf, ShieldCheck, MapPin } from 'lucide-react';

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
    <div style={{ background: '#ffffff', minHeight: '100%' }}>
      {/* Welcome Banner (Cohere Deep Green) */}
      <div style={{
        background: '#003c33',
        padding: '20px 20px 32px',
      }}>
        <p style={{ color: '#edfce9', fontSize: '14px', margin: '0 0 4px', fontWeight: 400 }}>Good evening,</p>
        <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: 700, margin: '0 0 24px', letterSpacing: '-0.5px' }}>
          Vashishta.
        </h2>
        
        {/* Search bar */}
        <div style={{
          background: '#ffffff',
          borderRadius: '8px',
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: '10px',
          cursor: 'text'
        }} onClick={() => onNavigate('search')}>
          <SearchIcon size={20} color="#75758a" />
          <span style={{ color: '#75758a', fontSize: '16px', fontFamily: 'Inter, sans-serif' }}>Search plumber, doctor, tutor...</span>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ padding: '24px 0 12px' }}>
        <div style={{ display: 'flex', gap: '8px', padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => setActiveCategory(cat.label === activeCategory ? null : cat.label)} style={{
              background: activeCategory === cat.label ? '#17171c' : '#eeece7',
              color: activeCategory === cat.label ? '#ffffff' : '#212121',
              border: 'none', borderRadius: '32px',
              padding: '8px 16px', whiteSpace: 'nowrap',
              fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s ease',
            }}>
              <cat.icon size={16} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#212121', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Recommended by your Tribe
          </span>
        </div>

        {feed.map((item) => (
          <FeedCard key={item.id} item={item} saved={savedIds.includes(item.id)} onSave={() => toggle(item.id)} onTap={() => onNavigate('provider-profile')} />
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
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}
      onClick={onTap}
    >
      {/* Provider Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '8px',
            background: '#f1f5ff', color: '#1863dc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={24} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#17171c', letterSpacing: '-0.2px' }}>{item.provider}</div>
            <div style={{ fontSize: '14px', color: '#616161', marginTop: '2px' }}>{item.category}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#003c33' }}>
          <ShieldCheck size={20} />
          <span style={{ fontSize: '18px', fontWeight: 700 }}>{item.score}</span>
        </div>
      </div>

      {/* Recommenders Stack */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
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
        <div style={{ fontSize: '14px', color: '#212121' }}>
          Recommended by <strong>{item.recommenders[0].name}</strong> 
          {item.recommenders.length > 1 && ` and ${item.recommenders.length - 1} others`}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {item.tags.map((tag) => (
          <span key={tag} style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: '#ffffff', color: '#212121',
            border: '1px solid #d9d9dd',
            padding: '4px 12px', borderRadius: '32px',
            fontSize: '12px', fontWeight: 500,
          }}>
            <Check size={12} color="#1863dc" /> {tag}
          </span>
        ))}
      </div>

      {/* Review Quote */}
      <p style={{
        fontSize: '16px', color: '#212121',
        lineHeight: 1.5, margin: 0,
        fontFamily: "'Space Grotesk', sans-serif"
      }}>
        {item.review}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(); }}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
            color: saved ? '#1863dc' : '#616161',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          {saved ? 'Saved to lists' : 'Save provider'}
        </button>
      </div>
    </div>
  );
}
