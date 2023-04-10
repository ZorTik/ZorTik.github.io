import PanelLayout from "../../components/panel/PanelLayout";
import {Col, Tab} from "react-bootstrap";
import {useUserPermissions} from "../../hooks/auth0";
import Loader from "../../components/content/Loader";
import {TabsComponent} from "../../components/content/Tabs";
import styled from "styled-components";
import ArticleCard from "../../components/blog/ArticleCard";
import useSWR from "swr";
import {fetcher} from "../../hooks/swr";
import {Article} from "../../types/blog";
import {FormComponent} from "../../components/content/Form";
import {ButtonComponent} from "../../components/content/Button";
import {useState} from "react";
import Pane from "../../components/content/Pane";

import QuillComponent from "../../components/content/QuillComponent";

const TabContent = styled(Tab.Content)`
  @media screen and (min-width: 991px) {
    padding: 50px 80px !important;
  }
  
  h1 {
    font-size: 1.5rem;
  }
`;

const ArticlesTabContent = () => {
    const {data, error, isLoading} = useSWR<Article[]>("/api/blog/articles", fetcher);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handlePublish = (e: any) => {
        e.preventDefault();
        // TODO
    }

    return (
        <TabContent>
            <h1>Blog</h1>
            {isLoading ? <Loader /> : (
                data?.length == 0
                    ? <p>No articles found</p>
                    : data?.map((article, index) => <ArticleCard key={index} article={article} />)
            )}
            {error ? <p>Error loading articles</p> : null}
            <Pane>
                <h1>Create Blog</h1>
                <FormComponent onSubmit={handlePublish}>
                    <FormComponent.Group controlId="formBasicEmail">
                        <FormComponent.Label>Title</FormComponent.Label>
                        <FormComponent.Control onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" required />
                    </FormComponent.Group>
                    <FormComponent.Group controlId="formContent">
                        <FormComponent.Label>Content</FormComponent.Label>
                        <QuillComponent theme="snow" value={content} onChange={setContent} />
                    </FormComponent.Group>
                    <ButtonComponent type="submit">Publish</ButtonComponent>
                </FormComponent>
            </Pane>
        </TabContent>
    )
}

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
                            <TabContent>
                                <p>Under construction!</p>
                            </TabContent>
                        </Tab>
                        {permissions?.includes("write:blogs") ? (
                            <Tab title="Blog" eventKey="blog">
                                <ArticlesTabContent />
                            </Tab>
                        ) : null}
                    </TabsComponent>
                </Col>
            ) : <Loader />}
        </PanelLayout>
    )
}
