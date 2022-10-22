import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';

import { grpahCMSImageLoader } from '../util';
import { getPostsSameSeries, getRecentPosts } from '../services';
import useTrans from '../hooks/useTrans';

const PostWidget = ({ parentId, slug }) => {
  const trans = useTrans();
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (parentId) {
      getPostsSameSeries(parentId, parentId).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? "Cùng bài viết" : trans.title.recentPosts}</h3>
      {relatedPosts.map((post, index) => (
        <a href={`/post/${post.slug}`} key={index} className="flex items-center w-full mb-4 hover:text-base-600">
          <div className="w-16 flex-none">
            <Image
              loader={grpahCMSImageLoader}
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY HH:mm:ss')}</p>
            <p className="text-md" key={index}>{post.title}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PostWidget;
