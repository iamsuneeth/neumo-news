import React from "react";
import { Flex } from "../../styles/Flex";
import { ClipLoader } from "react-spinners";
export interface SpinnerProps {
  loading: boolean;
}
export const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <Flex centered>
      <ClipLoader loading={loading} />
    </Flex>
  );
};
