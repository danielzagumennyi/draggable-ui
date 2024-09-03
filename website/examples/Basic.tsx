import { useState } from "react";

import { DragBox } from "../../website/DragBox";
import { Coordinates, useDraggable } from "../../src";
import { Preview } from "../Preview";

export const Basic = () => {
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
    <Preview
      title="Basic"
      description="Basic"
      content={
        <DragBox
          {...listeners}
          data-dragging={dragging}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          {dragging ? "..." : " Drag Me!"}
        </DragBox>
      }
    />
  );
};
