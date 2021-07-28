import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import styles from "./LandingPage.module.css";
import NavBar from '../NavBar';
import landingPageImg1 from '../../images/landingPageImg1.png'
import landingPageImg2 from '../../images/landingPageImg2.png'
import landingPageImg3 from '../../images/landingPageImg3.png'
import landingPageImg4 from '../../images/landingPageImg4.png'
import logo from "../../images/logo.png"

const LandingPage = () => {

    const history = useHistory();
    const routeChange = () =>{
      let path = `/jobs`;
      history.push(path);
    }


    return (
        <div className={styles.outerDiv}>
            <NavBar />
            <div className={styles.landingPageOuterDiv}>
                <div className={styles.group1}>
                    <div className={styles.group1section1}>
                        <div className={styles.section1BigTitle}>Make your job searching easier! The only management tool you need.</div>
                        <div className={`${styles.section1description} ${styles.description}`}>Save and track jobs from any where.</div>
                        <button onClick={routeChange} className={styles.section1Button}>Get Started</button>
                    </div>
                    <img className={styles.group1section2img} src={landingPageImg1}></img>
                </div>
                <div className={styles.group2}>
                    <div className={styles.group2section1title}>Features</div>
                    <div className={`${styles.group2section1description}`}>Add job management boards, drag and drop Job cards easily, track the job status any where.</div>
                </div>
                <div className={styles.group3}>
                    <div className={styles.group3section1}>
                        <div className={`${styles.group3section1title} ${styles.title}`}>Welcome to Jobtracker</div>
                        <div className={`${styles.group3section1description} ${styles.description}`}>Job tracker is an app that organizes your job searching process, and tracking the applied, interviewed, offered, rejected job’s status by recording the job title, company name, date, location, and notes. You can manage job searching data easily.</div>
                    </div>
                    <img className={styles.group3section2img} src={landingPageImg2}></img>
                </div>
                <div className={styles.group4}>
                    <img className={styles.group4section1img} src={landingPageImg3}></img>
                    <div className={styles.group4section2}>
                        <div className={`${styles.group4section2title}  ${styles.title}`}>Plan, track, collaborate. All your Job application in one tool.</div>
                        <div className={`${styles.group4section2description} ${styles.description}`}>You do not need worry about how to track which job you just applied, which job you got an interview, which job you got an offer and which job you got rejected. Now you only need one tool, job tracker to track your job searching status. You can organize the job cards easily by draging and droping.</div>
                    </div>
                </div>
                <div className={styles.group5}>
                    <div className={styles.group5section1}>
                        <div className={`${styles.group5section1title}  ${styles.title}`}>You can get updates in real time from anywhere.</div>
                        <div className={`{styles.group5section1description} ${styles.description}`}>You also do not need to worry about to lost the information. You can upload your job searching info anywhere and check the info in real time and save all of info in our web. Job tracker can make sure you get updates in real time from anywhere.</div>
                    </div>
                    <img className={styles.group5section2img} src={landingPageImg4}></img>
                </div>
            </div>
            <div className={styles.footerDiv}>
                <img className={styles.footerLogo} src={logo}></img>
                <div className={styles.copyRight}>© Job Tracker, 2021. All rights reserved.</div>
            </div>
        </div>
    );
  }

  export default LandingPage;
