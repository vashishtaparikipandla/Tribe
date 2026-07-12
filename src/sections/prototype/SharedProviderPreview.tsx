import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, ShieldCheck, MapPin, Download, Check } from 'lucide-react';
import { TribeLogo } from '@/components/TribeLogo';

export default function SharedProviderPreviewScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
      
      {/* Mobile Web Simulation Header */}
      <div style={{ background: '#ffffff', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TribeLogo variant="wordmark" size={32} background="light" />
        </div>
        <button onClick={() => onNavigate('onboarding')} style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
          Open App
        </button>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        
        <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 24px', border: '1px solid #f1f5f9', boxShadow: '0 8px 32px rgba(0,0,0,0.04)', textAlign: 'center', marginBottom: '32px' }}>
          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
               style={{ width: '80px', height: '80px', borderRadius: '24px', objectFit: 'cover', margin: '0 auto 16px', border: '1px solid #f1f5f9' }} />
          
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
            Dr. Anand Sharma
          </h1>
          <div style={{ color: '#64748b', fontSize: '15px', fontWeight: 500, marginBottom: '16px' }}>Cardiologist</div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 700 }}>
              <ShieldCheck size={18} /> 4.8 Trust Score
            </div>
            <div style={{ background: '#f8fafc', color: '#475569', padding: '6px 12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}>
              <MapPin size={16} /> Banjara Hills
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px dashed #cbd5e1', textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#334155', margin: '0 0 12px' }}>Recommended by:</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Megha</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Your Contact</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', filter: 'blur(2px)', opacity: 0.7 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Hidden Contact</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>In Megha's network</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', filter: 'blur(2px)', opacity: 0.7 }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Hidden Contact</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>In your extended network</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div style={{ background: '#ffffff', padding: '24px', borderTop: '1px solid #f1f5f9', boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', textAlign: 'center' }}>
          See who else trusts Anand
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', margin: '0 0 20px', lineHeight: 1.5 }}>
          Tribe reveals trusted providers based on your actual phone contacts. No strangers, no fake reviews.
        </p>
        <button onClick={() => onNavigate('onboarding')} style={{
          width: '100%', padding: '18px', background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', color: '#ffffff',
          border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          boxShadow: '0 8px 16px rgba(107, 33, 168, 0.2)'
        }}>
          <Download size={20} /> Get Tribe
        </button>
      </div>

    </div>
  );
}
