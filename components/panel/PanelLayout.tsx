import {PropsWithChildren} from "react";
import BaseLayout from "../layout/BaseLayout";
import AuthRequired from "../access/AuthRequired";
import {Col, Row} from "react-bootstrap";

export default function PanelLayout(props: PropsWithChildren) {
    return <>
        <BaseLayout>
            <AuthRequired>
                <Row>
                    {props.children}
                </Row>
            </AuthRequired>
        </BaseLayout>
        <BaseLayout.Footer />
    </>
}
