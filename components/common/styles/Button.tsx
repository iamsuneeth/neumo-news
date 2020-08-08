import styled from "styled-components";

export const Button = styled.button`
  box-shadow: 12px 12px 24px 0 rgba(0, 0, 0, 0.2),
    -12px -12px 24px 0 rgba(255, 255, 255, 0.5);
  &:active {
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.2),
      inset -6px -6px 10px 0 rgba(255, 255, 255, 0.5);
  }
  &:hover {
    cursor: pointer;
  }
  background-color: #ecf0f3;
  outline: none;
  border: none;
  padding: 1rem;
  border-radius: 24px;
  display: flex;
`;
