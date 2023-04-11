import BaseLayout from "../../components/BaseLayout";
import {ArticleCardGrid} from "../../components/blog/ArticleCard";

export default function Blog() {
    return (
        <BaseLayout>
            <h1 className="mb-4">Blog</h1>
            <ArticleCardGrid cols={3} />
        </BaseLayout>
    )
}
