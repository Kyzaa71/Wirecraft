'use client';
import { useDraggable } from '@dnd-kit/core';
import { ComponentDef } from '../../types';
import { getThumbSVG } from '../../lib/templates';

export default function ComponentItem({ comp }: { comp: ComponentDef }) {
  const { attributes, listeners, setNodeRef, isDragging, active } = useDraggable({
    id: `comp-${comp.id}`,
    data: { type: 'component', comp },
  });

  const isDraggingThis = active?.id === `comp-${comp.id}`;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ opacity: isDraggingThis ? 0.35 : 1 }}
      className="group relative flex items-center gap-3 mx-2 mb-0.5 px-2.5 py-2 cursor-grab active:cursor-grabbing select-none rounded-lg border border-transparent hover:border-border hover:bg-surface2 hover:shadow-sm transition-all duration-100"
    >
      {/* Drag indicator */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.75 opacity-0 group-hover:opacity-40 transition-opacity">
        <div className="w-0.75 h-0.75 rounded-full bg-text3" />
        <div className="w-0.75 h-0.75 rounded-full bg-text3" />
        <div className="w-0.75 h-0.75 rounded-full bg-text3" />
      </div>

      {/* Thumbnail */}
      <div
        className="shrink-0 rounded-md overflow-hidden border border-border/70 shadow-sm bg-surface"
        dangerouslySetInnerHTML={{ __html: getThumbSVG(comp.thumb) }}
      />

      {/* Name */}
      <span className="text-[11.5px] text-wk-text leading-tight font-medium group-hover:text-accent transition-colors">
        {comp.name}
      </span>
    </div>
  );
}