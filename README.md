## Draggable UI

A toolkit for React to create draggable elements.

#### Installation

```
npm i draggable-ui
```

### useDraggable Hook

The `useDraggable` hook is a custom React hook designed to add draggable functionality to any component. It provides an interface to track and manage drag events, including the start, movement, and end of a drag operation.

#### Example

```typescript
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

import { useState } from "react";
import { useDraggable, Coordinates } from "draggable-ui";

const BasicExample = () => {
  const [pos, setPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const { listeners } = useDraggable({
    onStart: () => {
      setDragging(true);
    },
    onMove: ({ moveX, moveY }) => {
      setPos((prev) => ({ x: prev.x + moveX, y: prev.y + moveY }));
    },
    onEnd: () => {
      setDragging(false);
    },
  });

  return (
    <div
      {...listeners}
      style={{
        userSelect: "none",
        touchAction: "none",
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      {dragging ? "..." : " Drag Me!"}
    </div>
  );
};
```