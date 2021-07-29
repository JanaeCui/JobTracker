import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import styles from '../LogoutButton/LogoutButton.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className={styles.LogoutButton} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
