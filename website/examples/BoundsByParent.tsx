import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDraggable } from "../../src";
import {
  boundByContainer,
  getCenterPosition,
} from "../../src/helpers/position";
import { DragBox } from "../../website/DragBox";
import { Preview } from "../Preview";

export const BoundsByParent = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
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
      setStartPos(pos);
    },
    onMove: ({ deltaX, deltaY }) => {
      if (!boxRef.current || !containerRef.current) return;

      setPos(
        boundByContainer(
          {
            x: startPos.x + deltaX,
            y: startPos.y + deltaY,
          },
          boxRef.current,
          containerRef.current
        )
      );
    },
    onEnd: () => {
      setDragging(false);
    },
  });

  return (
    <Preview
      title="Bounds by Parent"
      description="The element's movement is limited by the parent's area."
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
