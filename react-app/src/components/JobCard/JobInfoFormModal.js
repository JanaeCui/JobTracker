import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../components/JobCard/JobCard.module.css"
import { UilCalender } from '@iconscout/react-unicons'
import { UilBuilding } from '@iconscout/react-unicons'
import { UilPaperclip } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilBag } from '@iconscout/react-unicons'
import { UilLink } from '@iconscout/react-unicons'
import { UilUsdCircle } from '@iconscout/react-unicons'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UilPen } from '@iconscout/react-unicons';
import { useSelectedBoard } from '../../context/SelectedBoard';
import {updateJob} from "../../store/jobs"


function JobInfoForm({setShowModal, job}){
    const dispatch = useDispatch();
    const [companyName, setComponyName] = useState(job.jobs.companies.name);
    const [companyLogo, setComponyLogo] = useState(job.jobs.companies.logo_url);
    const [companyLocation, setComponyLocation] = useState(job.jobs.companies.location);
    const [jobPosition, setJobPosition] = useState(job.jobs.position_name);
    const [postUrl, setPostUrl] = useState(job.jobs.link_url);
    const [salary, setSalary] = useState(job.jobs.salary);
    const [applicationState, setApplicationState] = useState(job.state)
    var time = new Date();
    if (job.state === "applied") {
        time = new Date(job.applied_date)
    } else if(job.state ==="interview"){
        time = new Date(job.interviewed_date)
    }else if(job.state === "offered"){
        time = new Date(job.offered_date)
    }else if(job.state === "rejected"){
        time = new Date(job.rejected_date)
    }
    const [applicationStateDate, setApplicationStateDate] = useState(time);
    const [note, setNote] = useState(job.jobs.description);
    const [editable, setEditable] = useState(false);
    const {selected, setSelected}= useSelectedBoard();

    let handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
      };

    var applicationOptions = [
        {id: 1, label: 'applied'},
        {id: 2, label: 'interview'},
        {id: 3, label: 'offered'},
        {id: 4, label: 'rejected'},
    ];

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const newApplication = {
            name: companyName,
            location: companyLocation,
            logo_url: companyLogo,

            position_name: jobPosition,
            link_url: postUrl,
            salary,
            description: note,
            company_id: job.jobs.companies.id,

            state: applicationState ? applicationState : job.state,
            date: applicationStateDate,
            selected_board_id: selected,
            job_id: job.jobs.id,
            application_id:job.id
        }

        await dispatch(updateJob(newApplication))

        setEditable(false)
    }

    const textDisplay =()=>{

        return (
        <>
            <div className={styles.body}>
                <div className={styles.bodyLeftPart}>
                    <div className={styles.label__container}>
                        <label className={styles.label}>Company name</label>

                        <div className={styles.inputDiv}>
                            <div className={styles.input}>{job.jobs.companies.name}</div>
                            <UilBuilding className={styles.inputIcon}/>
                        </div>
                    </div>

                    <div className={styles.label__container}>
                        <label className={styles.label}>Company logo</label>

                        <div className={styles.inputDiv}>
                            <div className={styles.input}>{job.jobs.companies.logo_url}</div>
                            <UilPaperclip className={styles.inputIcon}/>
                        </div>
                    </div>

                    <div className={styles.label__container}>
                        <label className={styles.label}>Company location</label>

                        <div className={styles.inputDiv}>
                            <div className={styles.input}>{job.jobs.companies.location}</div>
                            <UilLocationPoint className={styles.inputIcon}/>
                        </div>
                    </div>

                    <div className={styles.label__container}>
                        <label className={styles.label}>Job position</label>

                        <div className={styles.inputDiv}>
                            <div className={styles.input}>{job.jobs.position_name}</div>
                            <UilBag className={styles.inputIcon}/>
                        </div>
                    </div>
                </div>



                <div className={styles.bodyRightPart}>
                    <div className={styles.label__container}>
                        <label className={styles.label}>Post URL</label>

                        <div className={styles.inputDiv}>
                            <div className={styles.input}>{job.jobs.link_url}</div>
                            <UilLink className={styles.inputIcon}/>
                        </div>
                    </div>

                    <div className={styles.label__container}>
                        <label className={styles.label}>Salary</label>

                        <div className={styles.inputDiv}>
                            <div className={styles.input}>{job.jobs.salary}</div>
                                <UilUsdCircle className={styles.inputIcon2}/>
                        </div>
                    </div>

                    <div className={styles.label__container}>
                        <label className={styles.label}>
                            Application State
                        </label>

                        <div className={styles.inputDiv}>
                            {/* <select
                                id="applicationState"
                                className={styles.input}
                                value={applicationState}
                                onChange={(e) => setApplicationState(e.target.value)}
                            >
                                <option value="" disabled>
                                Select a state
                                </option>
                                <option value={1}>applied</option>
                                <option value={2}>interview</option>
                                <option value={3}>offered</option>
                                <option value={4}>rejected</option>
                            </select> */}
                            <div className={styles.input2}>{job.state}</div>
                        </div>
                    </div>

                    <div className={styles.abel__container}>
                    {job.state === "applied"?
                        <>
                        <label className={styles.label}>Applied date</label>
                        <div className={styles.calendar_outerDiv}>
                            <div className={styles.calendar_div}>
                                <div className={styles.input}>{job.applied_date}</div>
                            </div>
                            <UilCalender className={styles.calendarInputIcon}/>
                        </div>
                        </> :null
                    }
                    {job.state === "interview"?
                        <>
                        <label className={styles.label}>Interview date</label>
                        <div className={styles.calendar_outerDiv}>
                            <div className={styles.calendar_div}>
                                <div className={styles.input}>{job.interviewed_date}</div>
                            </div>
                            <UilCalender className={styles.calendarInputIcon}/>
                        </div>
                        </> :null
                    }
                    {job.state === "offered"?
                        <>
                        <label className={styles.label}>Offered date</label>
                        <div className={styles.calendar_outerDiv}>
                            <div className={styles.calendar_div}>
                                <div className={styles.input}>{job.offered_date}</div>
                            </div>
                            <UilCalender className={styles.calendarInputIcon}/>
                        </div>
                        </> :null
                    }
                    {job.state === "rejected"?
                        <>
                        <label className={styles.label}>Rejected date</label>
                        <div className={styles.calendar_outerDiv}>
                            <div className={styles.calendar_div}>
                                <div className={styles.input}>{job.rejected_date}</div>
                            </div>
                            <UilCalender className={styles.calendarInputIcon}/>
                        </div>
                        </> :null
                    }

                    </div>


                </div>
            </div>
            <div className={styles.NoteOuterDiv}>
                <div className={styles.label__container}>
                    <label className={styles.label}>Note</label>

                    <div className={styles.inputDiv}>
                        <div className={styles.input3}>{job.jobs.description}</div>
                    </div>
                </div>
            </div>

            {/* <div className={styles.buttonDiv}>
                <button className={styles.button} type="submit">
                    Save
                </button>
            </div> */}
        </>

        )
    }


    const textEditInput =()=>{

        return (<div className={styles.outerDiv}>
            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.body}>
                    <div className={styles.bodyLeftPart}>
                        <div className={styles.label__container}>
                            <label className={styles.label}>Company name</label>

                            <div className={styles.inputDiv}>
                                <input
                                className={styles.input}
                                placeholder="Type here"
                                name="companyName"
                                type="text"
                                value={companyName}
                                onChange={(e) => setComponyName(e.target.value)}
                                />
                                <UilBuilding className={styles.inputIcon}/>
                            </div>
                        </div>

                        <div className={styles.label__container}>
                            <label className={styles.label}>Company logo</label>

                            <div className={styles.inputDiv}>
                                <input
                                className={styles.input}
                                placeholder="Type here"
                                name="companyLogo"
                                type="text"
                                value={companyLogo}
                                onChange={(e) => setComponyLogo(e.target.value)}
                                />
                                <UilPaperclip className={styles.inputIcon}/>
                            </div>
                        </div>

                        <div className={styles.label__container}>
                            <label className={styles.label}>Company location</label>

                            <div className={styles.inputDiv}>
                                <input
                                className={styles.input}
                                placeholder="Type here"
                                name="companyLocation"
                                type="text"
                                value={companyLocation}
                                onChange={(e) => setComponyLocation(e.target.value)}
                                />
                                <UilLocationPoint className={styles.inputIcon}/>
                            </div>
                        </div>

                        <div className={styles.label__container}>
                            <label className={styles.label}>Job position</label>

                            <div className={styles.inputDiv}>
                                <input
                                className={styles.input}
                                placeholder="Type here"
                                name="jobPosition"
                                type="text"
                                value={jobPosition}
                                onChange={(e) => setJobPosition(e.target.value)}
                                />
                                <UilBag className={styles.inputIcon}/>
                            </div>
                        </div>

                    </div>

                    <div className={styles.bodyRightPart}>

                        <div className={styles.label__container}>
                            <label className={styles.label}>Post URL</label>

                            <div className={styles.inputDiv}>
                                <input
                                className={styles.input}
                                placeholder="Type here"
                                name="postUrl"
                                type="text"
                                value={postUrl}
                                onChange={(e) => setPostUrl(e.target.value)}
                                />
                                <UilLink className={styles.inputIcon2}/>
                            </div>
                        </div>

                        <div className={styles.label__container}>
                            <label className={styles.label}>Salary</label>

                            <div className={styles.inputDiv}>
                                <input
                                className={styles.input}
                                placeholder="Type here"
                                name="salary"
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                />
                                 <UilUsdCircle className={styles.inputIcon2}/>
                            </div>
                        </div>

                        <div className={styles.label__container}>
                            <label className={styles.label}>
                                Application State
                            </label>

                            <div className={styles.inputDiv}>
                                {/* <select
                                    id="applicationState"
                                    className={styles.input}
                                    value={applicationState}
                                    onChange={(e) => setApplicationState(e.target.value)}
                                >
                                    <option value="" disabled>
                                    Select a state
                                    </option>
                                    <option value={1}>applied</option>
                                    <option value={2}>interview</option>
                                    <option value={3}>offered</option>
                                    <option value={4}>rejected</option>
                                </select> */}
                                <Typeahead
                                // className={styles.input2}
                                placeholder="Select here"
                                id="application"
                                options={applicationOptions}
                                // value={applicationState}
                                selected={[applicationState]}
                                onChange={(selected) => {
                                    if (selected.length > 0) {
                                        setApplicationState(selected[0].label)
                                    } else {
                                        setApplicationState("")
                                    }
                                }}
                                />
                            </div>
                        </div>

                        <div className={styles.abel__container}>
                            <label className={styles.label}>Applied/Interview/offered/rejected date</label>
                            <div className={styles.calendar_outerDiv}>
                                <div className={styles.calendar_div}>
                                    <DatePicker
                                    className={styles.input}
                                    showTimeSelect
                                    selected={applicationStateDate}
                                    onChange={(date) => setApplicationStateDate(date)}
                                    timeClassName={handleColor}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                                <UilCalender className={styles.calendarInputIcon}/>
                            </div>
                        </div>

                        <div className={styles.label__container}>
                            <label className={styles.label}>Note</label>

                            <div className={styles.inputDiv}>
                                <textarea
                                className={styles.input3}
                                name="note"
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.button} type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>)
    }


    return (
        <div className={styles.outerDiv}>
            <div className={styles.header}>
                <div className={styles.formTitle}>
                    Job Information
                </div>
            </div>
            <UilPen onClick={()=>{setEditable(true)}} />
            {editable?
            textEditInput(): textDisplay()}
        </div>
    )
}

export default JobInfoForm;
