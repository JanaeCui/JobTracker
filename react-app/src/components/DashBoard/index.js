
import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton/index';
import ProfileName from '../ProfileName/index';
import styles from "./DashBoard.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UilSearch } from '@iconscout/react-unicons'
import { UilPlus } from '@iconscout/react-unicons'
import ProfilePicture from "../ProfilePicture/index"
import { FaRegBell } from "react-icons/fa"
import { IoLogOutOutline } from "react-icons/io5"


const DashBoard = () => {


  return (

        <div className={`${styles.outerContainer}`}>
          <div className={`${styles.leftBar} .col-xs-6`}>
            <div className={styles.profileGroup}>
              <ProfilePicture/>
              <div className={styles.sayHiGroup}>
                <div className={styles.hey}>Hey</div>
                <ProfileName/>
              </div>
            </div>
            <div className={styles.leftBarBottom}>
              <div className={styles.alarmGroup}>
                <FaRegBell className={styles.leftBarIcon}/>
                {/* <LogoutButton className={styles.AlarmButton}/> */}
              </div>
              <div className={styles.logOutGroup}>
                <IoLogOutOutline className={styles.leftBarIcon}/>
                <LogoutButton className={styles.logOutButton}/>
              </div>
            </div>
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
