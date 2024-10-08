import { DragEventHandler, useCallback, useRef } from "react";
import { getEventCoordinates } from "../helpers/coordinates/getEventCoordinates";
import { Coordinates } from "../types";
import { useEvent } from "./useEvent";

export type DragEventData = {
  /** Total distance traveled along the X axis. */
  deltaX: number;
  /** Total distance traveled along the Y axis. */
  deltaY: number;
  /** Change in the X coordinate compared to the previous value. */
  moveX: number;
  /** Change in the Y coordinate compared to the previous value. */
  moveY: number;
  /** X and Y coordinates for mouse and touch events. */
  coords: Coordinates;
  /** Pointer event associated with the movement. */
  event: PointerEvent;
};

type UseDraggableProps = {
  onStart?: (data: DragEventData) => void;
  onMove?: (data: DragEventData) => void;
  onEnd?: (data: DragEventData) => void;
  grabCursor?: string;
};

export const useDraggable = ({
  onStart,
  onMove,
  onEnd,
  grabCursor = "grabbing",
}: UseDraggableProps) => {
  const startCoords = useRef<Coordinates>({ x: 0, y: 0 });
  const prevCoords = useRef<Coordinates>({ x: 0, y: 0 });

  const handleMove = useEvent((event: PointerEvent) => {
    const coords = getEventCoordinates(event);
    if (!coords) return;

    const deltaX = coords.x - startCoords.current.x;
    const deltaY = coords.y - startCoords.current.y;

    const moveX = coords.x - prevCoords.current.x;
    const moveY = coords.y - prevCoords.current.y;

    prevCoords.current = coords;

    onMove?.({
      deltaX,
      deltaY,
      event,
      moveX,
      moveY,
      coords,
    });
  });

  const handleEnd = useEvent((event: PointerEvent) => {
    const coords = getEventCoordinates(event);
    if (!coords) return;

    const deltaX = coords.x - startCoords.current.x;
    const deltaY = coords.y - startCoords.current.y;

    const moveX = prevCoords.current.x - coords.x;
    const moveY = prevCoords.current.y - coords.y;

    document.removeEventListener("pointermove", handleMove);
    document.removeEventListener("pointerup", handleEnd);
    document.removeEventListener("contextmenu", handleEnd);

    document.body.style.cursor = "";

    onEnd?.({
      deltaX,
      deltaY,
      moveX,
      moveY,
      event,
      coords,
    });
  });

  const handleStart = useEvent<React.PointerEventHandler>((event) => {
    const coords = getEventCoordinates(event.nativeEvent);
    if (!coords) return;

    startCoords.current = coords;
    prevCoords.current = coords;

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleEnd);
    document.addEventListener("contextmenu", handleEnd);

    document.body.style.cursor = grabCursor;

    onStart?.({
      deltaX: 0,
      deltaY: 0,
      moveX: 0,
      moveY: 0,
      event: event.nativeEvent,
      coords,
    });
  });

  const onDragStart = useCallback<DragEventHandler>(
    (e) => e.preventDefault(),
    []
  );

  return {
    listeners: { onPointerDown: handleStart, onDragStart },
  };
};
