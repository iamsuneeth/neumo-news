import React, { ReactNode } from "react";
import { StyledArticle } from "../common/styles/Article";

export interface ArticleProps {
  header?: ReactNode;
}

export const Article: React.FC<ArticleProps> = ({ children, header }) => {
  return (
    <StyledArticle>
      {header && header}
      <section>{children}</section>
    </StyledArticle>
  );
};
