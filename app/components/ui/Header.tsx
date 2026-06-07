'use client';

import {
  Monitor,
  Smartphone,
  Trash2,
  Download,
  Undo2,
  Redo2,
} from 'lucide-react';
import { useWireStore } from '../../store/wireStore';

export default function Header() {
  const {
    mode,
    setMode,
    clearCanvas,
    elements,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useWireStore();

  const handleExport = async () => {
    const canvas = document.querySelector(
      '[data-canvas]'
    ) as HTMLElement;

    if (!canvas) return;

    try {
      const { toPng } = await import('html-to-image');

      const dataUrl = await toPng(canvas, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });

      const a = document.createElement('a');
      a.download = `wireframe-${mode}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      alert('Export gagal. Coba lagi.');
    }
  };

  return (
    <header className="sticky top-0 z-50 h-14 shrink-0 border-b border-slate-200 bg-white/90 backdrop-blur-md px-5">
      <div className="flex h-full items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-slate-900 to-slate-700 shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="white"
            >
              <rect x="1" y="1" width="6" height="5" rx="1" />
              <rect x="9" y="1" width="6" height="5" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </div>

          <div className="leading-tight">
            <h1 className="text-[15px] font-bold text-slate-900">
              WireKit
            </h1>
            <p className="text-[11px] text-slate-500">
              Wireframe Builder
            </p>
          </div>
        </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-3">

              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Preview
              </span>

              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-100 p-1.5 shadow-sm">
                {[
                  { id: 'web', label: 'Desktop', Icon: Monitor },
                  { id: 'mobile', label: 'Mobile', Icon: Smartphone },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id as 'web' | 'mobile')}
                    className={`
                    flex items-center gap-2.5
                    rounded-xl
                    min-w-25 min-h-8
                    justify-center
                    px-6 py-2.5
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      mode === id
                        ? 'bg-white text-slate-900 shadow-md'
                        : 'text-slate-500 hover:text-slate-900'
                    }
                    `}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>

            </div>
          </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Elements Count */}
          <div className="flex h-9 px-5 min-w-20  justify-center items-center rounded-xl border border-slate-200 bg-slate-50 ">
            <span className="text-xs font-medium text-slate-600">
              {elements.length} Elements
            </span>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {/* Undo */}
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl border border-slate-200
              bg-white
              text-slate-600
              transition-all
              hover:bg-slate-50
              hover:text-slate-900
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Undo2 size={15} />
          </button>

          {/* Redo */}
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl border border-slate-200
              bg-white
              text-slate-600
              transition-all
              hover:bg-slate-50
              hover:text-slate-900
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Redo2 size={15} />
          </button>

          <div className="h-6 w-px bg-slate-200" />

          {/* Clear */}
          <button
            onClick={() => {
              if (
                confirm(
                  'Bersihkan semua elemen di kanvas?'
                )
              ) {
                clearCanvas();
              }
            }}
            className="
              flex h-9 items-center gap-2
              rounded-xl
              border border-slate-200
              bg-white
              px-4
              min-w-22  
              justify-center
              text-xs
              font-medium
              text-slate-600
              transition-all
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <Trash2 size={14} />
            Clear
          </button>

          {/* Export */}
          <button
            onClick={handleExport}
            className="
              flex h-9 items-center gap-2
              rounded-xl
              bg-linear-to-r
              from-slate-900
              to-slate-700
              px-5
              min-w-30  
              justify-center
              text-xs
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:scale-[1.02]
              hover:shadow-md
            "
          >
            <Download size={14} />
            Export PNG
          </button>
        </div>
      </div>
    </header>
  );
}
