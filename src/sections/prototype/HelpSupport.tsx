import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, MessageSquare, PhoneCall, ChevronRight, HelpCircle, FileText } from 'lucide-react';

export default function HelpSupportScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      q: 'How are trust scores calculated?',
      a: 'Trust scores (Tribe Consensus) are an aggregate of ratings provided by people in your direct network and their connections (up to 2 degrees of separation).'
    },
    {
      id: 2,
      q: 'What if a provider performs poorly?',
      a: 'You can report them from their profile. If multiple members of a tribe report a provider, their score drops significantly and they may be flagged to the network.'
    },
    {
      id: 3,
      q: 'Who can see my recommendations?',
      a: 'Only people in your synced contacts, and people in their contacts (if the privacy settings allow). Strangers on the internet cannot see your name or picture attached to a review.'
    }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      <div style={{
        background: '#ffffff', padding: '64px 24px 16px', borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{
          background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
          display: 'flex', alignItems: 'center'
        }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Help & Support</h1>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <button style={{
            background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={24} color="#7e22ce" />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Live Chat</div>
          </button>
          
          <button style={{
            background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PhoneCall size={24} color="#7e22ce" />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Call Us</div>
          </button>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '32px' }}>
          <button onClick={() => onNavigate('report-ticket')} style={{
            width: '100%', padding: '20px', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#ef4444" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Report an Issue</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Provider dispute or app bug</div>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} color="#6b21a8" /> FAQs
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq) => (
              <div key={faq.id} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  style={{
                    width: '100%', padding: '16px', background: 'none', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', textAlign: 'left', fontSize: '15px', fontWeight: 600, color: '#0f172a'
                  }}
                >
                  {faq.q}
                  <ChevronRight size={20} color="#94a3b8" style={{ transform: openFaq === faq.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                </button>
                {openFaq === faq.id && (
                  <div className="animate-fade-in" style={{ padding: '0 16px 16px', fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
