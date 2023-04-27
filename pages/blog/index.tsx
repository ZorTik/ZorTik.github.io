import BaseLayout from "../../components/layout/BaseLayout";
import {ArticleCardGrid} from "../../components/blog/ArticleCard";
import {Container, Row} from "react-bootstrap";
import styled from "styled-components";
import {FormComponent} from "../../components/content/Form";

const BlogContentWrapper = styled(Container)`
  background-color: var(--color-shade-3);
`;

export default function Blog() {
    return <>
        <Container fluid>
            <BaseLayout padding={false}>
                <h1 className="my-4">Blog</h1>
            </BaseLayout>
        </Container>
        <BlogContentWrapper fluid className="py-5">
            <Container>
                <p>In construction...</p>
            </Container>
        </BlogContentWrapper>
        <BaseLayout.Footer />
    </>
}
