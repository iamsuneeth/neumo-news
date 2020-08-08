import React from "react";
import { Flex } from "../common/styles/Flex";
import styled from "styled-components";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { Button } from "../common/styles/Button";

export interface SwitchProps {
  onToggle: () => void;
  value: boolean;
}
export const Switch = ({ onToggle, value }: SwitchProps) => {
  return (
    <Flex justify="end" style={{ width: "100%" }}>
      <Button onClick={() => onToggle()}>
        {!value && <FaSearch size="2em" />}
        {value && <FaWindowClose size="2em" />}
      </Button>
    </Flex>
  );
};
