import { clamp } from "lodash-es";
import { Coordinates } from "../types";

export const getCenterPosition = (
  element: Element,
  container: Element
): Coordinates => {
  const boxRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    x: containerRect.width / 2 - boxRect.width / 2,
    y: containerRect.height / 2 - boxRect.height / 2,
  };
};

export const getLeftPosition = (
  element: Element,
  container: Element
): Coordinates => {
  const boxRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    x: 0,
    y: containerRect.height / 2 - boxRect.height / 2,
  };
};

export const boundByContainer = (
  coords: Coordinates,
  element: Element,
  container: Element
): Coordinates => {
  const boxRect = element.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();
  const maxWidth = parentRect.width - boxRect.width;
  const maxHeight = parentRect.height - boxRect.height;

  return {
    x: clamp(coords.x, 0, maxWidth),
    y: clamp(coords.y, 0, maxHeight),
  };
};

const SideList = ["top", "bottom", "left", "right"] as const;
export type Side = (typeof SideList)[number];

export function gerMargins(child: Element, container: Element) {
  const childRect = child.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  const distances: Array<{ side: Side; margin: number }> = [
    { side: "top", margin: Math.abs(childRect.top - parentRect.top) },
    { side: "bottom", margin: Math.abs(parentRect.bottom - childRect.bottom) },
    { side: "left", margin: Math.abs(childRect.left - parentRect.left) },
    { side: "right", margin: Math.abs(parentRect.right - childRect.right) },
  ];

  return distances.sort((a, b) => a.margin - b.margin);
}

export const snapToGrid = (coords: Coordinates, gridSize: number) => {
  return {
    x: roundToNearest(coords.x, gridSize),
    y: roundToNearest(coords.y, gridSize),
  };
};

const roundToNearest = (num: number, num2: number) =>
  Math.round(num / num2) * num2;
