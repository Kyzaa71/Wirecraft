'use client';
import { useRef, useCallback } from 'react';
import { WireElement } from '../../types';
import { WireComponent } from './WireComponents';
import { useWireStore } from '../../store/wireStore';

interface Props {
  el: WireElement;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

type ResizeDir = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';

export default function WireElementComp({ el, canvasRef }: Props) {
  const { selectedId, selectElement, updateElement, deleteElement } = useWireStore();
  const selected = selectedId === el.id;
  const elRef = useRef<HTMLDivElement>(null);

  const onMouseDownMove = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.dataset.resize || target.dataset.del) return;
    e.stopPropagation();
    selectElement(el.id);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const cr = canvas.getBoundingClientRect();
    const startX = e.clientX - cr.left - el.x;
    const startY = e.clientY - cr.top - el.y;

    const onMove = (mv: MouseEvent) => {
      updateElement(el.id, {
        x: Math.max(0, Math.round(mv.clientX - cr.left - startX)),
        y: Math.max(0, Math.round(mv.clientY - cr.top - startY)),
      });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [el, canvasRef, selectElement, updateElement]);

  const onMouseDownResize = useCallback((e: React.MouseEvent, dir: ResizeDir) => {
    e.stopPropagation();
    e.preventDefault();
    const { x: ox, y: oy, w: ow, h: oh } = el;
    const sx = e.clientX, sy = e.clientY;

    const onMove = (mv: MouseEvent) => {
      const dx = mv.clientX - sx, dy = mv.clientY - sy;
      let nx = ox, ny = oy, nw = ow, nh = oh;
      if (dir.includes('e')) nw = Math.max(40, ow + dx);
      if (dir.includes('s')) nh = Math.max(24, oh + dy);
      if (dir.includes('w')) { nw = Math.max(40, ow - dx); nx = ox + ow - nw; }
      if (dir.includes('n')) { nh = Math.max(24, oh - dy); ny = oy + oh - nh; }
      updateElement(el.id, { x: Math.round(nx), y: Math.round(ny), w: Math.round(nw), h: Math.round(nh) });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [el, updateElement]);

  const hs = 8;
  const handles: { dir: ResizeDir; style: React.CSSProperties }[] = [
    { dir: 'nw', style: { top: -hs/2, left: -hs/2, cursor: 'nw-resize' } },
    { dir: 'ne', style: { top: -hs/2, right: -hs/2, cursor: 'ne-resize' } },
    { dir: 'sw', style: { bottom: -hs/2, left: -hs/2, cursor: 'sw-resize' } },
    { dir: 'se', style: { bottom: -hs/2, right: -hs/2, cursor: 'se-resize' } },
    { dir: 'n',  style: { top: -hs/2, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize' } },
    { dir: 's',  style: { bottom: -hs/2, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize' } },
    { dir: 'e',  style: { right: -hs/2, top: '50%', transform: 'translateY(-50%)', cursor: 'e-resize' } },
    { dir: 'w',  style: { left: -hs/2, top: '50%', transform: 'translateY(-50%)', cursor: 'w-resize' } },
  ];

  return (
    <div
      ref={elRef}
      style={{
        position: 'absolute',
        left: el.x, top: el.y,
        width: el.w, height: el.h,
        zIndex: el.zIndex,
        cursor: 'move',
      }}
      onMouseDown={onMouseDownMove}
      onClick={e => { e.stopPropagation(); selectElement(el.id); }}
    >
      {/* Component */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        outline: selected ? '2px solid #2563eb' : '1.5px solid transparent',
        outlineOffset: selected ? 1 : 0,
        boxShadow: selected ? '0 0 0 3px rgba(37,99,235,0.12)' : undefined,
        transition: 'outline 0.1s',
      }}>
        <WireComponent compId={el.compId} />
      </div>

      {/* Hover ring (shown via parent hover) */}
      {!selected && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 3,
          pointerEvents: 'none',
          outline: '1.5px solid transparent',
          transition: 'outline 0.1s',
        }}
          className="wf-hover-ring"
        />
      )}

      {/* Resize handles */}
      {selected && handles.map(h => (
        <div
          key={h.dir}
          data-resize={h.dir}
          style={{
            position: 'absolute',
            width: hs, height: hs,
            background: 'white',
            border: '2px solid #2563eb',
            borderRadius: 2,
            zIndex: 10,
            ...h.style,
          }}
          onMouseDown={e => onMouseDownResize(e, h.dir)}
        />
      ))}

      {/* Delete */}
      {selected && (
        <button
          data-del="true"
          style={{
            position: 'absolute', top: -10, right: -10,
            width: 20, height: 20,
            background: '#dc2626',
            border: '2px solid white',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 20, cursor: 'pointer',
          }}
          onClick={e => { e.stopPropagation(); deleteElement(el.id); }}
        >
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}

      {/* Size label */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: -22, left: 0,
          background: '#1a1916', color: 'white',
          fontSize: 9, fontFamily: 'monospace',
          padding: '2px 6px', borderRadius: 3,
          whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 20,
        }}>
          {el.w} × {el.h}
        </div>
      )}
    </div>
  );
}