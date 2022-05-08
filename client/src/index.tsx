import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './custom.scss';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLogin from './views/HomeLogin';
import HomeRegister from './views/HomeRegister';
import Home from './views/Home';
import NewReta from './views/NewReta';
import GuestRoute from './utils/GuestRoute';
import ProtectedRoute from './utils/ProtectedRoute';
import RetaDetail from './views/RetaDetail';
import UserProfile from './views/UserProfile';
import EditUserProfile from './views/EditUserProfile';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/create_reta' element={<NewReta />} />
        <Route path='/user_profile' element={<UserProfile />} />
        <Route path='edit_user_profile' element={<EditUserProfile />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path='/login' element={<HomeLogin />} />
        <Route path='/register' element={<HomeRegister />} />
      </Route>
      <Route path='/reta/:retaId' element={<RetaDetail />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
