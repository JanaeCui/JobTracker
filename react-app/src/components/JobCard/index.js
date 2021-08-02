import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from "./JobCard.module.css";
import { UilTrashAlt } from '@iconscout/react-unicons'
import { UilLink } from '@iconscout/react-unicons'
import { format } from "date-fns";
import { Modal } from "../../context/Modal";
import JobInfoForm from "./JobInfoFormModal";

function JobCard({job}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={styles.jobCardOuterDiv} onClick={() => setShowModal(true)} >
                <div className={styles.logoDiv}>
                    {job.state === "applied"? <div className={styles.appliedLogo}><span className={styles.logoText}>logo</span></div>: null}
                    {job.state === "interview"? <div className={styles.interviewedLogo}><span className={styles.logoText}>logo</span></div>: null}
                    {job.state === "offered"? <div className={styles.offeredLogo}><span className={styles.logoText}>logo</span></div>: null}
                    {job.state === "rejected"? <div className={styles.rejectedLogo}><span className={styles.logoText}>logo</span></div>: null}
                </div>
                <div className={styles.contentDiv}>
                    <div className={styles.positionTitle}>{job.jobs.position_name}</div>
                    <div className={styles.companyName}>{job.jobs.companies.name}</div>
                    {job.state === "applied"? <div className={styles.date}>{job.state} at {format(Date.parse(job.applied_date), "yyyy-MM-dd")}</div>: null}
                    {job.state === "interview"? <div className={styles.date}>{job.state} at {format(Date.parse(job.interviewed_date), "yyyy-MM-dd")}</div>: null}
                    {job.state === "offered"? <div className={styles.date}>{job.state} at {format(Date.parse(job.offered_date), "yyyy-MM-dd")}</div>: null}
                    {job.state === "rejected"? <div className={styles.date}>{job.state} at {format(Date.parse(job.rejected_date), "yyyy-MM-dd")}</div>: null}
                </div>
                <div className={styles.buttons}>
                    <UilLink className={styles.editButton}/>
                    <UilTrashAlt className={styles.deleteButton}/>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                <JobInfoForm setShowModal={setShowModal} job={job}/>
                </Modal>
            )}
        </>
    );
}
export default JobCard;
