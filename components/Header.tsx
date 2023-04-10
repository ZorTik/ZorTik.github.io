import {Col, Dropdown, Nav, Navbar, NavLinkProps, Row} from "react-bootstrap";
import Hr from "./Hr";
import Image from "next/image";
import styled, {css} from "styled-components";
import {BsPrefixRefForwardingComponent} from "react-bootstrap/helpers";
import {useRouter} from "next/router";
import {ButtonComponent, DropdownComponent} from "./content/Button";
import {useUser} from "@auth0/nextjs-auth0/client";
import Loader from "./content/Loader";

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
const panelButtonStyle = css`
  transform: translateY(25%);
`;
const PanelButton = styled(ButtonComponent)`${panelButtonStyle}`;
const PanelDropdown = styled(DropdownComponent)`${panelButtonStyle}`;
const HeaderLink: BsPrefixRefForwardingComponent<"a", NavLinkProps> = (props) => {
    const router = useRouter();
    return <Nav.Link {...props} active={router.asPath.startsWith(props.href ?? "#")} />
}

export default function Header() {
    const {user, isLoading} = useUser();
    const router = useRouter();
    const handlePanelClick = async () => {
        if (user) await router.push("/panel")
        else await router.push("/api/auth/login");
    }
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
            <Col xxl={1}>
                {isLoading ? null : user ? <PanelDropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">{user.nickname}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/panel">Panel</Dropdown.Item>
                        <Dropdown.Item href="/api/auth/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </PanelDropdown> : <PanelButton onClick={handlePanelClick}>Panel</PanelButton>}
            </Col>
        </Row>
    )
}
