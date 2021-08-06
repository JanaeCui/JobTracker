import React, { useState, useContext, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../store/session';
import { NavLink} from "react-router-dom";
import styles from "./ProfileName.module.css";
import { makeStyles } from '@material-ui/core/styles';

export default function ProfileName() {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const allUsers = useSelector((state) => Object.values(state.session));
  const name = allUsers[0].username
  const [newTitle, setNewTitle] = useState(name);
  const [errors, setErrors] = useState(false)

  const useStyle = makeStyles(() => ({
    input: {
      fontWeight: 'bold',
      width:'7rem',
      multiline: true,
      '&:focus': {
        color: '#FFCB00',
        multiline: true,
      },
    },
  }));

  const classes = useStyle();

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnBlur = async(e) => {
    if (e.target.value !== ""){
      const result = await dispatch(updateUser(newTitle))
      
      if(!result){
        setErrors(true)
        setTimeout(()=>{
          setErrors(false)
        }, 3000)
      }
    }else {
      setNewTitle(name)
    }

    setOpen(false);
  };
  return (
    <div >
      {open ? (
        <div>
          <InputBase
            _invalid={{
              borderColor: 'red:50',
            }}
            inputProps={{
              className: classes.input,
            }}
            onChange={handleOnChange}
            autoFocus
            value={newTitle}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <>
          <div className={styles.originNameDiv}>
            <NavLink
              className={styles.NavLink}
              to ="#"
              onClick={() => setOpen(!open)}
            >
              <span className={styles.name}>{name}</span>
            </NavLink>
          </div>
          <div>
            {errors && <span className={styles.error}>Can not change to exited name!</span>}
          </div>
        </>
      )}
    </div>
  );
}
