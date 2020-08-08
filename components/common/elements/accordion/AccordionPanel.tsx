import React, { ReactNode, ReactNodeArray, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccordionContext } from "./useAccordionContext";
import styled from "styled-components";

interface AccordionPanelProps {
  id: number;
  children: ReactNode | ReactNodeArray;
  header: ReactNode;
  section?: ReactNode;
}

const StyledPanel = styled(motion.div)<{ border?: boolean }>`
  margin-bottom: 1rem;
  border-bottom: 0;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.09), 0 1px 2px rgba(0, 0, 0, 0.14);
  background-color: #fff;
  overflow: hidden;
  padding: 1rem;
  ${(props) => props.border && `border-top:2px solid #ff6584`}
`;

const StyledPanelHeader = styled.div`
  margin: 0;
  display: flex;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const StyledArrowContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  transform-origin: 50% 50%;
`;

const Flexible = styled.div`
  flex: 1;
`;

export const AccordionPanel = ({
  id,
  children,
  header,
  section,
}: AccordionPanelProps) => {
  const { active, setActive } = useAccordionContext();
  const isActive = active === id;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }
    const timeOut = setTimeout(() => {
      const measure = ref.current!.getBoundingClientRect();

      const { top, height } = measure;
      const middle = window.innerHeight / 2;
      if (top > middle) {
        let scrollTop =
          window.scrollY +
          parseInt(
            getComputedStyle(document.documentElement).fontSize.replace(
              "px",
              ""
            )
          );
        if (height > window.innerHeight) {
          scrollTop += 10;
        } else {
          scrollTop += top - middle + height / 2;
        }
        window.scrollTo({
          behavior: "smooth",
          top: scrollTop,
        });
      } else if (top < middle) {
        let scrollTop =
          window.scrollY -
          parseInt(
            getComputedStyle(document.documentElement).fontSize.replace(
              "px",
              ""
            )
          );
        if (height > window.innerHeight) {
          scrollTop -= 10;
        } else {
          scrollTop -= middle - top - height / 2;
        }
        window.scrollTo({
          behavior: "smooth",
          top: scrollTop,
        });
      }
    }, 400);
    return () => clearTimeout(timeOut);
  }, [isActive]);

  return (
    <>
      {section && section}
      <StyledPanel
        ref={ref}
        id={id + ""}
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0 }}
        border={!!section}
      >
        <StyledPanelHeader onClick={() => setActive(isActive ? -1 : id)}>
          <Flexible>{header}</Flexible>
          <StyledArrowContainer animate={{ rotate: isActive ? 180 : 0 }}>
            {"‣"}
          </StyledArrowContainer>
        </StyledPanelHeader>
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.section
              key="content"
              initial="collapsed"
              animate={isActive ? "open" : "collapsed"}
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              exit="collapsed"
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {children}
            </motion.section>
          )}
        </AnimatePresence>
      </StyledPanel>
    </>
  );
};
