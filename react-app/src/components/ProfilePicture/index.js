import React, { useState, useContext, useEffect } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import styles from "./ProfilePicture.module.css";

export default function ProfileName() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const allUsers = useSelector((state) => Object.values(state.session));
  const name = allUsers[0].username

  return (
    <div>
     <div className={styles.profilePictureDiv}>{name[0]}</div>
    </div>
  );
}
