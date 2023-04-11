import {Card, Col, Row} from "react-bootstrap";
import {Article} from "../../types/blog";
import styled from "styled-components";
import useSWR from "swr";
import {fetcher} from "../../hooks/swr";
import {useEffect, useState} from "react";

type ArticleCardProps = {
    article: Article
}
type ArticleCardGridProps = {
    cols: number,
    articles?: Article[]
}

const ArticleCardComponent = styled(Card)`
  background-color: unset;
  padding: 20px;
  border: 1px solid var(--color-shade-3);
  border-radius: 5px;
  height: 260px;
  
  h1 {
    font-size: 1.5rem;
  }
  * {
    background: none;
    border-top: none;
    border-bottom: none;
  }
`;

export default function ArticleCard({article}: ArticleCardProps) { // TODO
    return <ArticleCardComponent>
        <ArticleCardComponent.Header>
            <h1>{article.title}</h1>
            <span>{article.content.split(" ").slice(0, 30).join(" ")}...</span>
        </ArticleCardComponent.Header>
        <ArticleCardComponent.Footer>

        </ArticleCardComponent.Footer>
    </ArticleCardComponent>
}

function LocalArticleCardGrid({cols, articles}: ArticleCardGridProps) {
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

function AllArticleGrid({cols}: ArticleCardGridProps) {
    const {data} = useSWR("/api/blog/articles", fetcher);
    return data ? <LocalArticleCardGrid cols={cols} articles={data} /> : null;
}

export function ArticleCardGrid({cols, articles}: ArticleCardGridProps) {
    return articles ? <LocalArticleCardGrid cols={cols} articles={articles} /> : <AllArticleGrid cols={cols} />
}
