import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home({ onLogout, users }) {
  const navigate = useNavigate();
  const [yourPost, setYourPost] = useState()


  return (


    <div className='d-flex align-items-center justify-content-center flex-column w-100'>

      <div className='d-flex align-items-center justify-content-end w-100 mt-3   '  >
        <button className=' btn btn-primary  me-3 ' onClick={onLogout}>Logout</button>
      </div>
      <div className='w-50 card shadow-lg p-4'>
        <label>Enter Your Post</label>
        <input
          placeholder="Enter Your Post"
          className="form-control form-control-sm w-50 mb-3"
          type="text"
          onChange={(e) => setYourPost(e.target.value)}
        />
        <div className='d-flex align-items-center justify-content-n=between gap-3 w-100'>

          <button className=' btn btn-primary w-50 ' onClick={() => navigate('/create-post')} >Create Posts</button>
          <button className=' btn btn-primary   w-50' onClick={() => navigate('/list')} >View My Posts</button>
          <button className=' btn btn-primary  w-50 ' onClick={() => navigate('/users-post')} >View Other User Posts</button>
        </div>
      </div>
    </div>
  );
}

export default Home;

