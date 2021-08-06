
import React, { useState,useEffect, useHistory } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AboutMeModal.module.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { set } from "date-fns";

import { useSelectedBoard } from '../../context/SelectedBoard';
import Calendar from 'react-awesome-calendar';
import { parseWithOptions } from "date-fns/fp";
import AddToCalendar from '@culturehq/add-to-calendar';
import "@culturehq/add-to-calendar/dist/styles.css"
import { UilLinkedin } from '@iconscout/react-unicons'
import { UilGithub } from '@iconscout/react-unicons'
import { UilEnvelope } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'

function AboutMe() {

    // const routeChangeToLinkedin = () =>{
    //     window.location = "https://www.linkedin.com/in/cuijiajanae/";
    //     window.open(url, "_blank");

    // }
    // const routeChangeToGitHub = () =>{
    //     window.location = "https://github.com/JanaeCui/JobTracker";

    // }


    return(
        <>
            <div className={styles.outerDiv}>
                <div className={styles.header}>
                    <div className={styles.formTitle}>
                        About
                    </div>
                </div>
                <div>
                    <div className={styles.developerGroup}>
                        <UilUser className={styles.icon1} />
                        <div className={styles.text1}>Developer:<span className={styles.info}> Jia Cui</span></div>
                    </div>

                    <div className={styles.linkedinGroup}>
                        <UilLinkedin className={styles.icon2} />
                        <a href="https://www.linkedin.com/in/cuijiajanae/" target="_blank" className={styles.text2}>LinkedIn</a>
                    </div>
                    <div className={styles.gitHubGroup}>
                        <UilGithub className={styles.icon3} />
                        <a href="https://github.com/JanaeCui/JobTracker" target="_blank" className={styles.text2}>GitHub</a>
                    </div>
                    <div className={styles.emailGroup}>
                        <UilEnvelope className={styles.icon4} />
                        <div className={styles.text1}>Email:<span className={styles.info}> cuijiajanae@gmail.com</span></div>
                    </div>

                </div>
            </div>
        </>

    )
}
export default AboutMe;
