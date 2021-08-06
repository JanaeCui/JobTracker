import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/index';
import SignUpForm from './components/auth/SignUpForm/index';
import NavBar from './components/NavBar/index';
import LogoutButton from './components/auth/LogoutButton/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import LandingPage from './components/LandingPage';
import DashBoard from './components/DashBoard/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './components/NotFound'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm  />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/jobs' exact={true} >
          <DashBoard/>
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <LandingPage/>
        </Route>
        <Route path='*'><NotFound /></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
