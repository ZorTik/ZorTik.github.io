import {Button, Col, Row} from "react-bootstrap";

import styles from "../styles/Welcome.module.css";
import FadeIn from "react-fade-in";
import {ButtonComponent} from "./content/Button";
import styled from "styled-components";

const TechIconComponent = styled.i`
  color: var(--color-primary) !important;
`;
const TechIcon = (props: { className: string }) => {
    return <TechIconComponent className={props.className} style={{fontSize: "3rem", marginRight: "5px"}}></TechIconComponent>
}
const ScrollButton = styled(ButtonComponent)`
  margin-top: auto !important;
  margin-bottom: 45px !important;
`;

const Welcome = () => {
    return (
        <Row className={styles.welcome}>
            <Col className={`${styles.titleContainer} d-flex flex-column justify-content-end`}>
                <FadeIn>
                    <h2>Hey, I&apos;m</h2>
                    <h1>ZorTik</h1>
                </FadeIn>
            </Col>
            <Col xl={4} className={`${styles.loreContainer} d-flex flex-column`}>
                <Row className={styles.loreBlock}>
                    <h1>I&apos;m not just a backend dev!</h1>
                    <p>Well, I&apos;m a backend dev, but with experience in lot of other fields. I work as game servers staff and freelance developer. Some of the technologies I used to work with are listed below.</p>
                </Row>
                <Row>
                    <span>
                        <TechIcon className="devicon-react-original colored" />
                        <TechIcon className="devicon-nextjs-plain colored" />
                        <TechIcon className="devicon-nodejs-plain colored" />
                        <TechIcon className="devicon-spring-plain colored" />
                        <TechIcon className="devicon-django-plain colored" />
                        <TechIcon className="devicon-docker-plain colored" />
                        <TechIcon className="devicon-redis-plain colored" />
                    </span>
                </Row>
                <ScrollButton href="#work">Scroll Down ↓</ScrollButton>
            </Col>
        </Row>
    )
};

export default Welcome;
