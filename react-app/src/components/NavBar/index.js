
import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton/index';
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png"



const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  const history = useHistory();
  const routeChange = () =>{
    let path = `/`;
    history.push(path);
  }

  const logInRouteChange = ()=>{
    let path = `/login`
    history.push(path);
  }

  const signUpRouteChange = ()=>{
    let path = `/sign-up`
    history.push(path);
  }

  return (
    <nav>
      <div className={styles.navBarOuterDiv}>
        <div>
          {/* <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink> */}
           <img className={styles.logo} src={logo} onClick={routeChange}></img>
        </div>
        <div>
          {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink> */}
          {user? null: <button onClick={logInRouteChange}  className={styles.logInButton}>Log In</button> }
          {user? null: <button onClick={signUpRouteChange}  className={styles.signUpButton}>Sign Up</button>}
        </div>
        {/* <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {/* <li>
          <LogoutButton />
        </li> */}
      </div>
    </nav>
  );
}

export default NavBar;
