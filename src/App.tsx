import styled, { createGlobalStyle } from "styled-components";
import { Basic } from "./examples/Basic";
import { BoundsByParent } from "./examples/BoundsByParent";
import { OneAxis } from "./examples/OneAxis";
import { Slider } from "./examples/Slider";
import { SnapToGrid } from "./examples/SnapToGrid";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
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
      </Container>
    </>
  );
}

const Header = styled.header`
  height: 500px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
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
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  gap: 24px;
`;

export default App;
