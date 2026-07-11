import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Bookmark, ShieldCheck, MapPin, ChevronRight, Edit3 } from 'lucide-react';

const savedProviders = [
  {
    id: 1,
    name: 'Dr. Anand Sharma',
    category: 'Cardiologist',
    location: 'Banjara Hills, Hyd',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    isTribeRecommended: true,
    note: 'Very patient. Gave a 10% discount on the consultation fee last time.'
  },
  {
    id: 2,
    name: 'Ramesh Plumbing',
    category: 'Plumber',
    location: 'Madhapur, Hyd',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    isTribeRecommended: false,
    note: 'Fixed the kitchen sink leakage fast. Keep him in mind for emergency calls.'
  }
];

export default function SavedProvidersScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>(
    savedProviders.reduce((acc, p) => ({ ...acc, [p.id]: p.note }), {})
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 32px', color: '#ffffff',
        borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button onClick={() => onNavigate('user-profile')} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', color: '#ffffff', padding: 0,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
            <Bookmark size={24} color="#ffffff" fill="#ffffff" />
          </div>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          Saved Providers
        </h1>
        <p style={{ fontSize: '15px', color: '#e9d5ff', fontWeight: 500, margin: 0 }}>
          Your private list of bookmarked providers.
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {savedProviders.map(provider => (
          <div key={provider.id} style={{ 
            background: '#ffffff', borderRadius: '20px', 
            border: '1px solid #f1f5f9', boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer' }} onClick={() => onNavigate('provider-profile')}>
              <img src={provider.image} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{provider.name}</h3>
                  {provider.isTribeRecommended && (
                    <ShieldCheck size={18} color="#10b981" />
                  )}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{provider.category}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <MapPin size={12} /> {provider.location}
                </div>
              </div>
              <ChevronRight size={20} color="#cbd5e1" />
            </div>

            {/* Private Note Section */}
            <div style={{ background: '#fef9c3', padding: '16px', borderTop: '1px dashed #fde047' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#a16207', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Private Note
                </span>
                <button 
                  onClick={() => setEditingNoteId(editingNoteId === provider.id ? null : provider.id)} 
                  style={{ background: 'none', border: 'none', color: '#a16207', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}
                >
                  <Edit3 size={14} /> {editingNoteId === provider.id ? 'Done' : 'Edit'}
                </button>
              </div>
              
              {editingNoteId === provider.id ? (
                <textarea 
                  autoFocus
                  value={notes[provider.id]}
                  onChange={(e) => setNotes({...notes, [provider.id]: e.target.value})}
                  style={{ 
                    width: '100%', minHeight: '60px', padding: '8px', 
                    background: '#ffffff', border: '1px solid #fde047', borderRadius: '8px',
                    fontSize: '14px', color: '#451a03', fontFamily: 'inherit', resize: 'vertical', outline: 'none'
                  }}
                  placeholder="Add a private note (only you can see this)..."
                />
              ) : (
                <p style={{ fontSize: '14px', color: '#713f12', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                  {notes[provider.id] || "No private note added yet."}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
