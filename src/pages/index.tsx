import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import Library from "../components/Library";

import { Toaster } from "react-hot-toast";

import Main from "../components/Main";
import Search from "../components/Search";

const Home: NextPage = () => {
  const [feature, setFeature] = React.useState<"search" | "library">("search");

  const featureComponent = feature === "search" ? <Search /> : <Library />;

  return (
    <>
      <Head>
        <title>Semantic Search with OpenAI embeddings + Pinecone</title>
        <meta
          name="description"
          content="Semantic search using openai embeddings + pinecone"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <>
          <span className="isolate mb-10 inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onClick={() => setFeature("search")}
            >
              Search
            </button>

            <button
              type="button"
              className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              onClick={() => setFeature("library")}
            >
              Library
            </button>
          </span>

          {featureComponent}
        </>
      </Main>

      <Toaster />
    </>
  );
};

export default Home;
