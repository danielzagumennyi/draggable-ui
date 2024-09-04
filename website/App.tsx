import styled, { createGlobalStyle } from "styled-components";
import { StickyWidget } from "../src/components/StickyWidget";
import { Basic } from "./examples/Basic";
import { BoundsByParent } from "./examples/BoundsByParent";
import { DragHandle } from "./examples/DragHandle";
import { OneAxis } from "./examples/OneAxis";
import { Slider } from "./examples/Slider";
import { SnapToGrid } from "./examples/SnapToGrid";
import { Widget } from "./examples/Widget";
import { IconBallBasketball } from "@tabler/icons-react";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: relative;
    min-width: 320px;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <Title>Draggable UI</Title>
        <Description>
          A toolkit for React to create draggable elements
        </Description>
      </Header>
      <Container>
        <Basic />
        <SnapToGrid />
        <OneAxis />
        <BoundsByParent />
        <Slider />
        <DragHandle />
        <Widget />
      </Container>
      <StickyWidget>
        <WidgetCircle>
          <IconBallBasketball size={48} strokeWidth={1} />
        </WidgetCircle>
      </StickyWidget>
    </>
  );
}

const WidgetCircle = styled.div`
  border-radius: 48px;
  width: 48px;
  height: 48px;
  color: white;
  background-color: tomato;
`;

const Header = styled.header`
  height: 500px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Title = styled.h1`
  color: white;
`;

const Description = styled.p`
  color: lightgray;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  flex-direction: column;
  gap: 24px;
  padding: 48px 16px;
`;

export default App;
