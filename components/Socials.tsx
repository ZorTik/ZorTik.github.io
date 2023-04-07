import styled from "styled-components";
import {Button, Col, Row} from "react-bootstrap";

const SocialsComponent = styled(Row)`
  margin-top: 20px;
  > .col {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
  }
`;
const SocialButton = styled(Button)`
  background-color: #3c4956;
  border: none !important;

  :hover, :focus, :active {
    background-color: ${props => props.bgColor ?? "#3b4754"} !important;
  }
`;

export default function Socials() {
    return <SocialsComponent id="contacts">
        <Col><SocialButton bgColor="#4d5fa7">Discord</SocialButton></Col>
        <Col><SocialButton bgColor="#696969" href="https://github.com/ZorTik" target="_blank">GitHub</SocialButton></Col>
        <Col><SocialButton bgColor="#c60f55" href="https://instagram.com/zortik_official" target="_blank">Instagram</SocialButton></Col>
    </SocialsComponent>
}
