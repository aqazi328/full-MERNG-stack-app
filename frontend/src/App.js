import React from 'react';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {AuthProvider} from './auth.js'
import AuthRoute from './AuthRoute.js';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Home from './pages/Home';
import UserIssues from './pages/UserIssues.js';
import Login from './pages/Login';
import AddIssue from './pages/AddIssue.js';
import Issue from './pages/Issue.js';

function App(){
  return (
    <div class="bg-slate-900">
    <AuthProvider>
      <Router>
        <Navbar/>
        <br/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/user-issues' element={<UserIssues/>}/>
          <Route exact path='/addissue' element={<AddIssue/>}/>
          <Route exact path="/issues/:issue_id" element={<Issue/>}/>
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
