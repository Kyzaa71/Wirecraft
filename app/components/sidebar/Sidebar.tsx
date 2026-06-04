'use client';
import { useState } from 'react';
import { Search, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../../lib/components';
import ComponentItem from './ComponentItem';

export default function Sidebar() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(i =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  const totalComponents = CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <aside className="w-[220px] shrink-0 flex flex-col border-r border-border bg-surface overflow-hidden">

      {/* ── Header ── */}
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <LayoutGrid size={13} className="text-text3" />
            <span className="text-[11px] font-semibold text-wk-text tracking-wide">Komponen</span>
          </div>
          <span className="text-[10px] font-mono bg-border2/30 text-text3 px-1.5 py-0.5 rounded-full border border-border">
            {totalComponents}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text3 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari komponen..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full h-8 pl-7 pr-3 text-[11.5px] bg-bg border border-border rounded-lg text-wk-text placeholder:text-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
          />
        </div>
      </div>

      {/* ── Category pills (only when not searching) ── */}
      {!query && (
        <div className="flex gap-1 px-3 py-2 overflow-x-auto border-b border-border scrollbar-none">
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
              activeCategory === null
                ? 'bg-wk-text text-white border-wk-text'
                : 'bg-transparent text-text2 border-border hover:border-border2 hover:text-wk-text'
            }`}
          >
            Semua
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                activeCategory === cat.name
                  ? 'bg-wk-text text-white border-wk-text'
                  : 'bg-transparent text-text2 border-border hover:border-border2 hover:text-wk-text'
              }`}
            >
              {cat.name.split(' ')[0]}
            </button>
          ))}
        </div>
      )}

      {/* ── Component list ── */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-2">
            <Search size={20} className="text-text3 opacity-40" />
            <p className="text-[11px] text-text3">Tidak ditemukan</p>
          </div>
        )}

        {filtered
          .filter(cat => !activeCategory || cat.name === activeCategory)
          .map((cat, ci) => (
          <div key={cat.name} className={ci > 0 ? 'border-t border-border/60' : ''}>
            {/* Category header */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
              <span className="text-[9px] font-bold text-text3 uppercase tracking-[0.1em]">
                {cat.name}
              </span>
              <div className="flex-1 h-px bg-border/60" />
              <span className="text-[9px] font-mono text-text3/70">{cat.items.length}</span>
            </div>

            {/* Items */}
            <div className="pb-1">
              {cat.items.map(comp => (
                <ComponentItem key={comp.id} comp={comp} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-2.5 border-t border-border bg-bg/50">
        <p className="text-[10px] text-text3 text-center leading-tight">
          Seret komponen ke kanvas
        </p>
      </div>
    </aside>
  );
}