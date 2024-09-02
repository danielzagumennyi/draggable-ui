import { DragEventHandler, useCallback, useRef } from "react";
import { getEventCoordinates } from "../helpers/coordinates/getEventCoordinates";
import { Coordinates } from "../helpers/coordinates/types";
import { useEvent } from "./useEvent";

export type EventData = {
  deltaX: number;
  deltaY: number;
  moveX: number;
  moveY: number;
  event: PointerEvent;
  coords: Coordinates;
};

export const useDraggable = ({
  onStart,
  onMove,
  onEnd,
}: {
  onStart?: (data: EventData) => void;
  onMove?: (data: EventData) => void;
  onEnd?: (data: EventData) => void;
}) => {
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
      coords,
      deltaX,
      deltaY,
      event,
      moveX,
      moveY,
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

    onEnd?.({
      coords,
      deltaX,
      deltaY,
      moveX,
      moveY,
      event,
    });
  });

  const handleStart = useEvent<React.PointerEventHandler>((event) => {
    const coords = getEventCoordinates(event.nativeEvent);
    if (!coords) return;

    startCoords.current = coords;
    prevCoords.current = coords;

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleEnd);

    onStart?.({
      coords,
      deltaX: 0,
      deltaY: 0,
      moveX: 0,
      moveY: 0,
      event: event.nativeEvent,
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
