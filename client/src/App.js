import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Edit from './components/Edit';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/api" element={<BlogList />} />
          <Route path="/api/signin" element={<SignIn />} />
          <Route path="/api/signup" element={<SignUp />} />
          <Route path="/api/editPost/:postId" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
