import PanelLayout from "../../components/panel/PanelLayout";
import {Col, Tab} from "react-bootstrap";
import {useUserPermissions} from "../../hooks/auth0";
import Loader from "../../components/content/Loader";
import {TabsComponent} from "../../components/content/Tabs";
import {FormComponent} from "../../components/content/Form";

export default function Panel() {
    const {permissions, fetching} = useUserPermissions();
    return (
        <PanelLayout>
            {!fetching ? (
                <Col>
                    <TabsComponent
                        defaultActiveKey="tickets"
                        id="fill-tab-example"
                        className="mb-3"
                        transition={false}
                    >
                        <Tab eventKey="tickets" title="Tickets">
                            <p>Under construction...</p>
                        </Tab>
                        {permissions?.includes("write:blogs") ? (
                            <Tab title="Blog" eventKey="blog">

                            </Tab>
                        ) : null}
                    </TabsComponent>
                </Col>
            ) : <Loader />}
        </PanelLayout>
    )
}
