import { PointerSensor, useDraggable, useDroppable } from "@dnd-kit/react";
import { PointerActivationConstraints } from "@dnd-kit/dom";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useEffect, useMemo, useRef } from "react";
import { useTacticsState } from "../store/state";
import PlayerToken from "./PlayerToken";
import { playerLabel } from "../utils";

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
  const dragDropEnabled = useTacticsState((state) => state.dragDropEnabled);
  const customName = useTacticsState((state) => state.customNames[slot]);
  const selected = useTacticsState(
    (state) =>
      state.playerInteraction.type === "selected" &&
      state.playerInteraction.slot === slot,
  );
  const openPlayerEditor = useTacticsState((state) => state.openPlayerEditor);
  const selectOrSwapPlayer = useTacticsState(
    (state) => state.selectOrSwapPlayer,
  );
  const colourScheme = useTacticsState((state) => state.colourScheme);

  const modifiers = useMemo(
    () => [
      RestrictToElement.configure({
        element: restrictionRef.current,
      }),
    ],
    [restrictionRef],
  );

  const { ref: draggableRef, isDragging } = useDraggable({
    id: slot,
    disabled: !dragDropEnabled,
    modifiers,
    sensors,
  });
  const { ref: droppableRef } = useDroppable({
    id: slot,
    disabled: !dragDropEnabled,
  });

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);

  useEffect(() => {
    if (isDragging && longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, [isDragging]);

  const handlePointerDown = () => {
    isLongPress.current = false;

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      longPressTimer.current = null;

      openPlayerEditor(slot);
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isLongPress.current || isDragging) {
      isLongPress.current = false;
      return;
    }

    selectOrSwapPlayer(slot);
  };

  return (
    <PlayerToken
      ref={(node) => {
        draggableRef(node);
        droppableRef(node);
      }}
      number={number}
      label={customName ?? playerLabel(slot)}
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
