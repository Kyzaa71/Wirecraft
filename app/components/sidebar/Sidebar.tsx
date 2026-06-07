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
    <aside className="w-72 shrink-0 flex flex-col border-r border-border bg-surface overflow-hidden">

        <div className="px-4 pt-4 pb-4 py-4 border-b border-slate-200">
          <div className="relative">

            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Cari komponen..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full
                h-10
                pl-10
                pr-4
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                text-sm
                text-slate-700
                placeholder:text-slate-400
                outline-none
                transition-all
                focus:bg-white
                focus:border-slate-300
              "
            />
          </div>
        </div>
              
              {/* ── Category pills (only when not searching) ── */}
            {!query && (
          <div className="px-4 py-3 border-b border-slate-200">
            <div className="flex gap-2 overflow-x-auto scrollbar-none">

              <button
                onClick={() => setActiveCategory(null)}
                className={`
                  whitespace-nowrap
                  px-4
                  h-7
                  min-w-16
                  rounded-full
                  text-xs
                  font-medium
                  transition-all
                  ${
                    activeCategory === null
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }
                `}
              >
                Semua
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.name ? null : cat.name
                    )
                  }
                  className={`
                    whitespace-nowrap
                    px-4
                    h-7
                    min-w-16
                    rounded-full
                    text-xs
                    font-medium
                    transition-all
                    ${
                      activeCategory === cat.name
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

      {/* ── Component list ── */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center gap-2">
            <Search size={20} className="text-text3 opacity-40" />
            <p className="text-[11px] text-text3">Tidak ditemukan</p>
          </div>
        )}

        {filtered
          .filter(cat => !activeCategory || cat.name === activeCategory)
          .map((cat, ci) => (
          <div key={cat.name} className={ci > 0 ? 'border-t border-border/60' : ''}>
            {/* Category header */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  {cat.name}
                </span>
              <div className="h-px flex-1 bg-border" />
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