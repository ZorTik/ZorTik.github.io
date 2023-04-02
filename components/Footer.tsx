import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";

const FooterComponent = styled(Container)`
  padding: 2rem 0;
`;
const FooterQuoteColComponent = styled(Col)`
  color: #6f7378;
  
  @media screen and (min-width: 1200px) {
    border-right: 1px solid #6f7378;
    padding-right: 50px;
  }
`;
const FooterLinksColComponent = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    color: #f3f2f5;
  }
  a:hover {
    color: #dddde0;
  }

  @media screen and (min-width: 1200px) {
    padding-left: 50px;
  }
`;

const Footer = () => {
    return (
        <Container fluid style={{backgroundColor: "#2d3643"}}>
            <FooterComponent>
                <Row>
                    <FooterQuoteColComponent xl={10}>
                        <Row><p>Utinam cetero sea persequeris adhuc. Pharetra recteque hac maluisset verear velit vix petentium qualisque. Maximus quem lorem euripidis dolores sapien. Eros ubique iisque maiorum aliquet facilis possit sententiae id definitiones. Vero laudem vitae debet lectus aperiri aliquip.</p></Row>
                        <br />
                        <Row><p>Designed by <strong>Gennario</strong> | Developed by <strong>ZorTik</strong></p></Row>
                    </FooterQuoteColComponent>
                    <FooterLinksColComponent id="contacts">
                        <Link href={"https://github.com/ZorTik"}>GitHub</Link>
                        <Link href={"/"}>Discord</Link>
                        <Link href={"/"}>Instagram</Link>
                    </FooterLinksColComponent>
                </Row>
            </FooterComponent>
        </Container>
    );
}

export default Footer;
