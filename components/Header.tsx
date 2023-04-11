import {Button, Col, Container, Dropdown, Form, Nav, Navbar, NavDropdown, NavLinkProps, Offcanvas, Row} from "react-bootstrap";
import Hr from "./Hr";
import Image from "next/image";
import styled, {css} from "styled-components";
import {BsPrefixRefForwardingComponent} from "react-bootstrap/helpers";
import {useRouter} from "next/router";
import {ButtonComponent, DropdownComponent} from "./content/Button";
import {useUser} from "@auth0/nextjs-auth0/client";

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
const panelButtonStyle = css`
  margin-left: 10px;
`;
const PanelButton = styled(ButtonComponent)`${panelButtonStyle}`;
const PanelDropdown = styled(DropdownComponent)`${panelButtonStyle}`;
const ToggleButton = styled(Navbar.Toggle)`
  border: none !important;
  box-shadow: none !important;
  .navbar-toggler-icon {color: var(--color-secondary) !important;}
  
  :hover {
    background-color: var(--color-shade-3) !important;
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
                <ToggleButton aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <HeaderLink href="/#about">About Me</HeaderLink>
                        <HeaderLink href="/#work">My Work</HeaderLink>
                        <HeaderLink href="/#contacts">Contact Me</HeaderLink>
                        <HeaderLink href="/blog">Blog</HeaderLink>
                        <PanelComponent />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const PanelComponent = () => {
    const {user, isLoading} = useUser();
    const router = useRouter();
    const handlePanelClick = async () => {
        if (user) await router.push("/panel")
        else await router.push("/api/auth/login");
    }
    return isLoading ? null : user ? <PanelDropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">{user.nickname}</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="/panel">Panel</Dropdown.Item>
            <Dropdown.Item href="/api/auth/logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
    </PanelDropdown> : <PanelButton onClick={handlePanelClick}>Panel</PanelButton>;
}

export default function Header() {
    return (
        <Row className={`d-flex flex-row`} id="home">
            <HeaderLinks md={6} sm={12}>
                <DropdownHeader />
            </HeaderLinks>
            <HrWrapperComponent><Hr /></HrWrapperComponent>
        </Row>
    )
}
