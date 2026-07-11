import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, MoreHorizontal, ChevronDown, ChevronUp, Star, Pencil, Trash2 } from 'lucide-react';

const initialRecommendations = [
  {
    id: 1,
    providerName: 'Dr. Anand Sharma',
    category: 'Doctors',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    date: 'Oct 12, 2024',
    edited: false,
    review: 'Excellent doctor. Highly recommended by my network. Genuinely listens and does not rush the consultation.',
    metrics: { budget: 70, efficiency: 90, quality: 98, reliability: 95 }
  },
  {
    id: 2,
    providerName: 'Raju Plumbing Works',
    category: 'Plumbers',
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    date: 'Sep 28, 2024',
    edited: true,
    review: 'Fixed the leak in 45 mins flat. Showed up on time, quoted upfront. Update: Used him again and he is still great.',
    metrics: { budget: 85, efficiency: 95, quality: 90, reliability: 95 }
  }
];

export default function MyRecommendationsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [recs, setRecs] = useState(initialRecommendations);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Doctors', 'Plumbers']);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this rating? This will remove your rating from this provider's trust score for everyone in your tribe.")) {
      setRecs(prev => prev.filter(r => r.id !== id));
      setMenuOpen(null);
    }
  };

  const handleEdit = (id: number) => {
    // Navigate to AddRecommendation with prepopulated state (mocked by just going to the screen)
    onNavigate('add-recommendation');
  };

  // Group by category
  const grouped = recs.reduce((acc, rec) => {
    if (!acc[rec.category]) acc[rec.category] = [];
    acc[rec.category].push(rec);
    return acc;
  }, {} as Record<string, typeof recs>);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Header */}
      <div style={{
        background: '#ffffff',
        padding: '64px 24px 16px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: '16px',
        position: 'relative', zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={24} color="#0f172a" />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>My Recommendations</h1>
      </div>

      <div style={{ padding: '24px' }}>
        
        {recs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 20px', background: '#ffffff', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
            <div style={{ background: '#f0fdf4', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Star size={32} color="#16a34a" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>You haven't rated anyone yet</h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px', lineHeight: 1.5 }}>
              Your trust footprint is empty. Rate a provider you've used to help your friends make better decisions.
            </p>
            <button onClick={() => onNavigate('add-recommendation')} style={{
              background: '#16a34a', color: '#ffffff', border: 'none', borderRadius: '24px',
              padding: '12px 24px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(22,163,74,0.3)'
            }}>
              Add a recommendation
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(grouped).map(category => (
              <div key={category} style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                
                <button onClick={() => toggleCategory(category)} style={{
                  width: '100%', background: '#f8fafc', border: 'none', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'
                }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{category} ({grouped[category].length})</span>
                  {expandedCategories.includes(category) ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </button>

                {expandedCategories.includes(category) && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {grouped[category].map((rec, index) => (
                      <div key={rec.id} style={{ padding: '20px', borderBottom: index === grouped[category].length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                        
                        {/* Provider Info Row */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <img src={rec.image} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{rec.providerName}</div>
                              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>
                                {rec.date} {rec.edited && <span style={{ fontStyle: 'italic' }}>(edited)</span>}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ position: 'relative' }}>
                            <button onClick={() => setMenuOpen(menuOpen === rec.id ? null : rec.id)} style={{
                              background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', color: '#64748b'
                            }}>
                              <MoreHorizontal size={20} />
                            </button>
                            
                            {/* Actions Menu */}
                            {menuOpen === rec.id && (
                              <div style={{
                                position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                                background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                border: '1px solid #e2e8f0', minWidth: '160px', zIndex: 20, overflow: 'hidden'
                              }}>
                                <button onClick={() => handleEdit(rec.id)} style={{
                                  width: '100%', background: 'transparent', border: 'none', padding: '12px 16px',
                                  display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, color: '#334155',
                                  cursor: 'pointer', borderBottom: '1px solid #f1f5f9', textAlign: 'left'
                                }}>
                                  <Pencil size={16} /> Edit
                                </button>
                                <button onClick={() => handleDelete(rec.id)} style={{
                                  width: '100%', background: 'transparent', border: 'none', padding: '12px 16px',
                                  display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, color: '#ef4444',
                                  cursor: 'pointer', textAlign: 'left'
                                }}>
                                  <Trash2 size={16} /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Metrics Bar Chart */}
                        <div style={{ display: 'flex', gap: '4px', height: '16px', alignItems: 'flex-end', marginBottom: '12px' }}>
                          <div style={{ width: '8px', height: `${rec.metrics.budget}%`, background: rec.metrics.budget > 80 ? '#10b981' : rec.metrics.budget > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                          <div style={{ width: '8px', height: `${rec.metrics.efficiency}%`, background: rec.metrics.efficiency > 80 ? '#10b981' : rec.metrics.efficiency > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                          <div style={{ width: '8px', height: `${rec.metrics.quality}%`, background: rec.metrics.quality > 80 ? '#10b981' : rec.metrics.quality > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                          <div style={{ width: '8px', height: `${rec.metrics.reliability}%`, background: rec.metrics.reliability > 80 ? '#10b981' : rec.metrics.reliability > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginLeft: '6px' }}>Trust Metrics</span>
                        </div>

                        {/* Review Text */}
                        <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: 1.5, fontStyle: 'italic' }}>
                          "{rec.review}"
                        </p>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
