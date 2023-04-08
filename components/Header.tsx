import {Col, Nav, Navbar, NavLinkProps, Row} from "react-bootstrap";
import Hr from "./Hr";
import Image from "next/image";
import styled from "styled-components";
import {BsPrefixRefForwardingComponent} from "react-bootstrap/helpers";
import {useRouter} from "next/router";

const HeaderLinks = styled(Col)`
  a {
    color: #d2d2d2;
    font-weight: lighter;
  }
  a:hover, a:active, a:focus, a[class="nav-link active"] {
    color: #fff !important;
  }
`;
const HrWrapperComponent = styled(Col)`
  @media screen and (max-width: 1400px) {
    display: none !important;
  }
`;
const HeaderLink: BsPrefixRefForwardingComponent<"a", NavLinkProps> = (props) => {
    const router = useRouter();
    return <Nav.Link {...props} active={router.asPath.startsWith(props.href ?? "#")} />
}

export default function Header() {
    return (
        <Row className={`d-flex flex-row`} id="home">
            <HeaderLinks xxl={4}>
                <Navbar expand="lg" sticky="top">
                    <Nav className="me-auto">
                        <Navbar.Brand href="/">
                            <Image id="logo" src="/logo.png" width={32} height={32} alt="ZorTik Logo" />
                        </Navbar.Brand>
                        <HeaderLink href="/#about">About Me</HeaderLink>
                        <HeaderLink href="/#work">My Work</HeaderLink>
                        <HeaderLink href="/#contacts">Contact Me</HeaderLink>
                        <HeaderLink href="/blog">Blog</HeaderLink>
                    </Nav>
                </Navbar>
            </HeaderLinks>
            <HrWrapperComponent><Hr /></HrWrapperComponent>
        </Row>
    )
}
