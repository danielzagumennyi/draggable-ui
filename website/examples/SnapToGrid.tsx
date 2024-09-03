import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DragBox } from "../../website/DragBox";
import { Coordinates, useDraggable } from "../../src";
import { Preview } from "../Preview";
import { getCenterPosition, snapToGrid } from "../../src/helpers/position";

const gridSize = 20;

export const SnapToGrid = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;
    setPos(
      snapToGrid(
        getCenterPosition(boxRef.current, containerRef.current),
        gridSize
      )
    );
  }, []);

  const { listeners } = useDraggable({
    onStart: () => {
      setDragging(true);
      setStartPos(pos);
    },
    onMove: ({ deltaX, deltaY }) => {
      const coords: Coordinates = {
        x: startPos.x + deltaX,
        y: startPos.y + deltaY,
      };

      setPos(snapToGrid(coords, gridSize));
    },
    onEnd: () => {
      setDragging(false);
    },
  });

  return (
    <StyledPreview
      title="Snap to Grid"
      description="Binding the movement of an element to the grid."
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

const StyledPreview = styled(Preview)`
  ${Preview.Content} {
    background-image: linear-gradient(0deg, lightgray 1px, transparent 1px),
      linear-gradient(90deg, lightgray 1px, transparent 1px);
    background-size: ${gridSize}px ${gridSize}px;
  }
`;
