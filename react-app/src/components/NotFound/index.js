import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotFound.module.css";
import notFoundImg from '../../images/notFoundImg.png'
const NotFound = () => (
  <div className={styles.outerContainer}>
    <h1 className={styles.notFoundText}>404 - Not Found!</h1>
    <div className={styles.mainPart}>
        <Link className={styles.linkBackToHome} to="/">
        Back To Home
        </Link>
        <img className={styles.notFoundImg} src={notFoundImg}></img>
    </div>
  </div>
);

export default NotFound;
