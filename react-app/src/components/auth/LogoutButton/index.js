import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import styles from '../LogoutButton/LogoutButton.module.css'
import { useHistory} from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  return <button className={styles.LogoutButton} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
