import React, { useCallback } from "react";
import { Article } from "../layouts/Article";

import { Flex } from "../common/styles/Flex";

import { useSWRInfinite } from "swr";
import { Fetcher } from "../../core/api/client";

import styled from "styled-components";

import { API_URLS } from "../../core/constants/client_api";
import { NewsList } from "./NewsList";

const SearchHeader = styled.h2`
  padding: 0 1.8rem;
`;

const Content = styled(Flex)`
  & > div:last-of-type {
    max-width: 60%;
  }
  @media screen and (max-width: 800px) {
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

export interface SearchProps {
  searchString: string;
}
export const Search = React.memo(({ searchString }: SearchProps) => {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${API_URLS.everything}?q=${searchString}&page=${index + 1}`,
    Fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 120000,
    }
  );
  const setPage = useCallback(() => setSize((size) => size + 1), []);
  return (
    <Article header={<SearchHeader>News from UK</SearchHeader>}>
      <Flex centered>
        <NewsList
          pagedNews={data}
          loadMore={setPage}
          currentPage={size}
          keyPrefix="search"
        />
      </Flex>
    </Article>
  );
});
