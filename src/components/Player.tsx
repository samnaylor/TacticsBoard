import { PointerSensor, useDraggable, useDroppable } from "@dnd-kit/react";
import { PointerActivationConstraints } from "@dnd-kit/dom";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useRef } from "react";
import { useTacticsState } from "../store/tactics";
import { kitColours } from "../data";

interface Props {
  number: number;
  slot: number;
  position?: { x: number; y: number };
  restrictionRef: React.RefObject<HTMLDivElement | null>;
}

const Player = ({ number, slot, position, restrictionRef }: Props) => {
  const dndEnabled = useTacticsState((state) => state.dndEnabled);
  const { name, modified } = useTacticsState((state) => state.names)[slot];
  const selectedSlot = useTacticsState((state) => state.selectedSlot);
  const setSelectedSlot = useTacticsState((state) => state.setSelectedSlot);
  const setEditingPlayer = useTacticsState((state) => state.setEditingPlayer);
  const handlePlayerClick = useTacticsState((state) => state.handlePlayerClick);
  const colourScheme = useTacticsState((state) => state.colourScheme);

  const selected = selectedSlot === slot;

  const { ref: draggableRef } = useDraggable({
    id: slot,
    disabled: !dndEnabled,
    modifiers: [
      RestrictToElement.configure({
        element: restrictionRef.current,
      }),
    ],
    sensors: [
      PointerSensor.configure({
        activationConstraints: [
          new PointerActivationConstraints.Distance({
            value: 4,
          }),
        ],
      }),
    ],
  });
  const { ref: droppableRef } = useDroppable({
    id: slot,
    disabled: !dndEnabled,
  });

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);

  const handlePointerDown = () => {
    isLongPress.current = false;

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      longPressTimer.current = null;
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    if (isLongPress.current) {
      // Open only after the pointer interaction has completed.
      setTimeout(() => {
        setSelectedSlot(null);
        setEditingPlayer(slot);
      }, 0);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }

    handlePlayerClick(slot);
  };

  return (
    <div
      ref={(node) => {
        draggableRef(node);
        droppableRef(node);
      }}

      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}

      className={[
        "group touch-none select-none flex items-center justify-center flex-col",
        position
          ? "absolute z-10 -translate-x-1/2 -translate-y-1/2"
          : "relative flex shrink-0 flex-col items-center",
        selected ? `ring-4 ring-white/30 rounded-md` : "",
      ].join(" ")}

      style={
        position
          ? {
              left: `${position.x}%`,
              top: `${position.y}%`,
            }
          : undefined
      }
    >
      <div
        className={[
          "relative flex cursor-grab items-center justify-center",
          "rounded-full border-2",
          "font-bold text-white shadow-[0_3px_10px_rgba(0,0,0,.35)]",
          "transition-transform active:scale-95",
          "h-10 w-10 text-sm sm:h-11 sm:w-11 sm:text-base",
        ].join(" ")}

        style={{
          backgroundColor: kitColours[colourScheme].main,
          borderColor: kitColours[colourScheme].border,
        }}
      >
        {number}

        <div className="absolute inset-0 rounded-full border border-white/20" />
      </div>

      <div className="mt-1 max-w-24 truncate rounded-md bg-[#092016]/90 px-1.5 py-0.5 text-[8px] font-semibold leading-tight text-[#f1faf0] shadow-sm sm:max-w-28 sm:text-[10px]">
        {modified ? name : `Player ${slot + 1}`}
      </div>
    </div>
  );
};

export default Player;
