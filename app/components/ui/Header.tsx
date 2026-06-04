'use client';
import { Monitor, Smartphone, Trash2, Download, Undo2, Redo2 } from 'lucide-react';
import { useWireStore } from '../../store/wireStore';

export default function Header() {
  const { mode, setMode, clearCanvas, elements, canUndo, canRedo, undo, redo } = useWireStore();

  const handleExport = async () => {
    const canvas = document.querySelector('[data-canvas]') as HTMLElement;
    if (!canvas) return;
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(canvas, { backgroundColor: '#ffffff', pixelRatio: 2 });
      const a = document.createElement('a');
      a.download = `wireframe-${mode}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      alert('Export gagal. Coba lagi.');
    }
  };

  return (
    <header className="h-12 flex-shrink-0 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-4 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[var(--text)] rounded-md flex items-center justify-center flex-shrink-0">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="white">
            <rect x="1" y="1" width="6" height="5" rx="1"/>
            <rect x="9" y="1" width="6" height="5" rx="1"/>
            <rect x="1" y="9" width="6" height="6" rx="1"/>
            <rect x="9" y="9" width="6" height="6" rx="1"/>
          </svg>
        </div>
        <span className="font-bold text-[15px] tracking-tight text-[var(--text)]"
          style={{ fontFamily: 'system-ui, sans-serif' }}>
          WireKit
        </span>
      </div>

      {/* Mode toggle */}
      <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg p-0.5">
        {([
          { id: 'web', label: 'Web', Icon: Monitor },
          { id: 'mobile', label: 'Mobile', Icon: Smartphone },
        ] as const).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === id
                ? 'bg-white text-[var(--text)] shadow-sm'
                : 'text-[var(--text2)] hover:text-[var(--text)]'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Element count */}
        <span className="text-[10px] font-mono text-[var(--text3)] bg-[var(--bg)] border border-[var(--border)] px-2 py-1 rounded-md">
          {elements.length} elemen
        </span>

        {/* Undo/Redo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
          className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text2)] hover:bg-[var(--surface2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Undo2 size={14} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
          className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text2)] hover:bg-[var(--surface2)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <Redo2 size={14} />
        </button>

        {/* Clear */}
        <button
          onClick={() => { if (confirm('Bersihkan semua elemen di kanvas?')) clearCanvas(); }}
          className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          <Trash2 size={13} /> Bersihkan
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-[var(--text)] text-white hover:bg-[#2d2b27] transition-colors"
        >
          <Download size={13} /> Export PNG
        </button>
      </div>
    </header>
  );
}