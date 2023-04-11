import styled from "styled-components";
import {Col, Row} from "react-bootstrap";
import React, {PropsWithChildren} from "react";

const Content = styled.div`
  background-color: #2d3643;
  border-top: 1px solid ${props => props.color ?? "#238077"};
  padding: 20px;
  width: 100%;
  height: 100%;
  h1 {
    font-size: 1.5rem;
  }
`;

type _default = typeof Pane & {
    Content: typeof Content
}

type PaneProps = React.HTMLAttributes<HTMLElement> & PropsWithChildren;

function Pane(props: PaneProps) {
    return <Row {...props as Omit<PaneProps, "props">}><Col>{props.children}</Col></Row>
}

Pane.Content = Content;

export default (Pane as _default);
