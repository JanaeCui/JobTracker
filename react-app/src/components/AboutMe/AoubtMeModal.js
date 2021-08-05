
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AboutMeModal.module.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { set } from "date-fns";

import { useSelectedBoard } from '../../context/SelectedBoard';
import Calendar from 'react-awesome-calendar';
import { parseWithOptions } from "date-fns/fp";
import AddToCalendar from '@culturehq/add-to-calendar';
import "@culturehq/add-to-calendar/dist/styles.css"

function AboutMe({ setShowModal, appliedJobs, interviewedJobs,offeredJobs, rejectedJobs}) {




    let event={
        name: "Happy Hour",
        details: "Let's go after work",
        location: "Boston, MA",
        startsAt: "2018-12-06T17:00:00-05:00",
        endsAt: "2018-12-06T18:00:00-05:00"
      }


    return(
        <AddToCalendar event={event} />
    )
}
export default AboutMe;
