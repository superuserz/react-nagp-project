import './App.css';
import { Route } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Navbar from './components/navigation/Navbar';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { useEffect, useState } from 'react';
import * as constants from './shared/constants/AppConstants';
import { Redirect } from 'react-router';
import NotFound from './pages/default/NotFound';




function App() {

  const [authenticated, setAuthentication] = useState(false);
  useEffect(() => {

    const login = sessionStorage.getItem(constants.LOGGED_IN_KEY);
    if (login && login === 'true') {
      setAuthentication((prevState) => {
        return true;
      });
    } else {
      setAuthentication((prevState) => {
        return false;
      });
    }
    return () => { }
  }, [authenticated])

  const renderRedirect = () => {
    if (authenticated) {
      return <Redirect to="/home"></Redirect>
    } else {
      return <Redirect to="/login"></Redirect>
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/register">
        <Register></Register>
      </Route>
      <Route path="/home">
        <Home></Home>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>

      {renderRedirect()}
    </div>
  );
}

export default App;
