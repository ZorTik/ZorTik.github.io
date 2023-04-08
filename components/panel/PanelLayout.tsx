import {PropsWithChildren} from "react";
import BaseLayout from "../BaseLayout";
import AuthRequired from "../auth/AuthRequired";
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import Image from "next/image";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ButtonComponent} from "../content/Button";

const ProfileCol = styled(Col)`
  text-align: center;
  //border-right: 1px solid var(--color-shade);
  @media screen and (max-width: 1400px) {
    display: none !important;
  }
`;
const ProfilePicture = styled(Image)`
  border-radius: 100%;
`;
const ContentCol = styled(Col)`
  @media screen and (min-width: 1400px) {
    padding: 0 40px;
  }
`;

export default function PanelLayout(props: PropsWithChildren) {
    const {user} = useUser();
    return (
        <BaseLayout>
            <AuthRequired>
                <Row>
                    <ProfileCol md={2}>
                        <ProfilePicture src={user?.picture ?? ""} width={64} height={64} alt="Profile Picture" />
                        <h3>{user?.name ?? "Unknown"}</h3>
                        <ButtonComponent href="/api/auth/logout">Logout</ButtonComponent>
                    </ProfileCol>
                    <ContentCol>
                        {props.children}
                    </ContentCol>
                </Row>
            </AuthRequired>
        </BaseLayout>
    )
}
