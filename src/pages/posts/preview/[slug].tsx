import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { getSession, useSession } from "next-auth/client";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviwProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviwProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.userActiveSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.subscribeButton}>
            Get full access!
            <Link href="/">
              <a>Subscribe now!🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    /*
    For static generation in build.
    Include slugs that should be generated in build process.

    paths: [
      {
        params: {slug: 'here goes the slug'}
      }
    ],
    */
    paths: [],

    /**
     * Fallback:
     *
     * "true": call server to get content from client brownser, causes layout shift, it will
     * load page without content and then display content when ready
     *
     * "false": it it was not yet generated, returns 404
     *
     * "blocking": if content was not generated, next will generate it and then serve it to client
     */
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
