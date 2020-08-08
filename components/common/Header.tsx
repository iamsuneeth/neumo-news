import React from "react";
import { Flex } from "./styles/Flex";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";

const StyledHeader = styled.header`
  height: 3rem;
  max-width: 1280px;
  margin: 0 auto;
`;

export interface HeaderProps {}
export const Header = (props: HeaderProps) => {
  return (
    <StyledHeader>
      <Flex centered="vertical">
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        <span>Neumo News</span>
      </Flex>
    </StyledHeader>
  );
};
