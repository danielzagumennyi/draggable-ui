import { useEffect, useRef } from "react";
import { isPointWithinRect } from "../helpers/helpers";
import { getEventCoordinates } from "../helpers/coordinates/getEventCoordinates";
import { useEvent } from "./useEvent";

export type useConnectableProps = () => boolean;

export const useOver = <T extends HTMLElement>({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) => {
  const ref = useRef<T>(null);
  const mounted = useRef<boolean>(false);
  const frame = useRef(0);

  const handleChange = useEvent(onChange);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (mounted.current && ref.current) {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;

          const coords = getEventCoordinates(event);
          if (!coords) return;

          const isWithin = isPointWithinRect(coords, rect);

          handleChange(isWithin);
        }
      });
    };

    const onCancel = () => {
      handleChange(false);
    };

    const bind = () => {
      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onCancel);
    };

    const unbind = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onCancel);
    };

    if (enabled) {
      bind();
    } else {
      return unbind;
    }
  }, [enabled, handleChange]);

  return { ref };
};
