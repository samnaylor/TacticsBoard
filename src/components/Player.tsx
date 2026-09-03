import { PointerSensor, useDraggable, useDroppable } from "@dnd-kit/react";
import { PointerActivationConstraints } from "@dnd-kit/dom";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useMemo, useRef } from "react";
import { useTacticsState } from "../store/tactics";
import PlayerToken from "./PlayerToken";

const sensors = [
  PointerSensor.configure({
    activationConstraints: [
      new PointerActivationConstraints.Distance({
        value: 4,
      }),
    ],
  }),
];

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

  const modifiers = useMemo(
    () => [
      RestrictToElement.configure({
        element: restrictionRef.current,
      }),
    ],
    [restrictionRef],
  );

  const { ref: draggableRef } = useDraggable({
    id: slot,
    disabled: !dndEnabled,
    modifiers,
    sensors,
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
    <PlayerToken
      ref={(node) => {
        draggableRef(node);
        droppableRef(node);
      }}
      number={number}
      label={modified ? name : `Player ${slot + 1}`}
      colourScheme={colourScheme}
      selected={selected}
      position={position}
      tabIndex={0}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
};

export default Player;
