import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import AboutMe from "./AoubtMeModal";
import styles from "./AboutMeModal.module.css"
import { UilCommentShare } from '@iconscout/react-unicons'
import { useSelectedBoard } from '../../context/SelectedBoard';
import AddToCalendar from '@culturehq/add-to-calendar';
import "@culturehq/add-to-calendar/dist/styles.css"
import { NavLink } from "react-router-dom";

function CalendarModal({appliedJobs, interviewedJobs,offeredJobs, rejectedJobs}) {
  const [showModal, setShowModal] = useState(false);
  let event = {
    title: 'Sample Event',
    description: 'This is the sample event provided as an example only',
    location: 'Portland, OR',
    startTime: '2016-09-16T20:15:00-04:00',
    endTime: '2016-09-16T21:45:00-04:00'
};
  return (
    // <AddToCalendar event={{
    //     name: "Happy Hour",
    //     details: "Let's go after work",
    //     location: "Boston, MA",
    //     startsAt: "2018-12-06T17:00:00-05:00",
    //     endsAt: "2018-12-06T18:00:00-05:00"
    //   }} />
    <>
      {/* <UilCommentShare  className={styles.leftBarIcon}
               onClick={() => setShowModal(true)}/> */}
      <NavLink to="#" className={styles.leftBarIcon} onClick={() => setShowModal(true)}>About</NavLink>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AboutMe  />
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
