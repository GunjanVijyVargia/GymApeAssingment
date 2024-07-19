import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function CreatePost({ onAddPost, editPost,posts }) {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  // useEffect(() => {
  //   if (editPost) {
  //     setTitle(editPost.title);
  //     setSelectedDate(editPost.selectedDate);
  //   } else {
  //     setTitle('');
  //     setSelectedDate('');

  //   }
  // }, [editPost]);
  useEffect(() => {
    if (id) {
      const postToEdit = posts.find(post => post.id === parseInt(id));
      if (postToEdit) {
        setTitle(postToEdit.title);
        setSelectedDate(postToEdit.selectedDate);
      }
    }
  }, [id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({ id: id ? parseInt(id) : undefined, title, selectedDate, approved: false, user: 'me' });
    setTitle('');
    setSelectedDate('');
    navigate('/list')
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      toast.error('You must be logged in to create a post');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ title, selectedDate, createBy: loggedInUser.userName });
    localStorage.setItem('posts', JSON.stringify(posts));
    toast.success('Post created successfully')
  };

  return (
    <div className='w-100 d-flex align-items-center justify-content-center flex-column '>
      <div className='w-100 text-left  p-2'>
        <button className='btn btn-primary px-2' onClick={() => navigate('/home')}>Back</button>
      </div>
      <h2>{id ? 'Edit Post' : 'Create a New Post'}</h2>
      <form className='shadow-lg rounded p-5 w-25' onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            className="form-control form-control-sm"
            placeholder='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            className="form-control form-control-sm"
            placeholder='date'
            type='date'
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <button className="btn btn-primary " type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

export default CreatePost;
