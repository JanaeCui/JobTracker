
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import BoardCard from "../BoardCard/index"
import { getBoards } from '../../store/boards';
import { getJobs } from '../../store/jobs';
import { postBoard } from '../../store/boards';
import { useSelectedBoard } from '../../context/SelectedBoard';
import JobCard from '../JobCard';

const DashBoard = () => {
  const boards = useSelector((state) => Object.values(state.boards));
  const dispatch = useDispatch();
  const {selected, setSelected}= useSelectedBoard();
  const user = useSelector((state) => state.session.user);
  const applicationRelatedJobs = useSelector((state) => Object.values(state.jobs));
  console.log("=========jobs", applicationRelatedJobs)
  // console.log("_________", applicationRelatedJobs.map(applicationRelatedJob => applicationRelatedJob.jobs.position_name))
  const appliedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "applied")
  console.log("________appliedJobs", appliedJobs);
  const interviewedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "interview")
  const offeredJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "offered")
  // const rejectedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "rejected")


  useEffect(()=>{
    dispatch(getBoards())
  },[dispatch])


  const renderBoardCard = ()=>{
  return boards.map((board)=>{
    return <BoardCard onClick={()=>{ dispatch(getJobs(board.id)); setSelected(board.id)}} key={board.id} board={board}/>
  })
}

const renderAppliedJobCard = ()=>{
  if(appliedJobs){
    return appliedJobs.map((appliedJob) =>{
      console.log("____________appliedJob", appliedJob)
      return <JobCard key={appliedJob.id} job={appliedJob}/>
    })
  }
}

const renderInterviewedJobCard = ()=>{
  if(interviewedJobs){
    return interviewedJobs.map((interviewedJob) =>{

      return <JobCard key={interviewedJob.id} job={interviewedJob}/>
    })
  }
}

const renderOfferedJobCard = ()=>{
  if(offeredJobs){
    return offeredJobs.map((offeredJob) =>{

      return <JobCard key={offeredJob.id} job={offeredJob}/>
    })
  }
}

const handlePostBoard = async (e) => {
  e.preventDefault();

  const newBoard = {
    name: "Job Search Time(XXXX) Position Title",
    user_id: user.id,
  };
  const data = await dispatch(postBoard(newBoard));
};


  return (

        <div className={`${styles.outerContainer}`}>
          <div className={styles.leftBarOuterDiv}>
            <div className={`${styles.leftBar} .col-xs-6`}>
              <div className={styles.profileGroup}>
                <ProfilePicture/>
                <div className={styles.sayHiGroup}>
                  <div className={styles.hey}>Hey</div>
                  <div className={styles.profileName}>
                    <ProfileName />
                  </div>
                </div>
              </div>
              <div className={styles.myBoardTitleAndAddButtonGroup}>
                <div className={styles.myBoard}>My Boards</div>
                <UilPlus onClick={handlePostBoard} className={styles.addBoardButton}/>
              </div>
              <div className={styles.boardCardsDiv}>
                {renderBoardCard()}
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
                  {renderAppliedJobCard()}
                </div>
                <div className={`${styles.interviewedSection} .col-xs-6 .col-sm-3`}>
                  <div className={styles.applicationTitle}>INTERVIEW</div>
                  <div className={styles.colorUnderlineInterviewed}></div>
                  {renderInterviewedJobCard()}
                </div>
                <div className={`${styles.offeredSection} .col-xs-6 .col-sm-3`}>
                  <div className={styles.applicationTitle}>OFFER</div>
                  <div className={styles.colorUnderlineOffered}></div>
                  {renderOfferedJobCard()}
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
