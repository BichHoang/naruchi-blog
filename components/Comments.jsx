import React, { useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';
import { setComments } from '../slices/commentSlice';
import { useSelector, useDispatch } from 'react-redux';

const Comments = ({ slug }) => {
  const comments = useSelector((state) => state.comments.comments)
  const dispatch = useDispatch();

  useEffect(() => {
    getComments(slug).then((result) => {
      dispatch(setComments(result));
    });
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            Comments
          </h3>
            {comments.map((comment, index) => (
              <div key={index} className="border-b-2 border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{comment.username}</span>
                  {' '}
                  on
                  {' '}
                  <span className="text-sm">{moment(comment.createdAt).format('MMM DD, YYYY')}</span>
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.content)}</p>
                {/* <a href="#" className="text-sm text-base-info">Reply</a> */}
                {comment.comments.map((comment, index) => (
                  <div key={index} className="border-t border-gray-100 ml-8 mt-4 pt-4">
                    <p className="mb-4">
                      <span className="font-semibold">{comment.username}</span>
                      {' '}
                      on
                      {' '}
                      <span className="text-sm">{moment(comment.createdAt).format('MMM DD, YYYY')}</span>
                    </p>
                    <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.content)}</p>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Comments;
