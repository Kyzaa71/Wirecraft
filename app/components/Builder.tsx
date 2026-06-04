'use client';
import { useEffect, useCallback } from 'react';
import { DndContext, DragEndEvent, MouseSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { useWireStore, newId } from '../store/wireStore';
import { ComponentDef } from '../types';
import Header from './ui/Header';
import Sidebar from './sidebar/Sidebar';
import Canvas from './canvas/Canvas';
import PropsPanel from './panels/PropsPanel';

export default function Builder() {
  const { addElement, deleteElement, selectedId, undo, redo, canUndo, canRedo } = useWireStore();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  );

  /* ── KEYBOARD SHORTCUTS ── */
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
      deleteElement(selectedId);
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey && canUndo) {
      e.preventDefault(); undo();
    }
    if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey)) && canRedo) {
      e.preventDefault(); redo();
    }
  }, [selectedId, deleteElement, undo, redo, canUndo, canRedo]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  /* ── DROP HANDLER ── */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || over.id !== 'canvas') return;

    const data = active.data.current;
    if (data?.type !== 'component') return;

    const comp = data.comp as ComponentDef;

    // Get canvas DOM position
    const canvasEl = document.querySelector('[data-canvas]') as HTMLElement;
    if (!canvasEl) return;
    const cr = canvasEl.getBoundingClientRect();

    // Use drag delta to find drop position
    const { x: dx, y: dy } = event.delta;
    const activatorEvent = (event.activatorEvent as MouseEvent);
    const dropX = Math.max(0, Math.round(activatorEvent.clientX + dx - cr.left - comp.defaultW / 2));
    const dropY = Math.max(0, Math.round(activatorEvent.clientY + dy - cr.top - comp.defaultH / 2));

    addElement({
      id: newId(),
      compId: comp.id,
      name: comp.name,
      x: dropX,
      y: dropY,
      w: comp.defaultW,
      h: comp.defaultH,
      zIndex: 1,
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <CanvasWithAttr />
          <PropsPanel />
        </div>
      </div>
      <DragOverlay dropAnimation={null} />
    </DndContext>
  );
}

// Wrap Canvas to inject data-canvas attr
function CanvasWithAttr() {
  return (
    <div className="flex-1 overflow-hidden relative" data-canvas-wrapper>
      <CanvasInner />
    </div>
  );
}

function CanvasInner() {
  return <Canvas />;
}