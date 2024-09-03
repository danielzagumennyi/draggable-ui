import { ReactNode } from "react";
import styled from "styled-components";

const _Preview = ({
  title,
  description,
  content,
  className,
}: {
  title: ReactNode;
  description: ReactNode;
  content: ReactNode;
  className?: string;
}) => {
  return (
    <Root className={className}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Display>
        <Header>
          <Dots>
            <Dot $color="red" />
            <Dot $color="orange" />
            <Dot $color="green" />
          </Dots>
        </Header>
        <Content>{content}</Content>
      </Display>
    </Root>
  );
};

const Title = styled.h2`
  line-height: 1;
`;

const Description = styled.p``;

const Display = styled.div``;

const Root = styled.div`
  border-radius: 6px;
  padding: 24px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Content = styled.div`
  position: relative;
  height: 350px;
  overflow: hidden;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 3px solid lightgray;
  background-color: white;
`;

const Header = styled.div`
  height: 48px;
  background-color: lightgray;
  position: relative;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const Dots = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  top: 0;
  left: 0;
  height: 100%;
  padding: 0 16px;
`;

const Dot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${(p) => p.$color};
`;

export const Preview = Object.assign(_Preview, {
  Dot,
  Header,
  Content,
  Dots,
  Display,
  Description,
  Title,
});
