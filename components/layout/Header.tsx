import {Button, Col, Container, Nav, Navbar, NavLinkProps, Overlay, Popover, PopoverBody, Row} from "react-bootstrap";
import Hr from "../content/Hr";
import Image from "next/image";
import styled from "styled-components";
import {BsPrefixRefForwardingComponent} from "react-bootstrap/helpers";
import {useRouter} from "next/router";
import Link from "next/link"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSliders} from "@fortawesome/free-solid-svg-icons";
import {MouseEventHandler, useRef, useState} from "react";
import {DOMContainer} from "@restart/ui/useWaitForDOMRef";
import {useUser} from "@auth0/nextjs-auth0/client";
import AuthRequired from "../access/AuthRequired";

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
  
  > * {
    animation: idk 0.5s ease-in;
  }

  @keyframes idk {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
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
                    <Image
                        role="button"
                        id="logo" src="/logo.png"
                        width={32}
                        height={32}
                        alt="ZorTik Logo"
                    />
                </Navbar.Brand>
                <ToggleButton aria-controls="basic-navbar-nav">
                    <FontAwesomeIcon icon={faBars} color="var(--color-shade)" size="lg"/>
                </ToggleButton>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <HeaderLink href="/#">Home</HeaderLink>
                        <HeaderLink href="/#about">About Me</HeaderLink>
                        <HeaderLink href="/#work">My Work</HeaderLink>
                        <HeaderLink href="/#contacts">Contact Me</HeaderLink>
                        <HeaderLink href="/blog">Blog</HeaderLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default function Header() {
    return (
        <Row className={`d-flex flex-row`} id="home">
            <HeaderLinks md={5} sm={12}><DropdownHeader /></HeaderLinks>
            <HrWrapperComponent><Hr /></HrWrapperComponent>
        </Row>
    )
}
