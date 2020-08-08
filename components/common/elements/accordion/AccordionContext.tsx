import React from "react";

interface IAccordionContext {
  active: number;
  setActive: (panel: number) => void;
}
export const AccordionContext = React.createContext<IAccordionContext>({
  active: -1,
  setActive: () => {},
});
