
import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';
import ProfileName from '../ProfileName/index';
import styles from "./DashBoard.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UilSearch } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'

const DashBoard = () => {


  return (

        <div className={`${styles.outerContainer}`}>
          <div className={`${styles.leftBar} .col-xs-6`}>
            <LogoutButton/>
            <ProfileName/>
          </div>
          <div className={styles.rightPart}>
            <div className={styles.rightPartTopDiv}>
              <div className={styles.searchBarAndIcon}>
                <input placeholder="Search Company name, date, location" className={styles.searchBar} />
                <UilSearch className={styles.searchIcon}/>
              </div>
            </div>
            <div className={styles.rightPartBottomDiv}>
                <div className={`${styles.appliedSection} .col-xs-6 .col-sm-3`}>
                  <div className={styles.applicationTitle}>APPLIED</div>
                  <div className={styles.colorUnderlineApplied}></div>
                </div>
                <div className={`${styles.interviewedSection} .col-xs-6 .col-sm-3`}>
                  <div className={styles.applicationTitle}>INTERVIEW</div>
                  <div className={styles.colorUnderlineInterviewed}></div>
                </div>
                <div className={`${styles.offeredSection} .col-xs-6 .col-sm-3`}>
                  <div className={styles.applicationTitle}>OFFER</div>
                  <div className={styles.colorUnderlineOffered}></div>

                </div>
                <div className={`${styles.rejectedSection} .col-xs-6 .col-sm-3`}>
                  <div className={styles.applicationTitle}>REJECTED</div>
                  <div className={styles.colorUnderlineRejected}></div>
                </div>
            </div>
          </div>
          <UilPlus className={styles.dashBoardBigPlusButton}/>
        </div>


  );
}

export default DashBoard;
