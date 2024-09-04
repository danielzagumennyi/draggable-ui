import {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import { Coordinates, useDraggable } from "../../src";
import {
  boundByContainer,
  gerMargins,
  getLeftPosition,
  setOffset,
} from "../../src/helpers/position";

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
  const [pos, setPos] = useState<Coordinates>(
    defaultValue || { x: offset, y: offset }
  );
  const [startPos, setStartPos] = useState<Coordinates>({ x: 0, y: 0 });

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;
    setPos(setOffset(getLeftPosition(boxRef.current, document.body), offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { listeners } = useDraggable({
    onStart: () => {
      setStartPos(pos);
    },
    onMove: ({ deltaX, deltaY }) => {
      if (!boxRef.current) return;

      setPos(
        boundByContainer(
          {
            x: startPos.x + deltaX,
            y: startPos.y + deltaY,
          },
          boxRef.current,
          document.body
        )
      );
    },
    onEnd: () => {
      if (!boxRef.current) return;

      const margins = gerMargins(boxRef.current, document.body);
      const closetSide = margins.filter(
        (el) => el.side === "left" || el.side === "right"
      )[0].side;

      const boxRect = boxRef.current.getBoundingClientRect();
      const containerRect = document.body.getBoundingClientRect();

      boxRef.current.style.transition = "transform 0.2s ease";
      const animationListener = () => {
        boxRef.current!.style.transition = "";
        boxRef.current?.removeEventListener("transitionend", animationListener);
      };
      boxRef.current.addEventListener("transitionend", animationListener);

      setPos((prev) => {
        const x =
          closetSide === "left"
            ? 0
            : closetSide === "right"
            ? containerRect.width - boxRect.width
            : prev.x;

        return setOffset({ x, y: prev.y }, offset);
      });
    },
  });

  return (
    <div
      ref={boxRef}
      {...listeners}
      style={{
        zIndex: 1000000,
        touchAction: "none",
        userSelect: "none",
        position: "fixed",
        top: 0,
        left: 0,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
