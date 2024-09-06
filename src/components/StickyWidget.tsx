import { CSSProperties, PropsWithChildren, useRef, useState } from "react";

import { Coordinates, useDraggable } from "../../src";
import { boundByContainer, gerMargins, Side } from "../../src/helpers/position";

export type StickyWidgetProps = PropsWithChildren<{
  offset?: number;
  defaultValue?: Coordinates;
  style?: CSSProperties;
}>;

export const StickyWidget = ({
  children,
  defaultValue,
  offset = 12,
  style,
}: StickyWidgetProps) => {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState<Coordinates>(defaultValue || { x: 0, y: 0 });
  const [startPos, setStartPos] = useState<Coordinates>({ x: 0, y: 0 });
  const [side, setSide] = useState<Side>("top");
  const [secondSide, setSecondSide] = useState<{ side: Side; margin: number }>({
    side: "left",
    margin: 0,
  });

  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { listeners } = useDraggable({
    onStart: () => {
      if (!boxRef.current) return;

      const boxRect = boxRef.current.getBoundingClientRect();

      const coords: Coordinates = {
        x: boxRect.x,
        y: boxRect.y,
      };

      setDragging(true);
      setStartPos(coords);
      setPos(coords);
    },
    onMove: ({ deltaX, deltaY }) => {
      if (!boxRef.current || !containerRef.current) return;

      const coords = boundByContainer(
        {
          x: startPos.x + deltaX,
          y: startPos.y + deltaY,
        },
        boxRef.current,
        containerRef.current
      );

      setPos(coords);
    },
    onEnd: () => {
      setDragging(false);
      const element = boxRef.current;
      if (!element || !containerRef.current) return;

      const margins = gerMargins(element, containerRef.current);

      // element.style.transition = "all 0.2s ease";
      // const animationListener = () => {
      //   element.style.transition = "";
      //   element.removeEventListener("transitionend", animationListener);
      // };
      // element.addEventListener("transitionend", animationListener);

      const closedSide = margins[0];
      setSide(closedSide.side);

      const horizontal: Side[] = ["left", "right"];
      const vertical: Side[] = ["top", "bottom"];

      const mainHorizontal = horizontal.includes(closedSide.side);

      const secondSide = margins.filter((s) => {
        return (mainHorizontal ? vertical : horizontal).includes(s.side);
      })[0];

      setSecondSide(secondSide);
    },
  });

  return (
    <>
      <div
        ref={containerRef}
        style={{
          top: 0,
          left: 0,
          height: "100dvh",
          width: "100dvw",
          position: "fixed",
          pointerEvents: "none",
        }}
      />
      <div
        ref={boxRef}
        {...listeners}
        style={{
          position: "fixed",
          ...style,
          touchAction: "none",
          userSelect: "none",
          ...(dragging
            ? {
                top: 0,
                left: 0,
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }
            : {
                [side]: offset,
                [secondSide.side]: secondSide.margin,
              }),
        }}
      >
        {children}
      </div>
    </>
  );
};
