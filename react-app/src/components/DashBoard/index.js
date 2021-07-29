
import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';
import ProfileName from '../ProfileName/index';




const DashBoard = () => {


  return (

        <div>
          <h1>My jobs Page</h1>
          <LogoutButton/>
          <ProfileName/>
        </div>


  );
}

export default DashBoard;
