import { useState } from "react";
import styled from "styled-components";
import { useDraggable } from "../hooks/useDraggable";
import { DragBox } from "../DragBox";
import { Preview } from "../Preview";

const roundToNearest = (num: number, num2: number) =>
  Math.round(num / num2) * num2;

const gridSize = 20;

export const SnapToGrid = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const { listeners } = useDraggable({
    onStart: () => {
      setDragging(true);
      setStartPos(pos);
    },
    onMove: ({ deltaX, deltaY }) => {
      setPos({
        x: roundToNearest(startPos.x + deltaX, gridSize),
        y: roundToNearest(startPos.y + deltaY, gridSize),
      });
    },
    onEnd: () => {
      setDragging(false);
    },
  });

  return (
    <StyledPreview
      title="SnapToGrid"
      description="SnapToGrid"
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

const StyledPreview = styled(Preview)`
  ${Preview.Content} {
    background-image: linear-gradient(0deg, lightgray 1px, transparent 1px),
      linear-gradient(90deg, lightgray 1px, transparent 1px);
    background-size: ${gridSize}px ${gridSize}px;
  }
`;
