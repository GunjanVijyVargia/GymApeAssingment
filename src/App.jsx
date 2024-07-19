import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './component/login';
import Register from './component/register';
import Home from './component/home';
import CreatePost from './component/createPost';
import PostList from './component/viewPost';
import AdminPanel from './component/adminScreen';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "./App.css";
function App() {
  const navigate =useNavigate()
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  const handleAddPost = (post) => {
    if (post.id) {
      setPosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      post.id = posts.length + 1;
      post.author = currentUser.email;
      setPosts([...posts, post]);
    }
    // setPosts([...posts, { ...newPost, id: posts.length + 1, accepted: false }]);
    // setEditPost(null)
  };
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const handleRegister = (newUser) => {
    setUsers([...users, newUser]);
  };
  console.log(currentUser.email,'jsdlkasdj')
  const handleLogin = ({ email, password }) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setCurrentUser(user);
      navigate('/home')
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/")
  };

  const handleEditPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    setEditPost(post);
    navigate('/create-post')
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };
  
  const handleAcceptPost = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, accepted: true } : post));
  };
  return (
    <>
      
      <Routes>
      <Route exact path="/" component={Login} element={<Login onLogin={handleLogin}   />}  />
        <Route path="/register"  element={<Register  onRegister={handleRegister}/>} />
        <Route path="/home" element={<Home  onLogout={handleLogout}  user={currentUser} />} />
        <Route path="/admin-panel" element={<AdminPanel  onAcceptPost={handleAcceptPost} posts={posts} onDeletePost={handleDeletePost} />} />
        
        <Route path="/create-post/:id" element={<CreatePost posts={posts} onAddPost={handleAddPost} />} />
        <Route path="/create-post" element={<CreatePost posts={posts} onAddPost={handleAddPost} />} />
        <Route path="/list" element={<PostList posts={posts} onEditPost={handleEditPost}  currentUser={currentUser}
          editPost={editPost} 
        onDeletePost={handleDeletePost} />}  />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
