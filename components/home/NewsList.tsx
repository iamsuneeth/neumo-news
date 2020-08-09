import React, { useCallback } from "react";
import styled from "styled-components";
import { Flex } from "../common/styles/Flex";
import { Card } from "../common/styles/Card";
import { Spinner } from "../common/elements/loader/Spinner";
import { useIntersection } from "../../hooks/useIntersection";
import Time from "react-timeago";

const Loader = styled.div`
  padding: 1rem 0;
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

const Link = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled(Card)`
  position: relative;
`;

const StyledH3 = styled.h3`
  margin-top: 0;
`;

const Main = styled.div`
  grid-column: span 8;
`;

const Picture = styled.div<{ background: string }>`
  min-height: 5rem;
  width: 10rem;
  border-radius: 8px;
  overflow: hidden;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
`;

const PAGE_SIZE = 10;

export interface NewsListProps {
  pagedNews: any[];
  loadMore: () => void;
  currentPage: number;
  keyPrefix?: string;
}
export const NewsList = ({
  pagedNews,
  loadMore,
  currentPage,
  keyPrefix = "",
}: NewsListProps) => {
  const setPage = useCallback(
    ([target]: IntersectionObserverEntry[]) => {
      if (
        target.isIntersecting &&
        pagedNews &&
        pagedNews[pagedNews.length - 1].articles.length >= PAGE_SIZE
      ) {
        loadMore();
      }
    },
    [pagedNews]
  );

  const isLoading =
    !pagedNews || (pagedNews && pagedNews.length !== currentPage);

  const { target } = useIntersection<HTMLDivElement>(setPage);

  return (
    <Main>
      {pagedNews?.map((page) =>
        page.articles.map((headLine, index) => {
          return (
            <Content key={`${keyPrefix}${index}`}>
              <Link href={headLine.url}></Link>
              <Flex justify="space-between">
                <div style={{ flex: "1 1 auto", maxWidth: "70%" }}>
                  <StyledH3>{headLine.title}</StyledH3>
                </div>
                <Picture background={headLine.urlToImage} />
              </Flex>
              <Secondary align="center">
                <div>{headLine.source.name}</div>
                <Time date={headLine.publishedAt} />
              </Secondary>
            </Content>
          );
        })
      )}
      <Loader ref={target}>
        <Spinner loading={isLoading} />
      </Loader>
    </Main>
  );
};
