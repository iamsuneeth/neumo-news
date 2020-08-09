import React from "react";
import { Flex } from "./styles/Flex";
import styled from "styled-components";
import { FaNewspaper } from "react-icons/fa";

const StyledHeader = styled.header`
  height: 4rem;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1279px) {
    padding: 0 0.5rem;
  }
`;

const StyledName = styled.span`
  margin-left: 0.5rem;
`;

export interface HeaderProps {}
export const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      <Flex centered="vertical">
        <FaNewspaper size="2em" />
        <StyledName>Neumo News</StyledName>
      </Flex>
    </StyledHeader>
  );
};
