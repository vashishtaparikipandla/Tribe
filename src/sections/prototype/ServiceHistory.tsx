import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Search, Star, Phone, RotateCcw, MessageCircle } from 'lucide-react';

const historyGroups = [
  {
    month: 'July 2026',
    entries: [
      {
        id: 1,
        provider: 'QuickFix Plumbing',
        category: 'Plumber',
        date: 'Jul 10, 2026',
        rating: null,
        cost: '₹800'
      },
      {
        id: 2,
        provider: 'Urban Cleaners',
        category: 'Home Cleaning',
        date: 'Jul 2, 2026',
        rating: 4,
        cost: '₹1200'
      }
    ]
  },
  {
    month: 'June 2026',
    entries: [
      {
        id: 3,
        provider: 'Dr. Anand Sharma',
        category: 'Cardiologist',
        date: 'Jun 15, 2026',
        rating: 5,
        cost: '₹1500'
      }
    ]
  }
];

export default function ServiceHistoryScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%' }} className="animate-slide-up-fade">
      
      {/* Header */}
      <div style={{ background: '#ffffff', padding: '64px 24px 16px', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => onNavigate('home')} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.5px' }}>
            Service History
          </h1>
        </div>

        {/* Search */}
        <div style={{
          background: '#f1f5f9', borderRadius: '12px', padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: '12px'
        }}>
          <Search size={18} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search providers or categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '15px', color: '#0f172a', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        
        {historyGroups.map(group => (
          <div key={group.month} style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>{group.month}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {group.entries.map(entry => (
                <div key={entry.id} style={{ background: '#ffffff', borderRadius: '20px', padding: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div onClick={() => onNavigate('provider-profile')} style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{entry.provider}</div>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                        {entry.category} • {entry.date} • {entry.cost}
                      </div>
                    </div>
                    {entry.rating ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f8fafc', padding: '4px 8px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#4c1d95' }}>
                        <Star size={14} fill="#4c1d95" /> {entry.rating}
                      </div>
                    ) : (
                      <button onClick={() => onNavigate('add-recommendation')} style={{ background: '#fffbeb', color: '#d97706', border: '1px dashed #fcd34d', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                        <MessageCircle size={14} /> Rate this
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    <button style={{
                      flex: 1, background: '#f8fafc', color: '#0f172a', border: 'none', borderRadius: '12px',
                      padding: '10px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer'
                    }}>
                      <RotateCcw size={16} /> Rebook
                    </button>
                    <button style={{
                      flex: 1, background: '#f8fafc', color: '#0f172a', border: 'none', borderRadius: '12px',
                      padding: '10px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer'
                    }}>
                      <Phone size={16} /> Call Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
