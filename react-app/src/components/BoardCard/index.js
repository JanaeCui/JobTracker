import React, { useState, useContext, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from '../../store/boards';
import { NavLink, useParams} from "react-router-dom";
import styles from "./BoardCard.module.css";
import { makeStyles } from '@material-ui/core/styles';

export default function BoardCard({board}) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [newTitle, setNewTitle] = useState(board.name);

  const useStyle = makeStyles(() => ({
    input: {
      fontWeight: 'bold',
      width:'7rem',
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

  const handleOnBlur = () => {
    dispatch(updateBoard(newTitle, board.id))
    setOpen(false);
  };
  return (
    <div>
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
          Test
          <NavLink
            className={styles.NavLink}
            to ="#"
            onClick={() => setOpen(!open)}
          >
            <span className={styles.name}>{board.name}</span>

          </NavLink>
        </div>
      )}
    </div>
  );
}
