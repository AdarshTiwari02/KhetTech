'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sprout, ArrowRight, Leaf, Sun, Droplets, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      router.replace('/dashboard');
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1f0f 0%, #0a1628 50%, #0d1f1a 100%)' }}>

      {/* Animated background blobs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '60%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* ── TOP NAV ── */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(16,185,129,0.1)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(0,0,0,0.2)'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16,185,129,0.4)'
          }}>
            <Sprout size={22} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
              KhetTech
            </div>
            <div style={{ fontSize: 11, color: 'rgba(167,243,208,0.7)', marginTop: -2 }}>
              KhetTech
            </div>
          </div>
        </div>

        {/* Right side buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/auth/login" style={{
            padding: '10px 22px', borderRadius: 10,
            border: '1px solid rgba(16,185,129,0.4)',
            color: '#34d399', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', cursor: 'pointer',
            transition: 'all 0.2s',
            background: 'rgba(16,185,129,0.05)',
            backdropFilter: 'blur(8px)',
          }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.background = 'rgba(16,185,129,0.15)';
              (e.target as HTMLElement).style.borderColor = '#34d399';
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.background = 'rgba(16,185,129,0.05)';
              (e.target as HTMLElement).style.borderColor = 'rgba(16,185,129,0.4)';
            }}>
            लॉगिन करें
          </Link>
          <Link href="/auth/signup" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 22px', borderRadius: 10,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff', fontSize: 14, fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(16,185,129,0.35)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(16,185,129,0.55)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(16,185,129,0.35)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}>
            रजिस्टर करें
            <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <main style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        padding: '80px 24px 40px', minHeight: 'calc(100vh - 85px)'
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 100, padding: '6px 16px', marginBottom: 32
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <span style={{ color: '#6ee7b7', fontSize: 13, fontWeight: 500 }}>
            10,000+ किसान जुड़ चुके हैं
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 800, lineHeight: 1.1,
          margin: '0 0 24px', maxWidth: 800,
          letterSpacing: '-1px'
        }}>
          <span style={{ color: '#fff' }}>किसानों का </span>
          <span style={{
            background: 'linear-gradient(135deg, #10b981, #34d399, #6ee7b7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>डिजिटल साथी</span>
        </h1>

        <p style={{
          color: 'rgba(148,163,184,0.9)', fontSize: 'clamp(15px, 2vw, 19px)',
          maxWidth: 580, lineHeight: 1.7, margin: '0 0 48px'
        }}>
          फसल सुझाव, मौसम पूर्वानुमान, रोग पहचान और मंडी भाव —
          <br />सब एक जगह, बिल्कुल मुफ्त।
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 72 }}>
          <Link href="/auth/signup" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '15px 32px', borderRadius: 12,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 0 30px rgba(16,185,129,0.4)',
            transition: 'all 0.2s',
          }}>
            मुफ्त में शुरू करें
            <ArrowRight size={18} />
          </Link>
          <Link href="/auth/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '15px 32px', borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: 600,
            textDecoration: 'none',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}>
            लॉगिन करें
          </Link>
        </div>

        {/* Feature Pills */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
          maxWidth: 680
        }}>
          {[
            { icon: <Leaf size={15} />, label: '65+ फसल सुझाव', color: '#10b981' },
            { icon: <Sun size={15} />, label: '5 दिन मौसम पूर्वानुमान', color: '#f59e0b' },
            { icon: <Droplets size={15} />, label: 'रोग पहचान', color: '#3b82f6' },
            { icon: <BarChart3 size={15} />, label: 'मंडी भाव', color: '#8b5cf6' },
          ].map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(203,213,225,0.85)', fontSize: 13,
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{ color: f.color }}>{f.icon}</span>
              {f.label}
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{
          marginTop: 64, display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 40
        }}>
          {[
            { value: '10,000+', label: 'सक्रिय किसान' },
            { value: '₹2.5 Cr+', label: 'मुनाफा बढ़ा' },
            { value: '65+', label: 'फसल किस्में' },
            { value: '24/7', label: 'AI सहायता' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 28, fontWeight: 800, color: '#fff',
                background: 'linear-gradient(135deg, #10b981, #6ee7b7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{s.value}</div>
              <div style={{ color: 'rgba(148,163,184,0.7)', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        position: 'relative', zIndex: 10,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12 }}>
          © 2024 KhetTech. All rights reserved.
        </p>
      </footer>
    </div>
  );
}