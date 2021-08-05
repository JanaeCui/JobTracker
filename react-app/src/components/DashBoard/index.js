
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
import JobFormModal from '../CreateJobFormModal';
import CalendarModal from '../AboutMe';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {updateJob} from "../../store/jobs"

const DashBoard = () => {
  const boards = useSelector((state) => Object.values(state.boards));
  const dispatch = useDispatch();
  const {selected, setSelected}= useSelectedBoard();
  const user = useSelector((state) => state.session.user);
  const applicationRelatedJobs = useSelector((state) => Object.values(state.jobs));
  const applicationMap = useSelector((state) => state.jobs);

  // console.log("_________", applicationRelatedJobs.map(applicationRelatedJob => applicationRelatedJob.jobs.position_name))
  const appliedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "applied")

  const interviewedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "interview")

  const offeredJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "offered")
  // const rejectedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "rejected")

  const rejectedJobs = applicationRelatedJobs.filter(applicationRelatedJob => applicationRelatedJob.state === "rejected")

  useEffect(()=>{
    dispatch(getBoards())
    if (selected) {
      dispatch(getJobs(selected))
    }
  },[dispatch])


  const renderBoardCard = ()=>{
  return boards.map((board)=>{
    return <BoardCard onClick={()=>{ dispatch(getJobs(board.id)); setSelected(board.id); console.log("setSelected+++++++++", board.id);}} key={board.id} board={board}/>
  })
}

const renderAppliedJobCard = ()=>{
  if(appliedJobs){
    return appliedJobs.map((appliedJob, index) =>{

      return <JobCard key={appliedJob.id} job={appliedJob} index={index}/>
    })
  }
  return []
}

const renderInterviewedJobCard = ()=>{
  if(interviewedJobs){

    return interviewedJobs.map((interviewedJob, index) =>{

      return <JobCard key={interviewedJob.id} job={interviewedJob} index={index}/>
    })
  }
  return []
}

const renderOfferedJobCard = ()=>{
  if(offeredJobs){
    return offeredJobs.map((offeredJob, index) =>{

      return <JobCard key={offeredJob.id} job={offeredJob} index={index}/>
    })
  }
  return []
}

const renderRejectedJobCard = ()=>{
  if(rejectedJobs){
    return rejectedJobs.map((rejectedJob, index) =>{

      return <JobCard key={rejectedJob.id} job={rejectedJob} index={index}/>
    })
  }
  return []
}


const handlePostBoard = async (e) => {
  e.preventDefault();

  const newBoard = {
    name: "Double Click to change Title!!!",
    user_id: user.id,
  };
  const data = await dispatch(postBoard(newBoard));
};
//------------------------------------------------------------drag and drop------------------------
const onDragEnd = async (result) => {
  const { destination, source, draggableId, type } = result;
  console.log('destination', destination, 'source', source, draggableId);

  if (!destination || source.droppableId === destination.droppableId) {
    return;
  }
  console.log("Source: ", source.droppableId, "Dst: ", destination.droppableId, "ApplicationId: ", draggableId)
  const selectedJob = applicationMap[draggableId];
  console.log("Selectec Job: ", selectedJob)

  const newApplication = {
    name: selectedJob.jobs.companies.name,
    location: selectedJob.jobs.companies.location,
    logo_url: selectedJob.jobs.companies.logo_url,

    position_name: selectedJob.jobs.position_name,
    link_url: selectedJob.jobs.link_url,
    salary: selectedJob.jobs.salary,
    description: selectedJob.jobs.description,
    company_id: selectedJob.jobs.companies.id,

    state: destination.droppableId,
    date: new Date(),
    selected_board_id: selected,
    job_id: selectedJob.jobs.id,
    application_id:selectedJob.id
}

await dispatch(updateJob(newApplication))

}

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
                  {/* <FaRegBell className={styles.leftBarIcon}/> */}
                  <CalendarModal className={styles.leftBarIcon} appliedJobs={appliedJobs} interviewedJobs={interviewedJobs} offeredJobs={offeredJobs} rejectedJobs={rejectedJobs} />

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
            <DragDropContext onDragEnd={onDragEnd}>
              <div className={styles.rightPartBottomDiv}>
                    <Droppable droppableId ="applied">
                      {(provided)=>(
                        <div
                            className={`${styles.appliedSection} .col-xs-6 .col-sm-3`}
                            ref={provided.innerRef} {...provided.droppableProps}>
                          <div className={styles.colorAndTitle}>
                            <div className={styles.applicationTitle}>APPLIED</div>
                            <div className={styles.colorUnderlineApplied}></div>
                          </div>
                          {renderAppliedJobCard()}
                          {provided.placeholder}
                        </div>)}
                    </Droppable>

                    <Droppable droppableId ="interview">{(provided)=>(
                      <div className={`${styles.interviewedSection} .col-xs-6 .col-sm-3`}
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <div className={styles.colorAndTitle}>
                          <div className={styles.applicationTitle}>INTERVIEW</div>
                          <div className={styles.colorUnderlineInterviewed}></div>
                        </div>
                        {renderInterviewedJobCard()}
                        {provided.placeholder}

                    </div>)}</Droppable>

                    <Droppable droppableId ="offered">{(provided)=>(
                      <div className={`${styles.offeredSection} .col-xs-6 .col-sm-3`}
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <div className={styles.colorAndTitle}>
                          <div className={styles.applicationTitle}>OFFER</div>
                          <div className={styles.colorUnderlineOffered}></div>
                        </div>
                        {renderOfferedJobCard()}
                        {provided.placeholder}

                    </div>)}</Droppable>

                    <Droppable droppableId ="rejected">{(provided)=>(
                      <div className={`${styles.rejectedSection} .col-xs-6 .col-sm-3`}
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <div className={styles.colorAndTitle}>
                          <div className={styles.applicationTitle}>REJECTED</div>
                          <div className={styles.colorUnderlineRejected}></div>
                        </div>
                        {renderRejectedJobCard()}
                        {provided.placeholder}

                      </div>)}</Droppable>
              </div>
            </DragDropContext>
          </div>
          {/* <UilPlus className={styles.dashBoardBigPlusButton}/> */}
          <JobFormModal className={styles.dashBoardBigPlusButton}/>
        </div>


  );
}

export default DashBoard;
