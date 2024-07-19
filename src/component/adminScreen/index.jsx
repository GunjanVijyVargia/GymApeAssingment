import React from 'react';

function AdminPanel({ posts, onAcceptPost, onDeletePost }) {
  return (
    <div>
      <h2>Admin Panel</h2>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.selectDate}</p>
              <p>Status: {post.accepted ? 'Accepted' : 'Pending'}</p>
              {!post.accepted && (
                <button onClick={() => onAcceptPost(post.id)}>Accept</button>
              )}
              <button onClick={() => onDeletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPanel;

