import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { grpahCMSImageLoader } from '../util';

const PostCard = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
    <div className="relative overflow-hidden shadow-md pb-80 mb-6">
      <img src={post.featuredImage.url} alt="" className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
    </div>

    <h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-base-600 text-3xl font-semibold">
      <Link href={`/post/${post.slug}`}>{post.title}</Link>
    </h1>
    <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
      <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.author.name}
          height="30px"
          width="30px"
          className="align-middle rounded-full"
          src={post.author.avatar.url}
        />
        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
      </div>
      <div className="font-medium text-gray-700 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-base-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="align-middle">{moment(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
      {/* <div className="font-medium text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-1 text-base-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="align-middle">{ post.views }</span>
      </div> */}
    </div>
    <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
      {post.description}
    </p>
    <div className="text-center">
      <Link href={`/post/${post.slug}`}>
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-base-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Đọc tiếp</span>
      </Link>
    </div>
  </div>
);

export default PostCard;
