import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft } from 'lucide-react';

export default function LegalDocumentScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [docType] = useState<'privacy' | 'terms'>('privacy'); // Mocking privacy policy view

  return (
    <div style={{ background: '#ffffff', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
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
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
          {docType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Tribe Privacy Policy</h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Last Updated: October 15, 2026 • Version 2.1</p>
        </div>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase' }}>Table of Contents</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#7e22ce', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 500 }}>
            <li style={{ cursor: 'pointer' }}>1. What Contact Data we collect</li>
            <li style={{ cursor: 'pointer' }}>2. How Contact Data is hashed</li>
            <li style={{ cursor: 'pointer' }}>3. Data Retention Period</li>
            <li style={{ cursor: 'pointer' }}>4. What happens on Account Deletion</li>
            <li style={{ cursor: 'pointer' }}>5. Your DPDP Act Rights</li>
          </ul>
        </div>

        <div style={{ color: '#334155', fontSize: '15px', lineHeight: 1.6 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '32px', marginBottom: '12px' }}>1. What Contact Data we collect</h3>
          <p style={{ marginBottom: '16px' }}>
            To build your trusted network, we request access to your device's address book. We only collect the phone numbers. We do not collect contact names, emails, or other metadata.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '32px', marginBottom: '12px' }}>2. How Contact Data is hashed</h3>
          <p style={{ marginBottom: '16px' }}>
            We cryptographically hash all phone numbers on your device before they ever reach our servers. We cannot reverse this hash to discover your contacts' raw phone numbers. We use these hashes strictly to connect you with existing Tribe users in your network.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '32px', marginBottom: '12px' }}>3. Data Retention Period</h3>
          <p style={{ marginBottom: '16px' }}>
            Your hashed contact list is retained as long as your account is active to continually update your network as new friends join Tribe. If you disable Contact Sync in your settings, this data is immediately purged.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '32px', marginBottom: '12px' }}>4. What happens on Account Deletion</h3>
          <p style={{ marginBottom: '16px' }}>
            When you delete your account, all personally identifying information (PII), saved providers, and booking history are permanently deleted. 
            However, any Recommendations you have authored are <strong>anonymized</strong> (attributed to "a former Tribe member") rather than deleted. This ensures we do not break the trust scores and historical data for other users in the network.
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '32px', marginBottom: '12px' }}>5. Your DPDP Act Rights</h3>
          <p style={{ marginBottom: '16px' }}>
            Under the Digital Personal Data Protection Act, you have the right to access, correct, and erase your personal data. You can export your data at any time via the Privacy & Data menu. For grievances, please contact our Grievance Officer at grievance@tribe.com.
          </p>
        </div>
      </div>
    </div>
  );
}
