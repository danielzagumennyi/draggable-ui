import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { DragBox } from "../../website/DragBox";
import { useDraggable } from "../../src";
import { Preview } from "../Preview";
import { getCenterPosition } from "../../src/helpers/position";

export const OneAxis = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [axis, setAxis] = useState("x");

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
      setPos((prev) => {
        if (axis === "x") {
          return { x: prev.x + moveX, y: prev.y };
        }
        if (axis === "y") {
          return { x: prev.x, y: prev.y + moveY };
        }
        return prev;
      });
    },
    onEnd: () => {
      setDragging(false);
    },
  });

  return (
    <Preview
      title="One Axis"
      description="Drag an element along only one axis at a time."
      content={
        <Content ref={containerRef}>
          <Switch>
            <Button $active={axis === "x"} onClick={() => setAxis("x")}>
              X axis
            </Button>
            <Button $active={axis === "y"} onClick={() => setAxis("y")}>
              Y axis
            </Button>
          </Switch>
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

const Switch = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
`;

const Button = styled.button<{ $active?: boolean }>`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  background-color: lightgray;

  ${(p) =>
    p.$active &&
    css`
      background-color: black;
      color: white;
    `}
`;
