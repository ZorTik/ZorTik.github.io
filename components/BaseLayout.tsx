import {PropsWithChildren} from "react";
import {Container} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const BaseLayoutContainer = styled(Container)`
    padding: ${props => props.padding ? "30px 0" : "0"};
`;

type BaseLayoutProps = PropsWithChildren & {
    padding?: boolean
}

const BaseLayout = (props: BaseLayoutProps) => {
    return <>
        <Container>
            <Header />
            <BaseLayoutContainer padding={props.padding ?? true} fluid>
                {props.children}
            </BaseLayoutContainer>
        </Container>
        <Footer />
    </>
}

export default BaseLayout;
