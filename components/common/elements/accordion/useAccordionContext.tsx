import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Panel components need to be inside an accordion component"
    );
  }
  return context;
};
