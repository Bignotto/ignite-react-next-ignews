import Head from "next/head";

import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.News</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>24 Maio 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a monorepo to manage
              multiple pagckages with a shared build, test and release process.
            </p>
          </a>
          <a href="#">
            <time>24 Maio 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a monorepo to manage
              multiple pagckages with a shared build, test and release process.
            </p>
          </a>
          <a href="#">
            <time>24 Maio 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a monorepo to manage
              multiple pagckages with a shared build, test and release process.
            </p>
          </a>
          <a href="#">
            <time>24 Maio 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a monorepo to manage
              multiple pagckages with a shared build, test and release process.
            </p>
          </a>
          <a href="#">
            <time>24 Maio 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a monorepo to manage
              multiple pagckages with a shared build, test and release process.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
