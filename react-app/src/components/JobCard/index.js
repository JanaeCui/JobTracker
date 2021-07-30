import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./JobCard.module.css";
import { UilTrashAlt } from '@iconscout/react-unicons'
import { UilPen } from '@iconscout/react-unicons'

function JobCard() {

  return (
    <div className={styles.jobCardOuterDiv}>
        <div className={styles.logoDiv}>
            <div className={styles.logo}><span className={styles.logoText}>logo</span></div>
        </div>
        <div className={styles.contentDiv}>
            <div className={styles.positionTitle}>Web Developer</div>
            <div className={styles.companyName}>Google</div>
            <div className={styles.date}>Applied at 2021 07/28 12:20</div>
        </div>
        <div className={styles.buttons}>
            <UilPen className={styles.editButton}/>
            <UilTrashAlt className={styles.deleteButton}/>
        </div>
    </div>
  );
}
export default JobCard;
