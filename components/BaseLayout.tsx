import {PropsWithChildren} from "react";
import {Container} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import {useUser} from "@auth0/nextjs-auth0/client";
import Loader from "./content/Loader";

const BaseLayoutContainer = styled(Container)`
  padding: ${props => props.padding ? "30px 0" : "0"};
  
  @media screen and (max-width: 990px) {
    padding: 20px 0 !important;
  }
`;

type BaseLayoutProps = PropsWithChildren & {
    padding?: boolean
}

const BaseLayout = (props: BaseLayoutProps) => {
    const {isLoading} = useUser();
    return <>
        <Container>
            {!isLoading ? (
                <>
                    <Header />
                    <BaseLayoutContainer padding={props.padding ?? true} fluid>
                        {props.children}
                    </BaseLayoutContainer>
                </>
            ) : <Loader />}
        </Container>
        <Footer />
    </>
}

export default BaseLayout;
