import React from "react";
import styled from "styled-components";
import { Flex } from "../common/styles/Flex";
import { FaSearch } from "react-icons/fa";

const InputContainer = styled(Flex)`
  position: relative;
  width: 50%;
  background: #f1f3f4;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  padding: 0.2em 1em;
  margin-bottom: 5rem;
  transition: all 0.5s ease;
  & > input {
    background: none;
  }
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  &:focus-within {
    background: #ffffff;
    box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
      0 1px 3px 1px rgba(65, 69, 73, 0.15);
  }
`;

const IconContainer = styled.span`
  width: 1.2em;
  height: 1.2em;
  marginright: 0.5em;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 3em;
  outline: none;
  border: none;
  padding: 0 0.5rem;
`;

export interface SearchBoxProps {
  onChange: (search: string) => void;
}
export const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <Flex centered>
      <InputContainer>
        <IconContainer>
          <FaSearch size="100%" color="#555" />
        </IconContainer>
        <StyledInput
          type="search"
          placeholder="Search.."
          onChange={(event) => onChange(event.target.value)}
        />
      </InputContainer>
    </Flex>
  );
};
