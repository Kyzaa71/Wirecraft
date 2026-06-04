'use client';
import { useWireStore } from '../../store/wireStore';
import { MousePointer2, Trash2, Copy, ArrowUp, ArrowDown } from 'lucide-react';

function PropInput({ label, value, onChange, unit = 'px' }: {
  label: string; value: number;
  onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[var(--text2)] w-12 flex-shrink-0">{label}</span>
      <div className="flex flex-1 items-stretch">
        <input
          type="number"
          value={value}
          onChange={e => onChange(parseInt(e.target.value) || 0)}
          className="flex-1 min-w-0 h-7 border border-[var(--border)] border-r-0 rounded-l-md bg-[var(--bg)] px-2 text-xs text-[var(--text)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <span className="h-7 px-2 bg-[var(--surface2)] border border-[var(--border)] rounded-r-md text-[11px] text-[var(--text3)] flex items-center flex-shrink-0">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function PropsPanel() {
  const { elements, selectedId, updateElement, deleteElement, duplicateElement, bringForward, sendBackward } = useWireStore();
  const el = elements.find(e => e.id === selectedId);

  return (
    <aside className="w-[248px] flex-shrink-0 border-l border-[var(--border)] bg-[var(--surface)] flex flex-col overflow-hidden">
      <div className="px-3 py-2.5 border-b border-[var(--border)] flex items-center justify-between">
        <span className="text-[10px] font-mono font-medium text-[var(--text3)] uppercase tracking-widest">
          Properti
        </span>
        {el && (
          <span className="text-[10px] font-mono text-[var(--text3)] bg-[var(--bg)] border border-[var(--border)] px-2 py-0.5 rounded">
            {el.id.split('_')[0]}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!el ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-3">
            <MousePointer2 size={28} className="text-[var(--text3)] opacity-30" />
            <p className="text-xs text-[var(--text3)] leading-relaxed">
              Klik elemen di kanvas untuk melihat dan mengubah propertinya
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-5">
            {/* Component info */}
            <div>
              <p className="text-[9.5px] font-mono font-medium text-[var(--text3)] uppercase tracking-widest mb-2">Komponen</p>
              <div className="bg-[var(--surface2)] rounded-md px-3 py-2 border border-[var(--border)]">
                <p className="text-sm font-medium text-[var(--text)]">{el.name}</p>
                <p className="text-[10px] font-mono text-[var(--text3)] mt-0.5">{el.id}</p>
              </div>
            </div>

            {/* Position */}
            <div>
              <p className="text-[9.5px] font-mono font-medium text-[var(--text3)] uppercase tracking-widest mb-2">Posisi</p>
              <div className="space-y-1.5">
                <PropInput label="X" value={el.x} onChange={v => updateElement(el.id, { x: v })} />
                <PropInput label="Y" value={el.y} onChange={v => updateElement(el.id, { y: v })} />
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[9.5px] font-mono font-medium text-[var(--text3)] uppercase tracking-widest mb-2">Ukuran</p>
              <div className="space-y-1.5">
                <PropInput label="Lebar" value={el.w} onChange={v => updateElement(el.id, { w: Math.max(40, v) })} />
                <PropInput label="Tinggi" value={el.h} onChange={v => updateElement(el.id, { h: Math.max(24, v) })} />
              </div>
            </div>

            {/* Layer */}
            <div>
              <p className="text-[9.5px] font-mono font-medium text-[var(--text3)] uppercase tracking-widest mb-2">Layer</p>
              <div className="flex gap-2">
                <button
                  onClick={() => bringForward(el.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs bg-[var(--bg)] border border-[var(--border)] rounded-md hover:bg-[var(--surface2)] transition-colors text-[var(--text2)]"
                >
                  <ArrowUp size={12}/> Ke Depan
                </button>
                <button
                  onClick={() => sendBackward(el.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs bg-[var(--bg)] border border-[var(--border)] rounded-md hover:bg-[var(--surface2)] transition-colors text-[var(--text2)]"
                >
                  <ArrowDown size={12}/> Ke Belakang
                </button>
              </div>
            </div>

            {/* Actions */}
            <div>
              <p className="text-[9.5px] font-mono font-medium text-[var(--text3)] uppercase tracking-widest mb-2">Aksi</p>
              <div className="space-y-2">
                <button
                  onClick={() => duplicateElement(el.id)}
                  className="w-full flex items-center justify-center gap-2 h-8 text-xs bg-[var(--bg)] border border-[var(--border)] rounded-md hover:bg-[var(--surface2)] transition-colors text-[var(--text)]"
                >
                  <Copy size={12}/> Duplikat
                </button>
                <button
                  onClick={() => deleteElement(el.id)}
                  className="w-full flex items-center justify-center gap-2 h-8 text-xs bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors text-red-600"
                >
                  <Trash2 size={12}/> Hapus Elemen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}