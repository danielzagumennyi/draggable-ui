import { clamp } from "lodash-es";
import { useRef, useState } from "react";

import styled from "styled-components";
import { useDraggable } from "../hooks/useDraggable";
import { Preview } from "../Preview";

const size = 24;

export const Slider = () => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { listeners } = useDraggable({
    onStart: ({ coords }) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      if (rect.width) {
        const x = clamp((coords.x - rect.left) / rect.width, 0, 1);
        setValue(x);
      }
    },
    onMove: ({ coords }) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      if (rect.width) {
        const x = clamp((coords.x - rect.left) / rect.width, 0, 1);
        setValue(x);
      }
    },
  });

  return (
    <StyledPreview
      title="Slider"
      description="Slider"
      content={
        <Track
          ref={ref}
          {...listeners}
          style={{
            backgroundSize: `${value * 100}%`,
          }}
        >
          <Thumb
            style={{
              left: `calc(${value * 100}% - ${size / 2}px)`,
            }}
          />
        </Track>
      }
    />
  );
};

const StyledPreview = styled(Preview)`
  ${Preview.Content} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Track = styled.div`
  position: relative;
  width: 200px;
  height: ${size / 2}px;
  background: lightgray;
  border-radius: 6px;
`;

const Thumb = styled.div`
  touch-action: none;
  user-select: none;
  background-color: black;
  width: ${size}px;
  height: ${size}px;
  border-radius: ${size}px;
  position: absolute;
  top: 0;
  transform: translateY(-${size / 4}px);
  cursor: col-resize;
`;
