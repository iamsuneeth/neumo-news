import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { fetchLatestUKNews } from "../core/api/server";
import { Headlines } from "../components/home/Headlines";
import { Switch } from "../components/home/Switch";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "../components/home/Search";

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [searchEnabled, setSearchEnabled] = useState(false);
  const onEnabled = () => {
    setSearchEnabled((state) => !state);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Neumo News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Switch onToggle={onEnabled} value={searchEnabled} />
      <div
        style={{ display: "flex", overflow: "hidden", position: "relative" }}
      >
        <AnimatePresence>
          {!searchEnabled && (
            <motion.div
              style={{ flex: "1 0 100%" }}
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Headlines headlines={data?.articles || []} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {searchEnabled && (
            <motion.div
              style={{ flex: "1 0 100%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Search />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchLatestUKNews({});
  return {
    props: {
      data,
    },
  };
};
