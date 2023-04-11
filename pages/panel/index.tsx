import PanelLayout from "../../components/panel/PanelLayout";
import {Col, Spinner, Tab} from "react-bootstrap";
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
import {NotificationsComponent, pushNotification} from "../../components/content/Notification";

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
    const [lock, setLock] = useState<boolean>(false);

    const handlePublish = async (e: any) => {
        e.preventDefault();

        if (lock) return;
        else setLock(true);

        fetch("/api/blog/article", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({id: -1, title, content} as Article)
        })
            .then(res => res.json())
            .then(res => {
                pushNotification({variant: "success", text: `Article published successfully`});
                setTitle("");
                setContent("");
            })
            .catch(() => {
                pushNotification({variant: "danger", text: "Failed to publish article"});
            })
            .finally(() => setLock(false));
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
            <NotificationsComponent />
            <Pane color="var(--bs-green)">
                <h1>Create Blog</h1>
                <FormComponent onSubmit={handlePublish}>
                    <FormComponent.Group controlId="formBasicEmail">
                        <FormComponent.Label>Title</FormComponent.Label>
                        <FormComponent.Control
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            placeholder="Enter title"
                            disabled={lock}
                            required />
                    </FormComponent.Group>
                    <FormComponent.Group controlId="formContent">
                        <FormComponent.Label>Content</FormComponent.Label>
                        <FormComponent.Control
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            as="textarea"
                            rows={3}
                            placeholder="Enter content"
                            disabled={lock}
                            required />
                    </FormComponent.Group>
                    <ButtonComponent type="submit">{lock ? <Spinner animation="border" role="status" /> : null}Publish</ButtonComponent>
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
                        defaultActiveKey="blog"
                        id="fill-tab-example"
                        className="mb-3"
                        transition={false}
                    >
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
