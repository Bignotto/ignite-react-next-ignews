import { GetStaticProps } from "next";
import Head from "next/head";
import { stripe } from "../services/stripe";

import { SubscribeButton } from "../components/SubscribeButton";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - ig.News</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all publications for <br />
            <span>${product.amount} month.</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Coding Girl" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1ImNuABGPp9lvJz3ZL8UoLUq", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24hs
  };
};
