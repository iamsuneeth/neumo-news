import React from "react";
import { Article } from "../layouts/Article";
import styled from "styled-components";
import Link from "next/link";
import { Flex } from "../common/styles/Flex";
import { Card } from "../common/styles/Card";
import { FaArrowRight } from "react-icons/fa";
import { Link as StyledLink } from "../common/styles/Link";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.8rem;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  padding: 0.8rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-flow: column;
  }
`;

const GridItem = styled(Card)<{
  span?: number;
  rowSpan?: number;
  columnSpan?: number;
}>`
  font-weight: bold;
  text-transform: uppercase;
  color: #929796;

  ${({ span, rowSpan = 1, columnSpan = 1 }) => {
    if (span) {
      return `grid-column-end: span ${span};
      grid-row-end: span ${span};`;
    }
    return `
    grid-column-end: span ${rowSpan};
    grid-row-end: span ${columnSpan}`;
  }};

  ${({ span, rowSpan, columnSpan }) =>
    (span || rowSpan || columnSpan) &&
    `box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;`};
`;

const Picture = styled.div<{ background: string }>`
  min-height: 15rem;
  width: 100%;
  border-radius: 40px;
  overflow: hidden;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  background-position: center;
  box-shadow: 
/* main shadow */ 0px 0px 2px #5f5f5f,
    /* offset */ 0px 0px 0px 5px #ecf0f3, /*bottom right */ 8px 8px 15px #a7aaaf,
    /* top left */ -8px -8px 15px #ffffff;
`;

const ReadMore = styled(StyledLink)`
  box-shadow: none;
  margin-top: 0.5rem;
  &:hover {
    color: #ff6584;
  }
`;

const GridHeader = styled.h2`
  padding: 0 1.8rem;
`;

export interface HeadlinesProps {
  headlines: any[];
}
export const Headlines = ({ headlines }: HeadlinesProps) => {
  return (
    <Article header={<GridHeader>Headlines</GridHeader>}>
      <Grid>
        {headlines.map((headLine, index) => {
          const props = {};
          switch (index) {
            case 0:
              props["rowSpan"] = 2;
              props["columnSpan"] = 3;
              break;
            case 1:
              props["span"] = 2;
              break;
            case 2:
              props["rowSpan"] = 2;
              props["columnSpan"] = 3;
              break;
            case 3:
              props["columnSpan"] = 2;
              break;
            default:
          }

          const propsLength = Object.keys(props).length;

          return (
            <GridItem {...props}>
              {propsLength > 0 && <Picture background={headLine.urlToImage} />}
              <h3 style={{ textAlign: "center" }}>{headLine.title}</h3>
              <div style={{ height: "1px", backgroundColor: "#ff6584" }} />
              <Flex justify="end">
                <ReadMore
                  href={headLine.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read more
                  <span>
                    <FaArrowRight style={{ marginLeft: "0.5rem" }} />
                  </span>
                </ReadMore>
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
      <Flex justify="end">
        <Link href="/headlines">See all</Link>
      </Flex>
    </Article>
  );
};
