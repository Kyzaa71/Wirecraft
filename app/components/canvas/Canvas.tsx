'use client';
import { useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useWireStore } from '../../store/wireStore';
import WireElementComp from './WireElementComp';

export default function Canvas() {
  const { elements, mode, selectedId, selectElement } = useWireStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });

  const isEmpty = elements.length === 0;

  return (
    <div className="flex-1 overflow-auto bg-[#e8e6df] flex items-start justify-center p-8">
      <div className="flex flex-col items-center gap-2">
        {/* Label */}
        <p className="text-[10px] font-mono text-[var(--text3)] tracking-wide">
          {mode === 'web' ? '1024 × 768 · Web Browser' : '375 × 812 · Mobile'}
        </p>

        {/* Device shell */}
        {mode === 'mobile' ? (
          <MobileShell isOver={isOver} isEmpty={isEmpty} setNodeRef={setNodeRef} canvasRef={canvasRef} elements={elements} selectedId={selectedId} selectElement={selectElement} />
        ) : (
          <WebShell isOver={isOver} isEmpty={isEmpty} setNodeRef={setNodeRef} canvasRef={canvasRef} elements={elements} selectedId={selectedId} selectElement={selectElement} />
        )}
      </div>
    </div>
  );
}

function WebShell({ isOver, isEmpty, setNodeRef, canvasRef, elements, selectedId, selectElement }: any) {
  return (
    <div className="w-[1024px] max-w-[calc(100vw-560px)]">
      <div className="bg-[#1a1916] rounded-xl overflow-hidden shadow-2xl">
        {/* Browser bar */}
        <div className="bg-[#2d2b27] px-3 py-2 flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]"/>
            <div className="w-3 h-3 rounded-full bg-[#28c840]"/>
          </div>
          <div className="flex-1 h-5 bg-[#1a1916] rounded flex items-center px-2">
            <span className="text-[9px] font-mono text-[#4a4845]">wirekit.app/untitled</span>
          </div>
        </div>
        {/* Canvas */}
        <CanvasDrop
          isOver={isOver}
          isEmpty={isEmpty}
          setNodeRef={setNodeRef}
          canvasRef={canvasRef}
          elements={elements}
          selectedId={selectedId}
          selectElement={selectElement}
          minHeight={600}
          radius="0 0 8px 8px"
        />
      </div>
    </div>
  );
}

function MobileShell({ isOver, isEmpty, setNodeRef, canvasRef, elements, selectedId, selectElement }: any) {
  return (
    <div className="w-[375px]">
      <div className="bg-[#1a1916] rounded-[44px] p-3.5 shadow-2xl">
        {/* Notch */}
        <div className="w-24 h-6 bg-[#1a1916] rounded-b-2xl mx-auto -mb-0.5 z-10 relative flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#2d2b27] border border-[#3a3835]"/>
          <div className="w-1 h-1 rounded-full bg-[#2d2b27]"/>
        </div>
        {/* Canvas */}
        <CanvasDrop
          isOver={isOver}
          isEmpty={isEmpty}
          setNodeRef={setNodeRef}
          canvasRef={canvasRef}
          elements={elements}
          selectedId={selectedId}
          selectElement={selectElement}
          minHeight={700}
          radius="24px"
        />
        {/* Home bar */}
        <div className="w-28 h-1 bg-[#3a3835] rounded mx-auto mt-2"/>
      </div>
    </div>
  );
}

function CanvasDrop({ isOver, isEmpty, setNodeRef, canvasRef, elements, selectedId, selectElement, minHeight, radius }: any) {
  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        (canvasRef as any).current = node;
      }}
      className="relative bg-white overflow-hidden transition-all"
      data-canvas
      style={{
        minHeight,
        borderRadius: radius,
        outline: isOver ? '2px dashed #2563eb' : undefined,
        outlineOffset: isOver ? -2 : undefined,
      }}
      onClick={() => selectElement(null)}
    >
      {elements.map((el: any) => (
        <WireElementComp key={el.id} el={el} canvasRef={canvasRef} />
      ))}

      {/* Empty hint */}
      {isEmpty && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#c8c5bb" strokeWidth="1.5" className="mb-3">
            <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="4 2"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
          <p className="text-xs text-[var(--text3)] text-center leading-relaxed">
            Seret komponen dari sidebar<br/>ke sini untuk mulai
          </p>
        </div>
      )}
    </div>
  );
}