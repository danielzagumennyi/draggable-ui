import { clamp } from "lodash-es";
import { useRef, useState } from "react";
import styled from "styled-components";
import { DragBox } from "../../website/DragBox";
import { useDraggable } from "../../src";
import { Preview } from "../Preview";

export const BoundsByParent = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const { listeners } = useDraggable({
    onStart: () => {
      setDragging(true);
      setStartPos(pos);
    },
    onMove: ({ deltaX, deltaY }) => {
      const parentRect = parentRef.current?.getBoundingClientRect();
      const boxRect = boxRef.current?.getBoundingClientRect();
      const maxWidth = (parentRect?.width || 0) - (boxRect?.width || 0);
      const maxHeight = (parentRect?.height || 0) - (boxRect?.height || 0);
      setPos({
        x: clamp(startPos.x + deltaX, 0, maxWidth),
        y: clamp(startPos.y + deltaY, 0, maxHeight),
      });
    },
    onEnd: () => {
      setDragging(false);
    },
  });

  return (
    <Preview
      title="BoundsByParent"
      description="BoundsByParent"
      content={
        <Parent ref={parentRef}>
          <DragBox
            ref={boxRef}
            {...listeners}
            data-dragging={dragging}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          >
            {dragging ? "..." : " Drag Me!"}
          </DragBox>
        </Parent>
      }
    />
  );
};

const Parent = styled.div`
  height: 100%;
`;
