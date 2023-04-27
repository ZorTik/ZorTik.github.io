import {Card, Col, Placeholder, Row} from "react-bootstrap";
import {Article} from "../../types/blog";
import styled from "styled-components";
import useSWR from "swr";
import {fetcher} from "../../hooks/swr";
import {useEffect, useState} from "react";
import {ButtonComponent} from "../content/Button";
import SWRContent from "../access/SWRContent";

type ArticleCardProps = {
    article: Article
}
type ArticleCardGridProps = {
    cols: number,
    articles?: Article[]
}

const ArticleCardComponent = styled(Card)`
  background-color: var(--color-shade-4);
  border: 1px solid var(--color-shade);

  h1 {
    color: var(--color-shade-2);
    font-size: 1.5rem;
  }

  * {
    background: none;
    border-top: none;
    border-bottom: none;
    word-break: keep-all;
  }
`;

export default function ArticleCard({article}: ArticleCardProps) { // TODO
    return <ArticleCardComponent role="button" className="px-3 py-4">
        <ArticleCardComponent.Header>
            <h1>{article.title}</h1>
        </ArticleCardComponent.Header>
    </ArticleCardComponent>
}

function DecoratedArticleCardGrid({cols, articles}: ArticleCardGridProps) {
    const [rows, setRows] = useState<any[]>([]);
    useEffect(() => {
        const rows: any[] = [];
        for (let i = 0; i < Math.ceil(articles!!.length / cols); i++) rows.push([]);
        articles!!.forEach((article, index) => rows[Math.floor(index / cols)].push(article));
        setRows(rows);
    }, [cols, articles]);
    return <>
        {rows.map((row, index) => <Row key={index}>
            {row.map((article: Article, index: number) => <Col
                key={index} md={12 / cols}
                style={{marginTop: index > cols ? "20px" : "0"}}
            ><ArticleCard article={article} /></Col>)}
        </Row>)}
    </>
}

function SWRArticleGrid({cols}: ArticleCardGridProps) {
    const swr = useSWR("/api/blog/articles", fetcher);
    const {data} = swr;
    return <SWRContent swr={swr}>
        <DecoratedArticleCardGrid cols={cols} articles={data} />
    </SWRContent>
}

export function ArticleCardGrid({cols, articles}: ArticleCardGridProps) {
    return articles ? <DecoratedArticleCardGrid cols={cols} articles={articles} /> : <SWRArticleGrid cols={cols} />
}
