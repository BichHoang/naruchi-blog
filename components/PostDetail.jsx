import React from 'react';
import moment from 'moment';
import { getContentFragment } from '../util'

const PostDetail = ({ post }) => {

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        {post.isShowFeaturedImage &&
          <div className="relative overflow-hidden shadow-md mb-6">
            <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
          </div>
        }
        <div className="px-4 lg:px-0">
          <div className="flex">
            {/* <div className="flex flex-col mr-8 pt-16 text-gray-400 font-bold text-center">
              <div>
                <button type="button" className="hover:cursor-pointer hover:text-gray-600">
                  <svg stroke="currentColor" fill="currentColor" width="36" height="36" viewBox="0 0 36 36">
                    <path d="M2 25h32L18 9 2 25Z"></path>
                  </svg>
                </button>
                <p className="text-center">{ post.score }</p>
                <button type="button" className="hover:cursor-pointer hover:text-gray-600">
                  <svg stroke="currentColor" fill="currentColor" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
                </button>
                <button className="pt-2 hover:cursor-pointer hover:text-gray-600 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </button>
              </div>
            </div> */}
            <div>
              <div className="flex justify-between items-center mb-8 w-full">
                <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
                  <img
                    alt={ post.author.name }
                    height="30px"
                    width="30px"
                    className="align-middle rounded-full"
                    src={ post.author.avatar.url }
                  />
                  <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{ post.author.name }</p>
                </div>
                <div className="font-medium text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-base-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="align-middle text-sm">{moment(post.createdAt).format('MMM DD, YYYY HH:m:s')}</span>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mx-2 text-base-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="align-middle">{ post.views }</span> */}
                </div>
              </div>
              <h1 className="mb-5 text-3xl font-semibold">{ post.title }</h1>
              {post.content.raw.children.map((typeObj, index) => {
                const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

                return getContentFragment(index, children, typeObj, typeObj.type);
              })}
            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default PostDetail;
