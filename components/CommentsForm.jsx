import React, { useState, useEffect } from 'react';
import { submitComment, publishComment, getComments } from '../services';
import { setComments } from '../slices/commentSlice';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../util';

const CommentsForm = ({ slug }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', content: '', storeData: false });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      username: window.localStorage.getItem('username'),
      email: window.localStorage.getItem('email'),
      content: '',
      storeData: window.localStorage.getItem('username') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { username, email, content, storeData } = formData;

    if (!username || !email || !content) {
      setError(true);
      setMessage('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError(true);
      setMessage('Invalid email address format');
      return;
    }
    const commentObj = {
      username,
      email,
      content,
      slug,
    };

    if (storeData) {
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          publishComment(res.createComment.id)
            .then((response) => {
              getComments(response.post.slug).then((result) => {
                dispatch(setComments(result));
              })
              if (!storeData) {
                setFormData({
                  username: '',
                  email: ''
                })
              }
              setFormData({
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                content: '',
                storeData: storeData,
              })
            })
            .catch(() => {
              setFormData((prevState) => ({
                ...prevState,
                ...formData,
              }));
              setShowSuccessMessage(true);
              setTimeout(() => {
                setShowSuccessMessage(false);
              }, 3000);
            });
          
        }
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Để lại bình luận</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.content} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="content" placeholder="Bình luận..." />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.username} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Name" name="username" />
        <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Lưu lại tên và mail cho lần bình luận tiếp theo.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{message}</p>}
      <div className="mt-8 flex justify-end">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-base-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Bình luận</button>
      </div>
    </div>
  );
};

export default CommentsForm;
