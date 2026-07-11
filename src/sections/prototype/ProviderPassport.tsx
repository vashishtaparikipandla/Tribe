import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, ShieldCheck, QrCode, Download, Printer } from 'lucide-react';

export default function ProviderPassportScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#0f172a', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ padding: '64px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff' }}>
        <button onClick={() => onNavigate('provider-profile')} style={{
          background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
          width: '36px', height: '36px', color: '#ffffff', padding: 0,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>Reputation Passport</div>
        <div style={{ width: 36 }} />
      </div>

      {/* Shareable Card Area */}
      <div style={{ padding: '0 24px 32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* The Card itself */}
        <div style={{
          background: '#ffffff', borderRadius: '32px', padding: '32px 24px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden'
        }} className="animate-slide-up-fade">
          
          {/* Top Banner inside card */}
          <div style={{ background: 'linear-gradient(135deg, #4c1d95, #3b0764)', position: 'absolute', top: 0, left: 0, right: 0, height: '140px', zIndex: 0 }} />
          
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: '16px' }}>
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                 style={{ width: '100px', height: '100px', borderRadius: '24px', border: '4px solid #ffffff', objectFit: 'cover', margin: '0 auto 16px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} />
            
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.5px' }}>Dr. Anand Sharma</h2>
            <div style={{ fontSize: '15px', color: '#64748b', fontWeight: 600, marginBottom: '16px' }}>Cardiologist</div>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#16a34a', padding: '8px 16px', borderRadius: '16px', fontWeight: 700, fontSize: '14px', marginBottom: '32px' }}>
              <ShieldCheck size={18} /> Verified on Tribe
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #e2e8f0', margin: '0 -24px 32px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -10, left: -10, width: 20, height: 20, borderRadius: '50%', background: '#0f172a' }} />
            <div style={{ position: 'absolute', top: -10, right: -10, width: 20, height: 20, borderRadius: '50%', background: '#0f172a' }} />
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
            {/* QR Code Mock */}
            <div style={{ flexShrink: 0, width: '120px', height: '120px', background: '#f8fafc', borderRadius: '16px', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <QrCode size={64} strokeWidth={1} />
            </div>

            {/* Metrics Mini */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Budget', value: 3.8 },
                { label: 'Efficiency', value: 4.6 },
                { label: 'Quality', value: 4.9 },
                { label: 'Reliability', value: 4.7 }
              ].map(m => (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                    <span>{m.label}</span>
                    <span style={{ color: '#0f172a' }}>{m.value.toFixed(1)}</span>
                  </div>
                  <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${(m.value / 5) * 100}%`, background: '#7e22ce', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
            Scan to recommend me on Tribe
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }} className="animate-slide-up-fade delay-100">
          <button style={{
            flex: 1, padding: '16px', background: '#334155', color: '#ffffff',
            border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <Download size={18} /> Save Image
          </button>
          <button style={{
            flex: 1, padding: '16px', background: 'linear-gradient(135deg, #6b21a8, #4c1d95)', color: '#ffffff',
            border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <Printer size={18} /> Print PDF
          </button>
        </div>

      </div>
    </div>
  );
}
