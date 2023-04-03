import {Button, Col, Row} from "react-bootstrap";

import styles from "../styles/Welcome.module.css";
import {Fade} from "react-awesome-reveal";

const TechIcon = (props: { className: string }) => {
    return (
        <i className={props.className} style={{fontSize: "3rem", marginRight: "5px"}}></i>
    )
}

const Welcome = () => {
    return (
        <Row className={styles.welcome}>
            <Col className={`${styles.titleContainer} d-flex flex-column justify-content-end`}>
                <Fade cascade>
                    <h2>Hey, I&apos;m</h2>
                    <h1>ZorTik</h1>
                </Fade>
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
                <Button href="#work">Scroll Down ↓</Button>
            </Col>
        </Row>
    )
};

export default Welcome;
