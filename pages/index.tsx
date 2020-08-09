import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { fetchLatestUKNews } from "../core/api/server";
import { Home } from "../components/home/Home";

export default function ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Neumo News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home data={data} />
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
