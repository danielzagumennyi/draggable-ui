import { isNumber } from "lodash-es";
import { Coordinates } from "../types";

export const isNumberValue = (value: unknown): value is number => {
  return isNumber(value) && !isNaN(value);
};

export const getRelativeMousePosition = (
  element: Element,
  e: MouseEvent
): Coordinates => {
  const rect = element.getBoundingClientRect();
  return { x: e.clientX - rect.x, y: e.clientY - rect.y };
};

export const isPointWithinRect = (
  point: Coordinates,
  rect: DOMRect
): boolean => {
  const { x, y } = point;
  const { top, left, bottom, right } = rect;
  return top <= y && y <= bottom && left <= x && x <= right;
};

export const preventDefault = (e: Event) => e.preventDefault();
