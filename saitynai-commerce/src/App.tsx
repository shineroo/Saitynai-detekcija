import React, { useState } from 'react';
import './css/App.css'
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contacts from './pages/Contacts';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage'
import Auth from './pages/Auth';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';

function App() {
  let component
  
  const path = window.location.pathname.split("/")
  switch(path[1]) {
    case "":
      component = <Home/>
      break
    case "catalog":      
      component = <Catalog/>
      break
    case "privacy":
      component = <PrivacyPolicy/>
      break
    case "contacts":
      component = <Contacts/>
      break
    case "product":
      component = <ProductPage product_id={parseInt(path[2])}/>
      break
    case "auth":
      component = <Auth token={parseInt(path[2])}/>
      break
    case "login": // restrict if logged in
      component = <SignIn/>
      break
    case "register":
      component = <SignUp/>
      break
    case "profile": // restrict if not logged in
      component = <Profile/>
      break
    case "admin": // restrict if not administrator
      component = <Admin/>
      break
    default:
      component = <Home/>
      break
  }

  return (
    <>
      <Navbar/>
      <div className='page-container'>
        {component}
      </div>
    </>
  )
}

export default App