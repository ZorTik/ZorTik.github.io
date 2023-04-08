import PanelLayout from "../../components/panel/PanelLayout";
import {TabsComponent} from "../../components/content/Tabs";
import {Tab} from "react-bootstrap";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function Panel() {
    const {user} = useUser();
    return (
        <PanelLayout>
            <TabsComponent
                defaultActiveKey="tickets"
                id="fill-tab-example"
                className="mb-3"
                transition={false}
            >
                <Tab eventKey="tickets" title="Tickets">
                    <p>Under construction...</p>
                </Tab>
                <Tab eventKey="blog" title="Blog">

                </Tab>
            </TabsComponent>
        </PanelLayout>
    )
}
