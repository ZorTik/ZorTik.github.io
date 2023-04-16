import styles from "../styles/Works.module.css";
import {Badge, Col, Pagination, Row} from "react-bootstrap";
import styled, {css} from "styled-components";
import {ChangeEventHandler, useEffect, useState} from "react";
import _, {Dictionary} from "underscore";
import Image from "next/image";
import Link from "next/link";
import {ButtonComponent} from "./content/Button";
import Loader from "./content/Loader";
import {FormComponent} from "./content/Form";

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
  
  @media screen and (max-width: 1400px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1200px) {
    img {
      //display: none !important;
    }
  }
`;
const SearchContentCol = styled(Col)`
  @media screen and (max-width: 1399px) {
    margin-top: ${props => props.margin ? "40px !important" : "0"};
  }
`;
const TagsComponent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  
  > * {
    margin-right: 8px;
  }
  
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center !important;
    >* {
      margin-top: 8px !important;
      margin-bottom: 0 !important;
      align-self: center !important;
      width: 100% !important;
    }
  }
  @media screen and (min-width: 768px) {
    flex-wrap: wrap;
  }
`;
const TagsButton = styled(ButtonComponent)`
    margin-right: 5px;
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
  padding: 0 20px;
  * {
    box-shadow: none !important;
    border: none !important;
    color: var(--color-shade) !important;
  }
  > * {
    background: none !important;
    transform: translateY(-15%);
  }
  .page-link:hover, .page-link:focus, .page-link:active {
    background-color: var(--bs-gray-600) !important;
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
    const handlePageChange = (change: number) => {
        if (page + change < 0 || page + change + 1 >= works.length)
            return;

        setPage(page + change);
    }
    const currentPageCols = () => {
        return works.filter((_, i) => i >= page * 2 && i < (page + 1) * 2);
    }

    useEffect(() => {
        const query = attributes.query;
        const filters = attributes.filters;

        if (fetching) return;
        setFetching(true);
        setWorks([]);

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
                return {...w, page: Number(Math.floor(i / 2))};
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
                <FormComponent>
                    <input onChange={handleSearchValueChange} type="text" placeholder="Search..." />
                </FormComponent>
                <TagsComponent>
                    {categories ? categories.map((category, _i) => {
                        return <TagsButton key={_i} onClick={() => {
                            setAttributes({
                                ...attributes,
                                filters: attributes.filters.includes(category)
                                    ? attributes.filters.filter(f => f !== category)
                                    : [...attributes.filters, category]
                            });
                        }} active={attributes.filters.includes(category)}>{category}</TagsButton>
                    }) : null}
                </TagsComponent>
            </Col>
        </Row>
        {fetching ? <Row className="d-flex flex-row justify-content-center mb-5">
            <Loader />
        </Row> : null}
        <SearchContentComponent>
            {currentPageCols().map((page, _i1) => <SearchContentCol key={_i1} margin={_i1 > 0}>
                {page.map((work, _i2) => <WorkCard key={_i2} work={work} margin={_i2 > 0} />)}
            </SearchContentCol>)}
            {currentPageCols().length < 2 ? <Col /> : null}
        </SearchContentComponent>
        <SearchPaginationComponent>
            <SearchPaginationPrev onClick={() => handlePageChange(-1)} />
            {works.filter((_, i) => i % 2 == 0).map((_, i) => <SearchPaginationItem key={i / 2} active={i === page} />)}
            <SearchPaginationNext onClick={() => handlePageChange(1)} />
        </SearchPaginationComponent>
        <Row className="d-flex flex-row justify-content-center"><ButtonComponent target="_blank" href="https://github.com/ZorTik">Show more</ButtonComponent></Row>
    </Col>
}

type WorkCardProps = {
    work: Work,
    margin?: boolean
}
const WorkCardImageCol = styled(Col)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  
  img {
    max-width: 200px !important;
    width: 200px !important;
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
  @media screen and (max-width: 767px) {
    border-left: none !important;
    margin: 20px 0 30px 0;
  }
`;
const WorkCardBadge = styled(Badge)`
  background-color: var(--color-shade) !important;
  margin-right: 4px;
`;
const WorkCard = (props: WorkCardProps) => {
    const {work} = props;
    return <Row style={{
        marginTop: props.margin ? "40px" : "0px",
        minHeight: "253px"
    }}>
        <WorkCardImageCol md={6}>
            <Image src={work.img} width={200} height={200} alt={work.title} />
        </WorkCardImageCol>
        <WorkDetailsCol md={6}>
            <Link href={work.href || "#"} target={work.href ? "_blank" : "_self"}><h1 role="button">{work.title}</h1></Link>
            {work.categories.map((c, i) => <WorkCardBadge key={i}>{c}</WorkCardBadge>)}
            <p>{work.description}</p>
        </WorkDetailsCol>
    </Row>
}

const Works = () => {
    return <>
        <Row className={styles.works} id="work"><Search /></Row>
    </>
}

export default Works;
