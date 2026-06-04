'use client';
import React from 'react';

// Shared wireframe design tokens — all inline, no CSS classes needed
const T = {
  fill: '#e2e0d9',
  border: '#b8b5aa',
  bg: '#ffffff',
  bg2: '#f0efe9',
  text: '#5a5854',
  line: (w = '100%', opacity = 1) => ({
    background: '#b8b5aa',
    borderRadius: 2,
    height: 9,
    width: w,
    opacity,
    flexShrink: 0,
  } as React.CSSProperties),
};

const Full: React.CSSProperties = { width: '100%', height: '100%' };
const Flex = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'flex', ...extra });
const Col = (extra: React.CSSProperties = {}): React.CSSProperties => ({ display: 'flex', flexDirection: 'column', ...extra });

// ── NAVIGASI ──────────────────────────────────────────────
export function Navbar() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', padding: '0 14px', gap: 10, background: T.fill, borderBottom: `1.5px solid ${T.border}` }) }}>
      <div style={{ width: 64, height: 18, background: T.border, borderRadius: 3 }} />
      <div style={{ ...Flex({ gap: 8, marginLeft: 'auto' }) }}>
        {[1,2,3,4].map(i => <div key={i} style={{ width: 36, height: 10, background: T.border, borderRadius: 2, opacity: i === 4 ? 1 : 0.6 }} />)}
      </div>
    </div>
  );
}

export function SidebarEl() {
  return (
    <div style={{ ...Full, background: T.fill, borderRight: `1.5px solid ${T.border}`, padding: '10px 8px', ...Col({ gap: 6 }) }}>
      <div style={{ width: 54, height: 14, background: T.border, borderRadius: 3, marginBottom: 6 }} />
      {[true,false,false,false,false].map((active, i) => (
        <div key={i} style={{ height: 26, borderRadius: 4, background: active ? 'rgba(0,0,0,0.09)' : 'rgba(0,0,0,0.04)', border: `1px solid rgba(0,0,0,${active ? 0.09 : 0.04})` }} />
      ))}
    </div>
  );
}

export function TabBar() {
  return (
    <div style={{ ...Full, ...Flex(), background: T.fill, borderTop: `1.5px solid ${T.border}` }}>
      {[true,false,false,false].map((active, i) => (
        <div key={i} style={{ flex: 1, ...Col({ alignItems: 'center', justifyContent: 'center', gap: 4 }), borderRight: i < 3 ? `1px solid ${T.border}` : undefined, background: active ? 'rgba(255,255,255,0.5)' : undefined }}>
          <div style={{ width: 16, height: 16, background: T.border, borderRadius: 4, opacity: active ? 1 : 0.4 }} />
          <div style={{ width: 24, height: 6, background: T.border, borderRadius: 2, opacity: active ? 1 : 0.4 }} />
        </div>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', padding: '0 14px' }), background: T.fill, borderTop: `1.5px solid ${T.border}` }}>
      <div style={{ width: 44, height: 12, background: T.border, borderRadius: 2 }} />
      <div style={{ ...Flex({ gap: 8, marginLeft: 'auto' }) }}>
        {[1,2,3].map(i => <div key={i} style={{ width: 28, height: 8, background: T.border, borderRadius: 2, opacity: 0.6 }} />)}
      </div>
    </div>
  );
}

export function Breadcrumb() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', gap: 6, padding: '0 4px' }) }}>
      {['Home','Kategori','Halaman'].map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ fontSize: 12, color: T.border }}>›</span>}
          <div style={{ width: 42, height: 12, background: i === 2 ? T.border : T.fill, border: `1px solid ${T.border}`, borderRadius: 2 }} />
        </React.Fragment>
      ))}
    </div>
  );
}

