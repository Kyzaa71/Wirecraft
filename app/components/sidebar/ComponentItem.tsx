'use client';

import { useDraggable } from '@dnd-kit/core';
import { ComponentDef } from '../../types';
import { getThumbSVG } from '../../lib/templates';

export default function ComponentItem({
  comp,
}: {
  comp: ComponentDef;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    active,
  } = useDraggable({
    id: `comp-${comp.id}`,
    data: { type: 'component', comp },
  });

  const isDraggingThis =
    active?.id === `comp-${comp.id}`;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: isDraggingThis ? 0.35 : 1,
      }}
      className="
        group
        relative
        flex
        items-center
        gap-4
        mx-2
        px-4
        py-3.5
        rounded-xl
        cursor-grab
        active:cursor-grabbing
        select-none

        border border-transparent
        bg-white

        hover:bg-slate-50
        hover:border-slate-200
        hover:shadow-sm

        transition-all
      "
    >
      {/* Drag dots */}
      <div
        className="
          absolute
          left-2
          top-1/2
          -translate-y-1/2

          flex
          flex-col
          gap-1

          opacity-0
          group-hover:opacity-40

          transition-opacity
        "
      >
        <div className="w-1 h-1 rounded-full bg-slate-400" />
        <div className="w-1 h-1 rounded-full bg-slate-400" />
        <div className="w-1 h-1 rounded-full bg-slate-400" />
      </div>

      {/* Thumbnail */}
      <div
        className="
          shrink-0

          flex
          items-center
          justify-center

          w-14
          h-14

          rounded-xl
          border
          border-slate-200

          bg-slate-50
          overflow-hidden
        "
        dangerouslySetInnerHTML={{
          __html: getThumbSVG(comp.thumb),
        }}
      />

      {/* Content */}
      <div className="flex flex-col min-w-0">

        <h4
          className="
            text-sm
            font-semibold
            text-slate-800
            truncate
          "
        >
          {comp.name}
        </h4>

       
      </div>
    </div>
  );
}