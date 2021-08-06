import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import {clearAllJobsLogOut} from'../../../store/jobs';
import styles from '../LogoutButton/LogoutButton.module.css'
import { useHistory} from 'react-router-dom';
import { useSelectedBoard } from '../../../context/SelectedBoard';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const {selected, setSelected}= useSelectedBoard();
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(clearAllJobsLogOut());
    setSelected("")
    history.push("/");
  };

  return <button className={styles.LogoutButton} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
