import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Search as SearchIcon, X, Clock, ChevronRight } from 'lucide-react';

const recentSearches = ['Plumber near me', 'Cardiologist', 'Mechanic', 'Math Tutor'];
const popularSearches = ['Electrician', 'Carpenter', 'Dentist', 'Caterer'];

export default function SearchScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      setShowResults(false);
      const timer = setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
      setShowResults(false);
    }
  }, [query]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search Header (Dark Purple) */}
      <div style={{ 
        padding: '64px 20px 24px', // Space for status bar 
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="animate-slide-up-fade">
          <div style={{
            flex: 1, background: '#ffffff', borderRadius: '16px',
            display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <SearchIcon size={20} color="#7e22ce" />
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search providers..."
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                fontSize: '16px', width: '100%', color: '#0f172a', fontFamily: 'inherit', fontWeight: 500
              }}
            />
            {query && <X size={20} color="#94a3b8" onClick={() => setQuery('')} style={{ cursor: 'pointer' }} />}
          </div>
          <button onClick={() => onNavigate('home')} style={{
            background: 'none', border: 'none', color: '#ffffff',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer', padding: '8px'
          }}>
            Cancel
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px', flex: 1 }}>
        {!query || query.length <= 2 ? (
          <div className="animate-slide-up-fade delay-100">
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recent Searches
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentSearches.map(s => (
                  <div key={s} onClick={() => setQuery(s)} style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', color: '#0f172a', cursor: 'pointer',
                    background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}>
                    <Clock size={18} color="#94a3b8" />
                    <span style={{ fontSize: '15px', fontWeight: 500, flex: 1 }}>{s}</span>
                    <ChevronRight size={18} color="#cbd5e1" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Popular in your Tribe
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularSearches.map(s => (
                  <button key={s} onClick={() => setQuery(s)} style={{
                    background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '32px',
                    padding: '8px 16px', fontSize: '14px', color: '#334155', fontWeight: 500,
                    cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : isSearching ? (
          <div className="animate-slide-up-fade" style={{ textAlign: 'center', color: '#64748b', marginTop: '40px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #f3e8ff', borderTopColor: '#7e22ce', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontWeight: 500 }}>Searching your Tribe network...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : showResults ? (
          <div className="animate-slide-up-fade">
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Results for "{query}"
            </div>
            
            {/* Mock Result Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                cursor: 'pointer',
              }}
              onClick={() => onNavigate('provider-profile')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '16px',
                    background: '#faf5ff', color: '#7e22ce',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold'
                  }}>
                    A
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Dr. Anand Sharma</div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Cardiologist</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '16px', fontSize: '14px', color: '#475569' }}>
                Recommended by <strong style={{ color: '#0f172a' }}>Mahendra</strong> and 2 others
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
