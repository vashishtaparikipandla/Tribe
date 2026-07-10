import React, { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Search as SearchIcon, X, Clock } from 'lucide-react';

const recentSearches = ['Plumber near me', 'Cardiologist', 'Mechanic', 'Math Tutor'];
const popularSearches = ['Electrician', 'Carpenter', 'Dentist', 'Caterer'];

export default function SearchScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [query, setQuery] = useState('');

  return (
    <div style={{ background: '#ffffff', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Search Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid #e5e7eb', background: '#003c33' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            flex: 1, background: '#ffffff', borderRadius: '12px',
            display: 'flex', alignItems: 'center', padding: '12px 16px', gap: '12px'
          }}>
            <SearchIcon size={20} color="#616161" />
            <input 
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search providers, categories..."
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                fontSize: '16px', width: '100%', color: '#17171c', fontFamily: 'inherit'
              }}
            />
            {query && <X size={20} color="#616161" onClick={() => setQuery('')} style={{ cursor: 'pointer' }} />}
          </div>
          <button onClick={() => onNavigate('home')} style={{
            background: 'none', border: 'none', color: '#ffffff',
            fontSize: '16px', fontWeight: 500, cursor: 'pointer', padding: 0
          }}>
            Cancel
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px' }}>
        {!query ? (
          <>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#93939f', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recent Searches
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentSearches.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#17171c', cursor: 'pointer' }}>
                    <Clock size={16} color="#93939f" />
                    <span style={{ fontSize: '16px' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#93939f', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Popular in your Tribe
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularSearches.map(s => (
                  <button key={s} style={{
                    background: '#f1f5f9', border: 'none', borderRadius: '32px',
                    padding: '8px 16px', fontSize: '14px', color: '#17171c',
                    cursor: 'pointer'
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#616161', marginTop: '40px' }}>
            <SearchIcon size={48} color="#e5e7eb" style={{ marginBottom: '16px' }} />
            <p>Searching your Tribe network for "{query}"...</p>
          </div>
        )}
      </div>
    </div>
  );
}
