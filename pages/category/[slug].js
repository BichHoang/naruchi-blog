import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { grpahCMSImageLoader } from '../../util';
import { getCategories, getCategoryPost } from '../../services';
import { Categories, Loader, Pagination } from '../../components';
import moment from 'moment';
import Image from 'next/image';
import { setCategoryCurrentSlug } from '../../slices/commonSlice';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

const CategoryPost = () => {
  const router = useRouter();
  const categorySlug = router.query.slug;
  const dispatch = useDispatch();
  const perPage = 5;
  dispatch(setCategoryCurrentSlug(categorySlug || ''));
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(1);
  const currentPage = router.query.page || 1;

  if (router.isFallback) {
    return <Loader />;
  }

  useEffect(() => {
    getCategoryPost(categorySlug, perPage, (currentPage - 1) * perPage)
    .then((result) => {
      const [posts, totalItems] = result;
      setPosts(posts);
      setTotalItems(totalItems);
    });
    
  }, [router.query.slug, router.query.page])

  return (
    <>
      <Head>
        <title>Juneyai </title>
      </Head>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {/* {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))} */}
            {posts.map((post, index) => (
              <a href={`/post/${post.slug}`} key={index}
                className="flex shadow-lg items-center w-full mb-4 border p-1 rounded-lg hover:text-base-600">
                <div className="w-16 flex-none">
                  <Image
                    loader={grpahCMSImageLoader}
                    alt={post.title}
                    height="60px"
                    width="60px"
                    unoptimized
                    className="align-middle"
                    src={post.featuredImage.url}
                  />
                </div>
                <div className="flex-grow ml-4">
                  <h2 className="text-lg font-bold">{ post.title }</h2>
                  <div className="flex justify-between mr-5">
                    <h3 className="text-sm italic">{post.author.name}</h3>
                    <p className="text-gray-500 text-sm font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                  </div>
                  <p className="text-md">{post.description}</p>
                  <div className="flex justify-end mr-4 hover:text-base-600 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <p>Chi tiết</p>
                  </div>
                </div>
              </a>
            ))}
            <Pagination totalItems={totalItems} currentPage={currentPage} pageUrl={`/category/${categorySlug}?page=`} perPage={perPage} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
// export async function getStaticProps({ params }) {
//   const [posts, totalItems] = await getCategoryPost(params.slug, 2, 0);

//   return {
//     props: { posts, totalItems },
//   };
// }

// export async function getStaticPaths() {
//   const categories = await getCategories();

//   return {
//     paths: categories.map(({ slug }) => ({ params: { slug } })),
//     fallback: true,
//   };
// }