// ── LAYOUT ────────────────────────────────────────────────
export function Hero() {
  return (
    <div style={{ ...Full, ...Col({ alignItems: 'center', justifyContent: 'center', gap: 10 }), background: T.fill, border: `1.5px dashed ${T.border}`, borderRadius: 4, padding: 16 }}>
      <div style={{ width: '60%', height: 18, background: T.border, borderRadius: 3 }} />
      <div style={{ width: '76%', height: 9, background: T.border, borderRadius: 2, opacity: 0.55 }} />
      <div style={{ width: '55%', height: 9, background: T.border, borderRadius: 2, opacity: 0.4 }} />
      <div style={{ ...Flex({ gap: 8, marginTop: 4 }) }}>
        <div style={{ width: 60, height: 26, background: T.border, borderRadius: 4 }} />
        <div style={{ width: 60, height: 26, border: `1.5px solid ${T.border}`, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export function Card() {
  return (
    <div style={{ ...Full, ...Col(), background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ background: T.fill, height: '42%', flexShrink: 0 }} />
      <div style={{ ...Col({ gap: 6 }), padding: 10, flex: 1 }}>
        <div style={T.line('80%')} />
        <div style={T.line('60%')} />
        <div style={T.line('40%')} />
      </div>
    </div>
  );
}

export function Grid2() {
  return (
    <div style={{ ...Full, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: 4 }}>
      {[1,2].map(i => <div key={i} style={{ background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 4 }} />)}
    </div>
  );
}

export function Grid3() {
  return (
    <div style={{ ...Full, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: 4 }}>
      {[1,2,3].map(i => <div key={i} style={{ background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 4 }} />)}
    </div>
  );
}

export function Modal() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', justifyContent: 'center' }), background: 'rgba(190,187,178,0.5)', borderRadius: 4 }}>
      <div style={{ width: '78%', height: '80%', background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 8, padding: 14, ...Col({ gap: 10 }) }}>
        <div style={{ ...Flex({ justifyContent: 'space-between', alignItems: 'center' }) }}>
          <div style={{ width: '50%', height: 12, background: T.border, borderRadius: 3 }} />
          <div style={{ width: 14, height: 14, background: T.fill, border: `1px solid ${T.border}`, borderRadius: 3 }} />
        </div>
        <div style={{ flex: 1, ...Col({ gap: 7 }) }}>
          <div style={T.line('90%')} />
          <div style={T.line('70%')} />
          <div style={T.line('55%')} />
        </div>
        <div style={{ ...Flex({ gap: 7, justifyContent: 'flex-end' }) }}>
          <div style={{ width: 56, height: 26, background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 4 }} />
          <div style={{ width: 56, height: 26, background: T.border, borderRadius: 4 }} />
        </div>
      </div>
    </div>
  );
}

export function Divider() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center' }) }}>
      <div style={{ width: '100%', height: 1.5, background: T.border }} />
    </div>
  );
}

