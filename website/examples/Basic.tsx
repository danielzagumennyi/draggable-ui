import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { DragBox } from "../../website/DragBox";
import { Coordinates, useDraggable } from "../../src";
import { Preview } from "../Preview";
import { getCenterPosition } from "../../src/helpers/position";

export const Basic = () => {
  const [pos, setPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;
    setPos(getCenterPosition(boxRef.current, containerRef.current));
  }, []);

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
        <Content ref={containerRef}>
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
        </Content>
      }
    />
  );
};

const Content = styled.div`
  height: 100%;
`;
