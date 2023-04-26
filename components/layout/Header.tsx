import {Col, Container, Nav, Navbar, NavLinkProps, Row} from "react-bootstrap";
import Hr from "../content/Hr";
import Image from "next/image";
import styled from "styled-components";
import {BsPrefixRefForwardingComponent} from "react-bootstrap/helpers";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HeaderLinks = styled(Col)`
  .navbar-brand, .navbar-nav > a {
    transform: translateY(-1px);
  }
  .navbar-nav {
    > a {
      color: #d2d2d2;
      font-weight: lighter;
    }
    > a:hover, > a:active, > a:focus, > a[class="nav-link active"] {
      color: #fff !important;
    }
  }
  
  @media screen and (min-width: 769px) {
    width: fit-content !important;
  }
`;
const HrWrapperComponent = styled(Col)`
  @media screen and (max-width: 1400px) {
    display: none !important;
  }
`;
const ToggleButton = styled(Navbar.Toggle)`
  border: none !important;
  box-shadow: none !important;
  .navbar-toggler-icon {color: var(--color-secondary) !important;}
  
  :hover {
    //background-color: var(--color-shade-3) !important;
    > * {
      color: var(--color-shade-2) !important;
    }
  }
`;
const HeaderLink: BsPrefixRefForwardingComponent<"a", NavLinkProps> = (props) => {
    const router = useRouter();
    return <Nav.Link {...props} active={router.asPath.startsWith(props.href ?? "#")} />
};

const DropdownHeader = () => {
    return (
        <Navbar expand="md">
            <Container>
                <Navbar.Brand href="/">
                    <Image id="logo" src="/logo.png" width={32} height={32} alt="ZorTik Logo" />
                </Navbar.Brand>
                <ToggleButton aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon="bars" color="var(--color-shade)" size="lg" />
                </ToggleButton>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <HeaderLink href="/#about">About Me</HeaderLink>
                        <HeaderLink href="/#work">My Work</HeaderLink>
                        <HeaderLink href="/#contacts">Contact Me</HeaderLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default function Header() {
    return (
        <Row className={`d-flex flex-row`} id="home">
            <HeaderLinks md={4} sm={12}>
                <DropdownHeader />
            </HeaderLinks>
            <HrWrapperComponent><Hr /></HrWrapperComponent>
        </Row>
    )
}
