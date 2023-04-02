import {PropsWithChildren} from "react";
import {Container} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

const BaseLayout = (props: PropsWithChildren) => {
    return <>
        <Container>
            <Header />
            {props.children}
        </Container>
        <Footer />
    </>
}

export default BaseLayout;
