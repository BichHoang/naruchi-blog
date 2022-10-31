import React from 'react';
import { useRouter } from 'next/router';
import useTrans from '../../hooks/useTrans';
import { CarouselPosts } from '../../sections/index';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts, getPostDetails } from '../../services';
import Head from 'next/head';
import { setCategoryCurrentSlug } from '../../slices/commonSlice';
import { useDispatch } from 'react-redux';

const PostDetails = ({ post }) => {
  const router = useRouter();
  const trans = useTrans();
  const dispatch = useDispatch();

  if (post) {
    dispatch(setCategoryCurrentSlug(post.categories[0].slug));
  }

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{ trans.website.webname } - { post.title }</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={ post } />
            <Author author={ post.author } />
            <h3 className="text-xl font-semibold p-4">{ trans.title.relatedPosts }</h3>
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget selfId={post.id} parentId={ post.parentId || post.id } slug={post.slug} />
              <Categories />
            </div>
          </div>
        </div>
        { post && post.categories.length > 0 &&
          <CarouselPosts type={ 'releted' } slug={post.slug} categories={post.categories.map((category) => category.slug)} />
        }
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
