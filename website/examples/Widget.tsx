import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Coordinates, useDraggable } from "../../src";
import {
  boundByContainer,
  gerMargins,
  getLeftPosition,
} from "../../src/helpers/position";
import { DragBox } from "../DragBox";
import { Preview } from "../Preview";

export const Widget = () => {
  const [pos, setPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;
    setPos(getLeftPosition(boxRef.current, containerRef.current));
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

      if (!boxRef.current || !containerRef.current) return;

      const margins = gerMargins(boxRef.current, containerRef.current);
      const closetSide = margins[0]?.side;

      const boxRect = boxRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      boxRef.current.style.transition = "all 0.2s ease";
      const animationListener = () => {
        boxRef.current!.style.transition = "";
        boxRef.current?.removeEventListener("transitionend", animationListener);
      };
      boxRef.current.addEventListener("transitionend", animationListener);

      setPos((prev) => ({
        x:
          closetSide === "left"
            ? 0
            : closetSide === "right"
            ? containerRect.width - boxRect.width
            : prev.x,
        y:
          closetSide === "top"
            ? 0
            : closetSide === "bottom"
            ? containerRect.height - boxRect.height
            : prev.y,
      }));
    },
  });

  return (
    <Preview
      title="Sticky Widget"
      description="Widget sticks to the nearest side of the container."
      content={
        <Content ref={containerRef}>
          <StyledDragBox
            ref={boxRef}
            {...listeners}
            data-dragging={dragging}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
            }}
          >
            {dragging ? "..." : " Drag Me!"}
          </StyledDragBox>
        </Content>
      }
    />
  );
};

const Content = styled.div`
  height: 100%;
`;

const StyledDragBox = styled(DragBox)``;
