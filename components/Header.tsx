import {Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Hr from "./Hr";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import styled from "styled-components";

const HrWrapperComponent = styled(Col)`
  @media screen and (max-width: 1400px) {
    display: none !important;
  }
`;

const Header = () => {
    return (
        <Row className={`d-flex flex-row`} id="home">
            <Col xxl={3} className={styles.header}>
                <Navbar expand="lg" sticky="top">
                    <Nav className="me-auto">
                        <Navbar.Brand href="/">
                            <Image id="logo" src="/logo.png" width={32} height={32} alt="ZorTik Logo" />
                        </Navbar.Brand>
                        <Nav.Link href="#about">About Me</Nav.Link>
                        <Nav.Link href="#work">My Work</Nav.Link>
                        <Nav.Link href="#contacts">Contacts</Nav.Link>
                    </Nav>
                </Navbar>
            </Col>
            <HrWrapperComponent><Hr /></HrWrapperComponent>
        </Row>
    )
}

export default Header;
