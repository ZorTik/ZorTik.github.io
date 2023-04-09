import {PropsWithChildren} from "react";
import BaseLayout from "../BaseLayout";
import AuthRequired from "../auth/AuthRequired";
import {Col, Row} from "react-bootstrap";

export default function PanelLayout(props: PropsWithChildren) {
    return (
        <BaseLayout>
            <AuthRequired>
                <Row>
                    {props.children}
                </Row>
            </AuthRequired>
        </BaseLayout>
    )
}
