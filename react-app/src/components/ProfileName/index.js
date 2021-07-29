import React, { useState, useContext, useEffect } from 'react';
import { Typography, InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../store/session';

export default function ProfileName() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
//   const { updateListTitle } = useContext(storeApi);
  const allUsers = useSelector((state) => Object.values(state.session));
  console.log(allUsers[0].username)
  const name = allUsers[0].username
  const [newTitle, setNewTitle] = useState(name);

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = () => {
    dispatch(updateUser(newTitle))
    // updateListTitle(newTitle, listId);
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
          <Typography
            onClick={() => setOpen(!open)}
          >
           {name}
          </Typography>
        </div>
      )}
    </div>
  );
}
