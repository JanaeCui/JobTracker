import React, { useState, useContext, useEffect } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../store/session';
import { NavLink, useHistory } from "react-router-dom";
import styles from "./ProfileName.module.css";

export default function ProfileName() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const allUsers = useSelector((state) => Object.values(state.session));
  console.log(allUsers[0].username)
  const name = allUsers[0].username
  const [newTitle, setNewTitle] = useState(name);

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    dispatch(updateUser(newTitle))
    setOpen(false);
  };
  return (
    <div>
      {open ? (
        <div>
          <InputBase
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div>
          <NavLink
            className={styles.NavLink}
            to ="#"
            onClick={() => setOpen(!open)}
          >
           {name}
          </NavLink>
        </div>
      )}
    </div>
  );
}
