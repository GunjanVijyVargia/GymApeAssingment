import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function PostList({ posts, title, currentUser, onDeletePost }) {
  const user = JSON.parse(localStorage.getItem('loggedInUser')) || [];
  const [postsList, setPostsList] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPostsList(storedPosts);
  }, []);
  return (
    <div className='  border-0  d-flex justify-content-center align-items-center flex-column'>
      <h2>{title}</h2>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul className='p-3 border w-50 list-group'>
          {posts.map((post) => (
            <li className='list-group-item' key={post.id}>
              <p>title: {post.title}</p>
              <p>date: {post.selectedDate}</p>
              <p>createby: {user.userName}</p>
              {post.id === currentUser?.email && (
                <>
              <button className="btn btn-primary me-2 " onClick={() => navigate(`/create-post/${post.id}`)}>Update</button>
                  <button className="btn btn-primary" onClick={() => onDeletePost(post.id)}>Delete</button>
                  </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
