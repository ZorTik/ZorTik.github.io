import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import Link from "next/link";

const FooterComponent = styled(Container)`
  color: #6f7378;
  padding: 2rem 0;
  margin-top: 20px;
  > * > a[href] {
    color: var(--color-primary) !important;
    :hover {
      color: var(--color-primary-dark) !important;
    }
  }
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

  a {color: #f3f2f5;}
  a:hover {color: #dddde0;}

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
                        <Row><p>Hello, and welcome to my portfolio website! I&apos;m a dedicated programmer with a passion for solving complex problems through elegant and efficient code. With a keen eye for detail, I strive to create high-quality, user-friendly solutions that meet the unique needs of each project. As a lifelong learner, I&apos;m always seeking out new challenges and opportunities to expand my skills and knowledge. Whether you&apos;re looking for a full-stack developer, a front-end specialist, or anything in between, I&apos;m confident that I have the skills and experience to help bring your vision to life. Thank you for taking the time to visit my site, and I look forward to working with you!</p></Row>
                        <br />
                        <Row><p>Designed by <strong>Gennario</strong> | Developed by <strong>ZorTik</strong></p></Row>
                    </FooterQuoteColComponent>
                    <FooterLinksColComponent>
                        <Link href={"https://github.com/ZorTik"}>GitHub</Link>
                        <Link href={"/"}>Discord</Link>
                        <Link href={"https://www.instagram.com/zortik_official/"}>Instagram</Link>
                    </FooterLinksColComponent>
                </Row>
                <Row>
                    <Link href={"/3rdparty"}>3rd party libraries & attributions</Link>
                </Row>
            </FooterComponent>
        </Container>
    );
}

export default Footer;
