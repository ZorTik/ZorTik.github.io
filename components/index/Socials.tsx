import styled from "styled-components";
import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";

const SocialsComponent = styled(Row)`
  background-color: var(--color-shade-4);
  border: 1px solid var(--color-shade-2);
  margin: 60px 0 80px 0;

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
    background-color: ${props => props.bgcolor ?? "#3b4754"} !important;
  }
`;

export default function Socials() {
    const [discordClicked, setDiscordClicked] = useState(false);
    const handleDiscordClick = async () => {
        await navigator.clipboard.writeText("ZorTik#2007");
        setDiscordClicked(true);
    }
    return <>
        <SocialsComponent className="px-3 py-4" id="contacts">
            <Col><SocialButton bgcolor="#4d5fa7" onClick={handleDiscordClick}>{discordClicked ? "Discord tag copied!" : "Discord"}</SocialButton></Col>
            <Col><SocialButton bgcolor="#696969" href="https://github.com/ZorTik" target="_blank">GitHub</SocialButton></Col>
            <Col><SocialButton bgcolor="#c60f55" href="https://instagram.com/zortik_official" target="_blank">Instagram</SocialButton></Col>
        </SocialsComponent>
    </>
}
