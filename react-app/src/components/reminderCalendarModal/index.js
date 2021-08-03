import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import CreateCalendar from "./CalendarModal";
import styles from "../../components/reminderCalendarModal/CalendarModal.module.css"
import { FaRegBell } from "react-icons/fa"
import { useSelectedBoard } from '../../context/SelectedBoard';
import AddToCalendar from '@culturehq/add-to-calendar';
import "@culturehq/add-to-calendar/dist/styles.css"

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
      <FaRegBell className={styles.leftBarIcon}
               onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCalendar setShowModal={setShowModal} appliedJobs={appliedJobs} interviewedJobs={interviewedJobs} offeredJobs={offeredJobs} rejectedJobs={rejectedJobs}  />
        </Modal>
      )}
    </>
  );
}

export default CalendarModal;
