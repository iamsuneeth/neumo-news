import React, { useState, ReactElement, useEffect } from "react";
import { AccordionContext } from "./AccordionContext";
import { AnimatePresence } from "framer-motion";

interface AccordionProps {
  children: ReactElement[];
}

export const Accordion = ({ children }: AccordionProps) => {
  const [activePanel, setActivePanel] = useState(-1);
  useEffect(() => {
    setActivePanel(-1);
  }, [children]);

  return (
    <AccordionContext.Provider
      value={{
        active: activePanel,
        setActive: setActivePanel,
      }}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </AccordionContext.Provider>
  );
};
