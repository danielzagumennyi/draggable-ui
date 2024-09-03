import { useState } from "react";

import { DragBox } from "../../website/DragBox";

import styled from "styled-components";
import { IconArrowsMaximize } from "@tabler/icons-react";
import { Coordinates, useDraggable } from "../../src";
import { Preview } from "../Preview";

export const DragHandle = () => {
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
      title="DragHandle"
      description="DragHandle"
      content={
        <StyledDragBox
          style={{
            cursor: "auto",
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          <Button {...listeners}>
            <IconArrowsMaximize size={14} />
            {dragging ? "..." : "Drag Handle"}
          </Button>
        </StyledDragBox>
      }
    />
  );
};

const Button = styled.button<{ $active?: boolean }>`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  background-color: lightgray;
  display: flex;
  white-space: nowrap;
  gap: 4px;
`;

const StyledDragBox = styled(DragBox)`
  width: 200px;
`;
