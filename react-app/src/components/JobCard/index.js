import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from "./JobCard.module.css";
import { UilTrashAlt } from '@iconscout/react-unicons'
import { UilLink } from '@iconscout/react-unicons'
import { format } from "date-fns";
import { Modal } from "../../context/Modal";
import JobInfoForm from "./JobInfoFormModal";
import {deleteJob}  from "../../store/jobs";
import { Draggable } from 'react-beautiful-dnd';

function JobCard({job, index}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(deleteJob({"applicationId": job.id, "jobId": job.jobs.id, "companyId": job.jobs.companies.id}));
      };
    const getTime = (date) => {
        console.log("date type: ", typeof(date), "date:", date)
        return format(Date.parse(date), "yyyy-MM-dd")
    }
    return (
        <Draggable draggableId={`${job.id}`} index={index}>
            {(provided)=>(
                <div
                ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                <div className={styles.jobCardOuterDiv} onClick={() => setShowModal(true)} >
                    <div className={styles.logoDiv}>
                        {job.state === "applied" && job.jobs.companies.logo_url == ""? <div className={styles.appliedLogo}><span className={styles.logoText}>logo</span></div>: null}
                        {job.state === "interview"&& job.jobs.companies.logo_url == ""? <div className={styles.interviewedLogo}><span className={styles.logoText}>logo</span></div>: null}
                        {job.state === "offered" && job.jobs.companies.logo_url == ""? <div className={styles.offeredLogo}><span className={styles.logoText}>logo</span></div>: null}
                        {job.state === "rejected" && job.jobs.companies.logo_url == ""? <div className={styles.rejectedLogo}><span className={styles.logoText}>logo</span></div>: null}
                        {job.jobs.companies.logo_url ? <div className={styles.appliedLogo}><img className={styles.logoImg} src={job.jobs.companies.logo_url}/></div>: null}
                    </div>
                    <div className={styles.contentDiv}>
                        <div className={styles.positionTitle}>{job.jobs.position_name}</div>
                        <div className={styles.companyName}>{job.jobs.companies.name}</div>
                        {job.state === "applied"? <div className={styles.date}>{job.state} at {getTime(job.applied_date)}</div>: null}
                        {job.state === "interview"? <div className={styles.date}>{job.state} at {getTime(job.interviewed_date)}</div>: null}
                        {job.state === "offered"? <div className={styles.date}>{job.state} at {getTime(job.offered_date)}</div>: null}
                        {job.state === "rejected"? <div className={styles.date}>{job.state} at {getTime(job.rejected_date)}</div>: null}
                    </div>
                    <div className={styles.buttons}>
                        <UilLink className={styles.editButton}/>
                        <UilTrashAlt onClick={handleDelete} className={styles.deleteButton}/>
                    </div>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <JobInfoForm setShowModal={setShowModal} job={job}/>
                    </Modal>
                )}
            </div>
            )}

        </Draggable>

        // <div>
        //     <div className={styles.jobCardOuterDiv} onClick={() => setShowModal(true)} >
        //             <div className={styles.logoDiv}>
        //                 {job.state === "applied" && job.jobs.companies.logo_url == ""? <div className={styles.appliedLogo}><span className={styles.logoText}>logo</span></div>: null}
        //                 {job.state === "interview"&& job.jobs.companies.logo_url == ""? <div className={styles.interviewedLogo}><span className={styles.logoText}>logo</span></div>: null}
        //                 {job.state === "offered" && job.jobs.companies.logo_url == ""? <div className={styles.offeredLogo}><span className={styles.logoText}>logo</span></div>: null}
        //                 {job.state === "rejected" && job.jobs.companies.logo_url == ""? <div className={styles.rejectedLogo}><span className={styles.logoText}>logo</span></div>: null}
        //                 {job.jobs.companies.logo_url ? <div className={styles.appliedLogo}><img className={styles.logoImg} src={job.jobs.companies.logo_url}/></div>: null}
        //             </div>
        //             <div className={styles.contentDiv}>
        //                 <div className={styles.positionTitle}>{job.jobs.position_name}</div>
        //                 <div className={styles.companyName}>{job.jobs.companies.name}</div>
        //                 {job.state === "applied"? <div className={styles.date}>{job.state} at {format(Date.parse(job.applied_date), "yyyy-MM-dd")}</div>: null}
        //                 {job.state === "interview"? <div className={styles.date}>{job.state} at {format(Date.parse(job.interviewed_date), "yyyy-MM-dd")}</div>: null}
        //                 {job.state === "offered"? <div className={styles.date}>{job.state} at {format(Date.parse(job.offered_date), "yyyy-MM-dd")}</div>: null}
        //                 {job.state === "rejected"? <div className={styles.date}>{job.state} at {format(Date.parse(job.rejected_date), "yyyy-MM-dd")}</div>: null}
        //             </div>
        //             <div className={styles.buttons}>
        //                 <UilLink className={styles.editButton}/>
        //                 <UilTrashAlt onClick={handleDelete} className={styles.deleteButton}/>
        //             </div>
        //         </div>
        //         {showModal && (
        //             <Modal onClose={() => setShowModal(false)}>
        //             <JobInfoForm setShowModal={setShowModal} job={job}/>
        //             </Modal>
        //         )}
        // </div>
    );
}
export default JobCard;
