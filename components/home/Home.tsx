import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Headlines } from "./Headlines";
import styled from "styled-components";
import { Flex } from "../common/styles/Flex";
import { Search } from "./Search";
import { SearchBox } from "./SearchBox";
import { useDebounce } from "../../hooks/useDebounce";

interface HomeProps {
  data: any;
}

const HomeContainer = styled(Flex)`
  overflow: hidden;
  position: relative;
`;

export const Home = ({ data }: HomeProps) => {
  const [searchString, setSearchString] = useState<string>(null);

  const search = (value: string) => {
    setSearchString(value);
  };

  const debouncedSearch = useDebounce(searchString);

  return (
    <HomeContainer direction="column">
      <SearchBox onChange={search} />
      <AnimatePresence>
        {!searchString && (
          <motion.div
            style={{ flex: "1 0 100%" }}
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Headlines headlines={data} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {debouncedSearch && (
          <motion.div
            style={{ flex: "1 0 100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Search searchString={debouncedSearch} />
          </motion.div>
        )}
      </AnimatePresence>
    </HomeContainer>
  );
};
