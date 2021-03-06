import React, { useState, useContext, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from '../../store/boards';
import { deleteBoard } from '../../store/boards';
import { deleteAllJobs, getJobs } from '../../store/jobs';
import { NavLink, useParams} from "react-router-dom";
import styles from "./BoardCard.module.css";
import { makeStyles } from '@material-ui/core/styles';
import { UilTrashAlt } from '@iconscout/react-unicons'
import { useSelectedBoard } from '../../context/SelectedBoard';

export default function BoardCard({board, onClick}) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(board.name);
  const {selected, setSelected}= useSelectedBoard();

  const useStyle = makeStyles(() => ({
    input: {
      fontWeight: 'bold',
      width:'9.5rem',
      multiline: true,
      '&:focus': {
        color: '#FFCB00',
        multiline: true,
      },
    },
  }));

  const classes = useStyle();

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };



  const handleOnBlur = (e) => {
    if (e.target.value !== "" ) {
      dispatch(updateBoard(newTitle, board.id))
    } else {
      setNewTitle(board.name);
    }
    setOpen(false);
  };


  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(deleteAllJobs(board.id));
    dispatch(deleteBoard(board.id));
    if(+board.id == +selected){
      setSelected("");
    }
  };


  return (
    <button className={ selected !== board.id? `${styles.boardCardDiv}`: `${styles.boardCardDiv2}`} onClick={onClick}>
      <div className={styles.boardCardName}>
        {open ? (
          <div>
            <InputBase
              _invalid={{
                borderColor: 'red:50',
              }}
              inputProps={{
                className: classes.input,
              }}
              onChange={handleOnChange}
              autoFocus
              value={newTitle}
              fullWidth
              onBlur={handleOnBlur}
            />
          </div>
        ) : (
          <div className={styles.originNameDiv}>
            <NavLink
              className={styles.NavLink}
              to ="#"
              onDoubleClick={() => setOpen(!open)}
            >
              {board.name}

            </NavLink>
          </div>
        )}
      </div>
      <div className={styles.trashBinDiv}>
        <UilTrashAlt onClick={handleDelete} className={styles.trashBin}  />
      </div>
    </button>
  );
}
