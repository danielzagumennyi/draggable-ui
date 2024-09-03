import { useState } from "react";
import styled, { css } from "styled-components";
import { DragBox } from "../../website/DragBox";
import { useDraggable } from "../../src";
import { Preview } from "../Preview";

export const OneAxis = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [axis, setAxis] = useState("x");

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
      title="OneAxis"
      description="OneAxis"
      content={
        <>
          <Switch>
            <Button $active={axis === "x"} onClick={() => setAxis("x")}>
              X axis
            </Button>
            <Button $active={axis === "y"} onClick={() => setAxis("y")}>
              Y axis
            </Button>
          </Switch>
          <DragBox
            {...listeners}
            data-dragging={dragging}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          >
            {dragging ? "..." : " Drag Me!"}
          </DragBox>
        </>
      }
    />
  );
};

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
