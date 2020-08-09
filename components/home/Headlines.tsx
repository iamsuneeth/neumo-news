import React, { useRef, useCallback } from "react";
import { Article } from "../layouts/Article";
import styled from "styled-components";
import { Flex } from "../common/styles/Flex";
import { Card } from "../common/styles/Card";
import { useSWRInfinite } from "swr";
import { API_URLS } from "../../core/constants/client_api";
import { Fetcher } from "../../core/api/client";
import { NewsList } from "./NewsList";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: 0.8rem;
  grid-auto-rows: auto;
  padding: 0.8rem;
  @media screen and (max-width: 800px) {
    display: flex;
    padding: 0;
    flex-flow: column;
  }
`;

const Filters = styled.aside`
  grid-column: span 4;
`;

const GridHeader = styled.h2`
  padding: 0 1.8rem;
`;

const Secondary = styled(Flex)`
  font-size: 80%;
  & > div {
    &:after {
      content: "·";
      margin: 0 0.2rem;
    }
  }
`;

const StyledH3 = styled.h3`
  margin-top: 0;
`;

export interface HeadlinesProps {
  headlines: any;
}
export const Headlines = ({ headlines }: HeadlinesProps) => {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${API_URLS.headlines}?page=${index + 1}`,
    Fetcher,
    {
      initialData: [headlines],
      revalidateOnFocus: false,
      dedupingInterval: 120000,
    }
  );
  const setPage = useCallback(() => setSize((size) => size + 1), []);

  return (
    <Article header={<GridHeader>Headlines</GridHeader>}>
      <Grid>
        <NewsList pagedNews={data} loadMore={setPage} currentPage={size} />
        <Filters>
          <Card>
            <StyledH3 as="h4">Categories</StyledH3>
            <ul>
              <li>business</li>
              <li>entertainment</li>
              <li>general</li>
              <li>health</li>
              <li>science</li>
              <li>sports</li>
              <li>technology</li>
            </ul>
          </Card>
        </Filters>
      </Grid>
    </Article>
  );
};
