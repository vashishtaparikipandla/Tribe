import { useState, useEffect } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Search as SearchIcon, X, Clock, ChevronRight, MessageCircle, UserPlus, Ghost } from 'lucide-react';

const recentSearches = ['Plumber near me', 'Cardiologist', 'Mechanic', 'Math Tutor'];
const popularSearches = ['Electrician', 'Carpenter', 'Dentist', 'Caterer'];

export default function SearchScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock result count based on query for demonstration
  // 'test' -> 0 results
  // 'plumber' -> 1 result (thin)
  // anything else -> >1 results
  const [resultCount, setResultCount] = useState<number>(2);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      setShowResults(false);
      const timer = setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
        if (query.toLowerCase() === 'test') {
          setResultCount(0);
        } else if (query.toLowerCase().includes('plumber')) {
          setResultCount(1);
        } else {
          setResultCount(2);
        }
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
      setShowResults(false);
    }
  }, [query]);

  const handleAskTribe = () => {
    sessionStorage.setItem('prefill_query', query);
    onNavigate('consensus-request');
  };

  const handleAddYourself = () => {
    sessionStorage.setItem('prefill_provider_name', query);
    onNavigate('add-recommendation');
  };

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
              placeholder="Search providers... (try 'test' or 'plumber')"
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
      <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          <div className="animate-slide-up-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {resultCount === 0 ? (
              // ZERO RESULTS STATE
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Ghost size={40} color="#94a3b8" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                  No one in your network has rated '{query}' yet.
                </h3>
                <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', lineHeight: '1.5' }}>
                  You can ask your tribe if they know someone, or add a provider yourself if you already have one in mind.
                </p>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button onClick={handleAskTribe} style={{
                    width: '100%', padding: '16px', background: '#7e22ce', color: 'white', border: 'none', borderRadius: '16px',
                    fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                  }}>
                    <MessageCircle size={20} />
                    Ask my tribe
                  </button>
                  <button onClick={handleAddYourself} style={{
                    width: '100%', padding: '16px', background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '16px',
                    fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                  }}>
                    <UserPlus size={20} />
                    Add them yourself
                  </button>
                </div>
              </div>
            ) : (
              // RESULTS EXIST
              <>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Results for "{query}"
                </div>

                {/* THIN RESULTS BANNER */}
                {resultCount === 1 && (
                  <div style={{
                    background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '16px', marginBottom: '24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#991b1b', marginBottom: '4px' }}>Only 1 trusted result.</div>
                      <div style={{ fontSize: '13px', color: '#b91c1c' }}>Ask your tribe for more opinions?</div>
                    </div>
                    <button onClick={handleAskTribe} style={{
                      background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                    }}>
                      Ask
                    </button>
                  </div>
                )}
                
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

                {/* Second result if >1 */}
                {resultCount > 1 && (
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      padding: '24px',
                      border: '1px solid #f1f5f9',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      marginTop: '12px'
                    }}
                    onClick={() => onNavigate('provider-profile')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '16px',
                          background: '#f0fdf4', color: '#16a34a',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold'
                        }}>
                          V
                        </div>
                        <div>
                          <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Dr. Vivek Gupta</div>
                          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Cardiologist</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', fontSize: '14px', color: '#475569' }}>
                      Recommended by <strong style={{ color: '#0f172a' }}>Priya</strong>
                    </div>
                  </div>
                )}

                {/* Fallback Options (Only if >1 results, to avoid crowding the thin results banner) */}
                {resultCount > 1 && (
                  <div style={{ marginTop: '32px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', marginBottom: '16px', textAlign: 'center' }}>
                      Didn't find what you were looking for?
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button onClick={handleAskTribe} style={{
                        background: '#ffffff', color: '#6b21a8', border: '1px solid #e9d5ff', borderRadius: '16px', padding: '16px',
                        fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <MessageCircle size={20} />
                          <span>Ask your tribe</span>
                        </div>
                        <ChevronRight size={20} color="#cbd5e1" />
                      </button>
                      <button onClick={handleAddYourself} style={{
                        background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px',
                        fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <UserPlus size={20} />
                          <span>Onboard them yourself</span>
                        </div>
                        <ChevronRight size={20} color="#cbd5e1" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
