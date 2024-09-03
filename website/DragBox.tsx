import styled from "styled-components";

export const DragBox = styled.div`
  border-radius: 4px;
  touch-action: none;
  user-select: none;
  width: 100px;
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  cursor: grab;
  font-size: 14px;
  font-weight: bold;
  text-align: center;

  &[data-dragging="true"] {
    background-color: tomato;
  }
`;
