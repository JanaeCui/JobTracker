import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateJobForm from "./JobFormModal";
import styles from "../../components/CreateJobFormModal/JobFormModal.module.css"
import { UilPlus } from '@iconscout/react-unicons'

function JobFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <UilPlus className={styles.dashBoardBigPlusButton}
               onClick={() => setShowModal(true)}/>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateJobForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default JobFormModal;
