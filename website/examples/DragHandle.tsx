import { useEffect, useRef, useState } from "react";

import { DragBox } from "../../website/DragBox";

import styled from "styled-components";
import { IconArrowsMaximize } from "@tabler/icons-react";
import { Coordinates, useDraggable } from "../../src";
import { Preview } from "../Preview";
import { getCenterPosition } from "../../src/helpers/position";

export const DragHandle = () => {
  const [pos, setPos] = useState<Coordinates>({ x: 0, y: 0 });

  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;
    setPos(getCenterPosition(boxRef.current, containerRef.current));
  }, []);

  const { listeners } = useDraggable({
    onMove: ({ moveX, moveY }) => {
      setPos((prev) => ({ x: prev.x + moveX, y: prev.y + moveY }));
    },
  });

  return (
    <Preview
      title="Drag Handle"
      description="Any element can be a drag handle."
      content={
        <Content ref={containerRef}>
          <StyledDragBox
            ref={boxRef}
            style={{
              cursor: "auto",
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          >
            <Button {...listeners}>
              <IconArrowsMaximize size={14} />
              Drag Handle
            </Button>
          </StyledDragBox>
        </Content>
      }
    />
  );
};

const Content = styled.div`
  height: 100%;
`;

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
