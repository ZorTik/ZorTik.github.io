import {Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Hr from "./Hr";
import styles from "../styles/Header.module.css";
import Image from "next/image";

const Header = () => {
    return (
        <Row className={`d-flex flex-row`} id="home">
            <Col xl={3} className={styles.header}>
                <Navbar expand="lg" sticky="top">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Navbar.Brand href="#home">
                                    <Image id="logo" src="/logo.png" width={32} height={32} alt="ZorTik Logo" />
                                </Navbar.Brand>
                                <Nav.Link href="#about">About Me</Nav.Link>
                                <Nav.Link href="#work">My Work</Nav.Link>
                                <Nav.Link href="#contacts">Contacts</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Col>
            <Col><Hr /></Col>
        </Row>
    )
}

export default Header;
