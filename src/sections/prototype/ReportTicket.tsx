import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function ReportTicketScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  const issueTypes = [
    'Provider did not show up',
    'Unprofessional behavior',
    'Overcharged / Price dispute',
    'Poor quality of work',
    'Fake profile / Scammer',
    'Other app issue'
  ];

  if (step === 'success') {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }} className="animate-fade-in">
        <div style={{ width: '80px', height: '80px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Ticket Submitted</h2>
        <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', lineHeight: 1.5 }}>
          Our trust & safety team will review this report within 24 hours. We prioritize network safety above all else.
        </p>
        <button onClick={() => onNavigate('home')} style={{
          width: '100%', padding: '16px', background: '#0f172a', color: '#ffffff',
          border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer'
        }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      <div style={{
        background: '#ffffff', padding: '64px 24px 16px', borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={() => onNavigate('help-support')} style={{
          background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
          display: 'flex', alignItems: 'center'
        }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Report an Issue</h1>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>
          If a provider violated our community standards, let us know. Severe violations may result in the provider being banned from the network.
        </p>

        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>What went wrong?</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
          {issueTypes.map(type => (
            <button
              key={type}
              onClick={() => setIssueType(type)}
              style={{
                padding: '16px', borderRadius: '12px', textAlign: 'left',
                background: issueType === type ? '#faf5ff' : '#ffffff',
                border: issueType === type ? '2px solid #7e22ce' : '1px solid #e2e8f0',
                color: issueType === type ? '#7e22ce' : '#334155',
                fontSize: '15px', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Additional Details (Optional)</h3>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Please provide any specific details to help our investigation..."
          style={{
            width: '100%', height: '120px', padding: '16px', borderRadius: '16px',
            border: '1px solid #e2e8f0', background: '#ffffff', fontSize: '15px',
            fontFamily: 'inherit', color: '#0f172a', resize: 'none', boxSizing: 'border-box',
            marginBottom: '32px'
          }}
        />

        <button
          disabled={!issueType}
          onClick={() => setStep('success')}
          style={{
            width: '100%', padding: '18px', background: issueType ? '#ef4444' : '#cbd5e1',
            color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '16px',
            fontWeight: 700, cursor: issueType ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <Send size={20} /> Submit Report
        </button>

      </div>
    </div>
  );
}