export function Accordion() {
  return (
    <div style={{ ...Full, ...Col(), border: `1.5px solid ${T.border}`, borderRadius: 4, overflow: 'hidden' }}>
      {[true,false,false].map((open, i) => (
        <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${T.border}` : undefined, flex: open ? undefined : 1 }}>
          <div style={{ ...Flex({ alignItems: 'center', justifyContent: 'space-between' }), padding: '8px 10px', background: T.fill }}>
            <div style={{ width: '55%', height: 9, background: T.border, borderRadius: 2 }} />
            <span style={{ fontSize: 14, color: T.border, fontWeight: 300 }}>{open ? '−' : '+'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TIPOGRAFI ─────────────────────────────────────────────
export function Heading() {
  return (
    <div style={{ ...Full, ...Col({ gap: 8, justifyContent: 'center' }), padding: 8 }}>
      <div style={{ height: 20, width: '72%', background: T.border, borderRadius: 3 }} />
      <div style={{ height: 11, width: '52%', background: T.border, borderRadius: 2, opacity: 0.5 }} />
    </div>
  );
}

export function TextBlock() {
  return (
    <div style={{ ...Full, ...Col({ gap: 6 }), padding: 8 }}>
      {['100%','92%','96%','70%'].map((w, i) => <div key={i} style={T.line(w, 0.7)} />)}
    </div>
  );
}

export function Badge() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', justifyContent: 'center', gap: 6 }) }}>
      {[1,2].map(i => (
        <div key={i} style={{ height: '60%', minWidth: 60, background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 100, ...Flex({ alignItems: 'center', justifyContent: 'center', padding: '0 10px' }) }}>
          <div style={{ width: 44, height: 8, background: T.border, borderRadius: 2 }} />
        </div>
      ))}
    </div>
  );
}

export function Blockquote() {
  return (
    <div style={{ ...Full, ...Flex({ gap: 10 }), padding: 8 }}>
      <div style={{ width: 3, background: T.border, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ flex: 1, ...Col({ gap: 6, justifyContent: 'center' }) }}>
        {['92%','78%','55%'].map((w, i) => <div key={i} style={T.line(w, 0.6)} />)}
      </div>
    </div>
  );
}

// ── MEDIA ─────────────────────────────────────────────────
export function ImageEl() {
  return (
    <div style={{ ...Full, ...Col({ alignItems: 'center', justifyContent: 'center', gap: 8 }), background: T.fill, border: `1.5px dashed ${T.border}`, borderRadius: 4 }}>
      <div style={{ width: 40, height: 34, background: T.border, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 5, right: 6, width: 9, height: 9, background: 'rgba(255,255,255,0.4)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'rgba(0,0,0,0.12)' }} />
      </div>
      <span style={{ fontSize: 9, color: T.text, opacity: 0.5, letterSpacing: '0.06em' }}>IMAGE</span>
    </div>
  );
}

export function Avatar() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', justifyContent: 'center' }) }}>
      <div style={{ width: '65%', aspectRatio: '1', maxWidth: 72, background: T.fill, border: `2px solid ${T.border}`, borderRadius: '50%', ...Flex({ alignItems: 'center', justifyContent: 'center' }) }}>
        <div style={{ width: '50%', height: '50%', background: T.border, borderRadius: '50%' }} />
      </div>
    </div>
  );
}

export function VideoPlayer() {
  return (
    <div style={{ ...Full, ...Col({ alignItems: 'center', justifyContent: 'center' }), background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 4 }}>
      <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '14px 0 14px 24px', borderColor: `transparent transparent transparent ${T.border}`, opacity: 0.6, marginBottom: 10 }} />
      <div style={{ width: '80%', height: 8, background: 'rgba(0,0,0,0.08)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: '40%', height: '100%', background: T.border }} />
      </div>
    </div>
  );
}

export function MapEl() {
  return (
    <div style={{ ...Full, background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: 0.3 }} />
      <div style={{ position: 'absolute', top: '35%', left: '50%', width: 14, height: 14, background: T.border, borderRadius: '50% 50% 50% 0', transform: 'translateX(-50%) rotate(-45deg)' }} />
    </div>
  );
}

// ── FORM & INPUT ──────────────────────────────────────────
export function InputField() {
  return (
    <div style={{ ...Full, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 4, ...Flex({ alignItems: 'center' }), padding: '0 10px' }}>
      <div style={{ width: '52%', height: 9, background: T.fill, borderRadius: 2 }} />
    </div>
  );
}

export function Textarea() {
  return (
    <div style={{ ...Full, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 4, padding: 10, ...Col({ gap: 6 }) }}>
      {['60%','85%','40%'].map((w, i) => <div key={i} style={T.line(w, 0.5)} />)}
    </div>
  );
}

export function SelectEl() {
  return (
    <div style={{ ...Full, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 4, ...Flex({ alignItems: 'center' }), padding: '0 10px' }}>
      <div style={{ flex: 1, height: 9, background: T.fill, borderRadius: 2, width: '45%' }} />
      <span style={{ fontSize: 11, color: T.border }}>▾</span>
    </div>
  );
}

export function ButtonFilled() {
  return (
    <div style={{ ...Full, background: T.border, borderRadius: 5, ...Flex({ alignItems: 'center', justifyContent: 'center' }) }}>
      <div style={{ width: '55%', height: 9, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
    </div>
  );
}

export function ButtonOutline() {
  return (
    <div style={{ ...Full, border: `2px solid ${T.border}`, borderRadius: 5, ...Flex({ alignItems: 'center', justifyContent: 'center' }) }}>
      <div style={{ width: '55%', height: 9, background: T.border, borderRadius: 2 }} />
    </div>
  );
}

export function Checkbox() {
  return (
    <div style={{ ...Full, ...Col({ gap: 8, justifyContent: 'center' }), padding: '6px 0' }}>
      {[true,false,false].map((checked, i) => (
        <div key={i} style={{ ...Flex({ alignItems: 'center', gap: 8 }) }}>
          <div style={{ width: 15, height: 15, border: `1.5px solid ${T.border}`, borderRadius: 3, background: checked ? T.border : T.bg, flexShrink: 0 }} />
          <div style={{ height: 9, background: T.fill, borderRadius: 2, width: [70, 55, 48][i] }} />
        </div>
      ))}
    </div>
  );
}

export function RadioButton() {
  return (
    <div style={{ ...Full, ...Col({ gap: 8, justifyContent: 'center' }), padding: '6px 0' }}>
      {[true,false,false].map((selected, i) => (
        <div key={i} style={{ ...Flex({ alignItems: 'center', gap: 8 }) }}>
          <div style={{ width: 15, height: 15, border: `1.5px solid ${T.border}`, borderRadius: '50%', background: T.bg, flexShrink: 0, ...Flex({ alignItems: 'center', justifyContent: 'center' }) }}>
            {selected && <div style={{ width: 7, height: 7, background: T.border, borderRadius: '50%' }} />}
          </div>
          <div style={{ height: 9, background: T.fill, borderRadius: 2, width: [70, 55, 48][i] }} />
        </div>
      ))}
    </div>
  );
}

export function Toggle() {
  return (
    <div style={{ ...Full, ...Col({ gap: 8, justifyContent: 'center' }), padding: '6px 0' }}>
      {[true, false].map((on, i) => (
        <div key={i} style={{ ...Flex({ alignItems: 'center', gap: 8 }) }}>
          <div style={{ width: 34, height: 19, background: on ? T.border : T.fill, border: `1.5px solid ${T.border}`, borderRadius: 10, position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: 2, [on ? 'right' : 'left']: 2, width: 13, height: 13, background: 'white', borderRadius: '50%' }} />
          </div>
          <div style={{ height: 9, background: T.fill, borderRadius: 2, width: on ? 60 : 45, opacity: on ? 1 : 0.6 }} />
        </div>
      ))}
    </div>
  );
}

export function Slider() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center' }), padding: '0 4px' }}>
      <div style={{ width: '100%', height: 6, background: T.fill, borderRadius: 3, position: 'relative', border: `1px solid ${T.border}` }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '60%', background: T.border, borderRadius: 3 }} />
        <div style={{ position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%,-50%)', width: 18, height: 18, background: 'white', border: `2px solid ${T.border}`, borderRadius: '50%' }} />
      </div>
    </div>
  );
}

export function FormEl() {
  return (
    <div style={{ ...Full, border: `1.5px solid ${T.border}`, borderRadius: 6, padding: 14, ...Col({ gap: 9 }) }}>
      {[1,2].map(i => (
        <div key={i} style={{ ...Col({ gap: 4 }) }}>
          <div style={{ width: '42%', height: 8, background: T.border, borderRadius: 2 }} />
          <div style={{ height: 28, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 3 }} />
        </div>
      ))}
      <div style={{ ...Col({ gap: 4 }) }}>
        <div style={{ width: '30%', height: 8, background: T.border, borderRadius: 2 }} />
        <div style={{ height: 44, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 3 }} />
      </div>
      <div style={{ height: 30, background: T.border, borderRadius: 4, marginTop: 4 }} />
    </div>
  );
}

export function ProgressBar() {
  return (
    <div style={{ ...Full, ...Col({ gap: 6, justifyContent: 'center' }), padding: '4px 0' }}>
      <div style={{ width: '46%', height: 8, background: T.border, borderRadius: 2 }} />
      <div style={{ height: 10, background: T.fill, borderRadius: 5, overflow: 'hidden', border: `1px solid ${T.border}` }}>
        <div style={{ height: '100%', width: '62%', background: T.border, borderRadius: 5 }} />
      </div>
    </div>
  );
}

// ── DATA ──────────────────────────────────────────────────
export function Table() {
  return (
    <div style={{ ...Full, ...Col(), border: `1.5px solid ${T.border}`, borderRadius: 4, overflow: 'hidden' }}>
      <div style={{ ...Flex({ alignItems: 'center', gap: 8 }), padding: '0 10px', height: 30, background: T.fill, borderBottom: `1.5px solid ${T.border}`, flexShrink: 0 }}>
        {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 9, background: T.border, borderRadius: 2 }} />)}
      </div>
      {[1,2,3].map(row => (
        <div key={row} style={{ ...Flex({ alignItems: 'center', gap: 8 }), padding: '0 10px', flex: 1, borderBottom: `1px solid ${T.fill}` }}>
          {[1,2,3].map((col, ci) => <div key={col} style={{ flex: 1, height: 7, background: T.fill, borderRadius: 2, opacity: [1,0.7,0.5][ci] }} />)}
        </div>
      ))}
    </div>
  );
}

export function ListItem() {
  return (
    <div style={{ ...Full, border: `1.5px solid ${T.border}`, borderRadius: 5, padding: '0 12px', ...Flex({ alignItems: 'center', gap: 10 }) }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: T.fill, border: `1.5px solid ${T.border}`, flexShrink: 0 }} />
      <div style={{ flex: 1, ...Col({ gap: 5 }) }}>
        <div style={T.line('75%')} />
        <div style={T.line('50%', 0.5)} />
      </div>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: T.fill, border: `1.5px solid ${T.border}`, flexShrink: 0 }} />
    </div>
  );
}

export function Pagination() {
  return (
    <div style={{ ...Full, ...Flex({ alignItems: 'center', justifyContent: 'center', gap: 5 }) }}>
      {['‹','1','2','3','›'].map((label, i) => (
        <div key={i} style={{ width: 30, height: 28, background: i === 1 ? T.border : T.fill, border: `1.5px solid ${T.border}`, borderRadius: 4, ...Flex({ alignItems: 'center', justifyContent: 'center' }), fontSize: 11, color: i === 1 ? 'white' : T.text }}>
          {label}
        </div>
      ))}
    </div>
  );
}

export function StatCard() {
  return (
    <div style={{ ...Full, background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 6, padding: 12, ...Col({ gap: 6, justifyContent: 'center' }) }}>
      <div style={{ width: '55%', height: 8, background: T.border, borderRadius: 2, opacity: 0.6 }} />
      <div style={{ width: '70%', height: 20, background: T.border, borderRadius: 3 }} />
      <div style={{ width: '35%', height: 8, background: T.border, borderRadius: 2, opacity: 0.4 }} />
    </div>
  );
}

// ── NOTIFIKASI ────────────────────────────────────────────
export function Alert() {
  return (
    <div style={{ ...Full, background: T.fill, border: `1.5px solid ${T.border}`, borderRadius: 5, ...Flex({ alignItems: 'center', padding: '0 10px', gap: 8 }) }}>
      <div style={{ width: 3, height: '60%', background: T.border, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ flex: 1, ...Col({ gap: 5 }) }}>
        <div style={T.line('60%')} />
        <div style={T.line('80%', 0.5)} />
      </div>
      <div style={{ width: 14, height: 14, background: 'rgba(0,0,0,0.1)', borderRadius: 3, flexShrink: 0 }} />
    </div>
  );
}

export function Toast() {
  return (
    <div style={{ ...Full, background: T.bg, border: `1.5px solid ${T.border}`, borderRadius: 8, ...Flex({ alignItems: 'center', padding: '0 12px', gap: 10 }), boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ width: 10, height: 10, background: T.border, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1, ...Col({ gap: 4 }) }}>
        <div style={T.line('70%')} />
        <div style={T.line('50%', 0.5)} />
      </div>
      <div style={{ width: 14, height: 14, background: 'rgba(0,0,0,0.1)', borderRadius: 3, flexShrink: 0 }} />
    </div>
  );
}

export function Tooltip() {
  return (
    <div style={{ ...Full, ...Col({ alignItems: 'center', justifyContent: 'center' }) }}>
      <div style={{ background: T.border, borderRadius: 5, padding: '8px 12px', width: '90%', ...Flex({ alignItems: 'center', justifyContent: 'center' }) }}>
        <div style={{ width: '75%', height: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
      </div>
      <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '7px 6px 0 6px', borderColor: `${T.border} transparent transparent transparent` }} />
    </div>
  );
}

// ── REGISTRY ──────────────────────────────────────────────
const REGISTRY: Record<string, React.ComponentType> = {
  'navbar': Navbar,
  'sidebar-el': SidebarEl,
  'tab-bar': TabBar,
  'footer': Footer,
  'breadcrumb': Breadcrumb,
  'hero': Hero,
  'card': Card,
  'grid-2': Grid2,
  'grid-3': Grid3,
  'modal': Modal,
  'divider': Divider,
  'accordion': Accordion,
  'heading': Heading,
  'text-block': TextBlock,
  'badge': Badge,
  'blockquote': Blockquote,
  'image': ImageEl,
  'avatar': Avatar,
  'video': VideoPlayer,
  'map': MapEl,
  'input': InputField,
  'textarea': Textarea,
  'select': SelectEl,
  'button': ButtonFilled,
  'btn-outline': ButtonOutline,
  'checkbox': Checkbox,
  'radio': RadioButton,
  'toggle': Toggle,
  'slider': Slider,
  'form': FormEl,
  'progress': ProgressBar,
  'table': Table,
  'list-item': ListItem,
  'pagination': Pagination,
  'stat-card': StatCard,
  'alert': Alert,
  'toast': Toast,
  'tooltip': Tooltip,
};

export function WireComponent({ compId }: { compId: string }) {
  const Comp = REGISTRY[compId];
  if (!Comp) {
    return (
      <div style={{ width:'100%', height:'100%', background:'#e2e0d9', border:'1.5px dashed #b8b5aa', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:4 }}>
        <span style={{ fontSize:10, color:'#5a5854', opacity:0.5, fontFamily:'monospace' }}>{compId}</span>
      </div>
    );
  }
  return <Comp />;
}