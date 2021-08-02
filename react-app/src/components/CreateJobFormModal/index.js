import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateJobForm from "./JobFormModal";
import styles from "../../components/CreateJobFormModal/JobFormModal.module.css"
import { UilPlus } from '@iconscout/react-unicons'
import { useSelectedBoard } from '../../context/SelectedBoard';

function JobFormModal() {
  const [showModal, setShowModal] = useState(false);
  const {selected, setSelected}= useSelectedBoard();

  return (
    <>
      <UilPlus display={selected? "display" : "none"}  className={styles.dashBoardBigPlusButton}
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
