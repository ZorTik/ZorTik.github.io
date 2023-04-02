import styles from "../styles/Works.module.css";
import {Badge, Button, Col, Pagination, Row} from "react-bootstrap";
import styled, {css} from "styled-components";
import {ChangeEventHandler, useEffect, useState} from "react";
import _, {Dictionary} from "underscore";
import Image from "next/image";
import Link from "next/link";

type Work = {
    img: string,
    title: string,
    categories: string[],
    description: string,
    href?: string
}
type SearchAttributes = { query: string, filters: string[], }

const SearchContentComponent = styled(Row)`
  transform: translateY(-30px);
`;
const TagsComponent = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  
  > * {
    margin-right: 8px;
  }
`;
const SearchPaginationComponent = styled(Pagination)`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  
  a[role="button"] {
    border: none !important;
  }
`;
const SearchPaginationItem = styled(Pagination.Item)`
  margin: 0 4px !important;
  :root, .page-link {
    border-radius: 100%;
    width: 10px;
    height: 10px;
    padding: 0 !important;
  }
  .page-link {
    margin-top: 100% !important;
  }
`;
const searchPagArrowStyle = css`
  :active, :focus {
    background-color: transparent !important;
  }
`;
const SearchPaginationNext = styled(Pagination.Next)`${searchPagArrowStyle}`;
const SearchPaginationPrev = styled(Pagination.Prev)`${searchPagArrowStyle}`;

const Search = () => {
    const [works, setWorks] = useState<Work[][]>([]);
    const [page, setPage] = useState<number>(0);
    const [fetching, setFetching] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<SearchAttributes>({
        query: "",
        filters: []
    });
    const [categories, setCategories] = useState<string[]>([]);

    const handleSearchValueChange: ChangeEventHandler = (e) => {
        setAttributes({...attributes, query: (e.target as any).value || ""});
    }

    useEffect(() => {
        const query = attributes.query;
        const filters = attributes.filters;

        if (fetching) return;
        setFetching(true);

        fetch("/api/works", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query, filters
            })
        }).then(res => res.json()).then(data => {
            const works: Work[] & {page: number} = data.map((w: any, i: number) => {
                return {...w, page: Number(i / 2)};
            });
            const worksByPage: Dictionary<Work[]> = _.groupBy(works, "page");
            setWorks(_.values(worksByPage));
        })
            .catch(() => setWorks([]))
            .finally(() => setFetching(false));
    }, [attributes]);

    useEffect(() => {
        fetch("/api/categories").then(res => res.json()).then(data => {
            setCategories(data);
        });
    }, []);

    return <Col>
        <Row className={styles.search}>
            <Col className={styles.searchImg}></Col>
            <Col xl={10} className={styles.searchContent}>
                <h1>See my works!</h1>
                <input onChange={handleSearchValueChange} type="text" placeholder="Search..." />
                <TagsComponent>
                    {categories ? categories.map((category, _i) => {
                        return <Button key={_i} onClick={() => {
                            setAttributes({
                                ...attributes,
                                filters: attributes.filters.includes(category)
                                    ? attributes.filters.filter(f => f !== category)
                                    : [...attributes.filters, category]
                            });
                        }} active={attributes.filters.includes(category)}>{category}</Button>
                    }) : null}
                </TagsComponent>
            </Col>
        </Row>
        <SearchContentComponent>
            {works.filter((_, i) => i >= page * 2 && i < (page + 1) * 2).map((page, _i1) => <Col key={_i1}>
                {page.map((work, _i2) => <WorkCard key={_i2} work={work} />)}
            </Col>)}
            {works.length < 2 ? <Col /> : null}
        </SearchContentComponent>
        <SearchPaginationComponent>
            <SearchPaginationPrev />
            {works.filter((_, i) => i % 2 == 0).map((_, i) => <SearchPaginationItem key={i / 2} active={i === page} />)}
            <SearchPaginationNext />
        </SearchPaginationComponent>
    </Col>
}

type WorkCardProps = {
    work: Work
}
const WorkCardImageCol = styled(Col)`
  img {
    width: 150px !important;
    height: 200px !important;
    border-radius: 8px;
  }
`;
const WorkDetailsCol = styled(Col)`
  border-left: 1px solid var(--color-secondary);
  padding-left: 40px;
  
  h1 {
    font-size: 36px;
    color: var(--color-primary);
  }
  h1:hover {
    color: var(--color-primary-dark);
  }
  p {
    color: var(--color-secondary);
    margin-top: 18px;
  }
`;
const WorkCardBadge = styled(Badge)`
  background-color: var(--color-shade) !important;
  margin-right: 4px;
`;
const WorkCard = (props: WorkCardProps) => {
    const {work} = props;
    return <Row>
        <WorkCardImageCol xl={5}>
            <Image src={work.img} width={150} height={200} alt={work.title} />
        </WorkCardImageCol>
        <WorkDetailsCol>
            <Link href={work.href || "#"}><h1 role="button">{work.title}</h1></Link>
            {work.categories.map((c, i) => <WorkCardBadge key={i}>{c}</WorkCardBadge>)}
            <p>{work.description}</p>
        </WorkDetailsCol>
    </Row>
}

const Works = () => {
    return <Row className={styles.works} id="work"><Search /></Row>
}

export default Works;
