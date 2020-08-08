import styled from "styled-components";

interface FlexProps {
  centered?: true | "vertical" | "horizontal";
  direction?: "row" | "column";
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-evenly"
    | "space-between";
  align?: "start" | "end" | "center";
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-flow: ${({ direction = "row" }) => direction};
  justify-content: ${({ justify = "flex-start" }) =>
    (justify === "center" && "center") ||
    (justify === "end" && "flex-end") ||
    (justify === "start" && "flex-start") ||
    justify};
  align-items: ${({ align = "stretch" }) =>
    (align === "center" && "center") ||
    (align === "end" && "flex-end") ||
    (align === "start" && "flex-start") ||
    align};
  ${({ centered }) => {
    switch (centered) {
      case "vertical":
        return `align-items:center`;
      case "horizontal":
        return `justify-content: center;`;
      case true:
        return `align-items:center;
                justify-content: center;`;
    }
  }};
`;
