import { useDraggable, useDroppable } from "@dnd-kit/react";

interface Props {
  id: number;
  name: string;
  slotId: string;
  position?: { x: number; y: number; };
  compact?: boolean;
};

const Player = ({ id, name, slotId, position, compact = false }: Props) => {
  const { ref: draggableRef } = useDraggable({ id: slotId });
  const { ref: droppableRef } = useDroppable({ id: slotId });

  return (
    <div
      ref={node => {
        draggableRef(node);
        droppableRef(node);
      }}

      className={[
        "group select-none flex items-center justify-center flex-col",
        position
          ? "absolute z-10 -translate-x-1/2 -translate-y-1/2"
          : "relative flex shrink-0 flex-col items-center",
      ].join(" ")}

      style={
        position ? {
          left: `${position.x}%`,
          top: `${position.y}%`
        } : undefined
      }
    >
      <div
        className={[
          "relative flex cursor-grab items-center justify-center",
          "rounded-full border-2 border-amber-300 bg-blue-600",
          "font-bold text-white shadow-[0_3px_10px_rgba(0,0,0,.35)]",
          "transition-transform active:scale-95",
          compact
            ? "h-9 w-9 text-xs"
            : "h-10 w-10 text-sm sm:h-11 sm:w-11 sm:text-base",
        ].join(" ")}
      >
        {id}

        <div className="absolute inset-0 rounded-full border border-white/20" />
      </div>

      <div className="mt-1 max-w-24 truncate rounded-md bg-[#092016]/90 px-1.5 py-0.5 text-[9px] font-semibold leading-tight text-[#f1faf0] shadow-sm sm:max-w-28 sm:text-[10px]">
        {name}
      </div>

    </div>
  );

}

export default Player;
