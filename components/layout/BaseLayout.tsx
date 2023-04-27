import {PropsWithChildren, ReactElement} from "react";
import {Container, ContainerProps} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const BaseLayoutContainer = styled(Container)`
  padding: ${props => props.padding ? "30px 0" : "0"};
  
  @media screen and (max-width: 990px) {
    padding: 20px 0 !important;
  }
`;

export type BaseLayoutType = ((props: BaseLayoutProps) => ReactElement) & {
    Footer: () => ReactElement
}

type BaseLayoutProps = PropsWithChildren & ContainerProps & {
    padding?: boolean
}

const BaseLayout = (props: BaseLayoutProps) => {
    return <Container {...props}>
        <Header />
        <BaseLayoutContainer padding={props.padding ?? true} fluid>
            {props.children}
        </BaseLayoutContainer>
    </Container>
}

const FooterComponent = () => <Footer />;

BaseLayout.Footer = FooterComponent;

export default BaseLayout as BaseLayoutType;
