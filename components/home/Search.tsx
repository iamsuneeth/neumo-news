import React, { useState } from "react";
import { Article } from "../layouts/Article";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { Flex } from "../common/styles/Flex";
import { useDebounce } from "../../hooks/useDebounce";
import useSwr from "swr";
import { Fetcher } from "../../core/api/client";
import { Card } from "../common/styles/Card";
import styled from "styled-components";
import { Link } from "../common/styles/Link";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  padding: 10px;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-flow: column;
  }
`;

const Picture = styled.div<{ background: string }>`
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  overflow: hidden;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
  box-shadow: 
/* main shadow */ 0px 0px 2px #5f5f5f,
    /* offset */ 0px 0px 0px 5px #ecf0f3, /*bottom right */ 8px 8px 15px #a7aaaf,
    /* top left */ -8px -8px 15px #ffffff;
`;

const InputContainer = styled(Flex)`
  position: relative;
  width: 50%;

  align-items: center;
  border-radius: 24px;
  overflow: hidden;
  padding: 0.2em 1em;
  margin-bottom: 5rem;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
  & > input {
    background: none;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const SearchHeader = styled.h2`
  padding: 0 1.8rem;
`;

const Content = styled(Flex)`
  & > div:last-of-type {
    max-width: 60%;
  }
  @media screen and (max-width: 767px) {
    flex-flow: column;
    align-items: center;
    & > div:last-of-type {
      max-width: 100%;
      & > h3 {
        text-align: center;
      }
    }
  }
`;

export interface SearchProps {}
export const Search = (props: SearchProps) => {
  const [searchString, setSearchString] = useState<string>(null);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchString);

  const { data, error } = useSwr(
    debouncedSearch ? `everything?q=${debouncedSearch}&page=${page}` : null,
    Fetcher
  );
  return (
    <Article header={<SearchHeader>News from UK</SearchHeader>}>
      <Flex centered>
        <InputContainer>
          <span
            style={{
              width: "1.2em",
              height: "1.2em",
              marginRight: "0.5em",
            }}
          >
            <FaSearch size="100%" color="#555" />
          </span>
          <input
            type="search"
            placeholder="Search.."
            style={{
              width: "100%",
              height: "3em",
              outline: "none",
              border: "none",
            }}
            onChange={(event) => setSearchString(event.target.value)}
          />
        </InputContainer>
      </Flex>

      <Grid>
        {data
          ? data.articles.map((article) => (
              <Card>
                <Flex
                  direction="column"
                  justify="space-between"
                  style={{ height: "100%" }}
                >
                  <Content justify="space-around">
                    <Picture background={article.urlToImage} />

                    <div>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                    </div>
                  </Content>
                  <Flex
                    justify="end"
                    align="center"
                    style={{ paddingRight: "1rem" }}
                  >
                    <Link
                      href={article.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Read more
                      <span>
                        <FaArrowRight style={{ marginLeft: "0.5rem" }} />
                      </span>
                    </Link>
                  </Flex>
                </Flex>
              </Card>
            ))
          : null}
      </Grid>
    </Article>
  );
};
