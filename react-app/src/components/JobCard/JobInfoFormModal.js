import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import newStyles from "../../components/JobCard/JobInfoFormModal.module.css"
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
import { NavLink} from "react-router-dom";


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
        <div className={newStyles.outerBody}>
            <div className={newStyles.body}>
                {/* <div className={newStyles.bodyLeftPart}> */}
                    <div className={newStyles.label__container1}>
                        <label className={newStyles.label}>Company name</label>

                        <div className={newStyles.inputDiv}>
                            <UilBuilding className={newStyles.inputIcon}/>
                            <div className={newStyles.input}>{job.jobs.companies.name}</div>

                        </div>
                    </div>

                    <div className={newStyles.label__container2}>
                        <label className={newStyles.label}>Company logo</label>

                        <div className={newStyles.inputDiv}>
                            <UilPaperclip className={newStyles.inputIcon}/>
                            <div className={newStyles.input}><img className={newStyles.logoImg} src={job.jobs.companies.logo_url}/></div>
                        </div>
                    </div>

                    <div className={newStyles.label__container3}>
                        <label className={newStyles.label}>Company location</label>

                        <div className={newStyles.inputDiv}>
                            <UilLocationPoint className={newStyles.inputIcon}/>
                            <div className={newStyles.input}>{job.jobs.companies.location}</div>
                        </div>
                    </div>

                    <div className={newStyles.label__container4}>
                        <label className={newStyles.label}>Job position</label>

                        <div className={newStyles.inputDiv}>
                            <UilBag className={newStyles.inputIcon}/>
                            <div className={newStyles.input}>{job.jobs.position_name}</div>
                        </div>
                    </div>
                    {/* <div className={newStyles.label__container}>
                        <label className={newStyles.label}></label>

                        <div className={newStyles.inputDiv}>
                            <div className={newStyles.input}></div>
                            <div className={newStyles.inputIcon}> </div>
                        </div>
                    </div> */}

                {/* </div> */}



                {/* <div className={newStyles.bodyRightPart}> */}
                    <div className={newStyles.label__container5}>
                        <label className={newStyles.label}>Post URL</label>

                        <div className={newStyles.inputDiv}>
                            <UilLink className={newStyles.inputIcon}/>
                            <a href={job.jobs.link_url} className={newStyles.input}>Job Link </a>
                        </div>
                    </div>

                    <div className={newStyles.label__container6}>
                        <label className={newStyles.label}>Salary</label>

                        <div className={newStyles.inputDiv}>
                            <UilUsdCircle className={newStyles.inputIcon}/>
                            <div className={newStyles.input}>{job.jobs.salary}</div>

                        </div>
                    </div>

                    <div className={newStyles.label__container7}>
                        <label className={newStyles.label}>
                            Application State
                        </label>

                        <div className={newStyles.inputDiv}>
                            {/* <select
                                id="applicationState"
                                className={newStyles.input}
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
                            <div className={newStyles.input2}>{job.state}</div>
                        </div>
                    </div>

                    <div className={newStyles.abel__container8}>
                    {job.state === "applied"?
                        <>
                        <label className={newStyles.label}>Applied date</label>
                        <div className={newStyles.calendar_outerDiv}>
                            <UilCalender className={newStyles.calendarInputIcon}/>
                            <div className={newStyles.calendar_div}>
                                <div className={newStyles.input}>{job.applied_date}</div>
                            </div>
                        </div>
                        </> :null
                    }
                    {job.state === "interview"?
                        <>
                        <label className={newStyles.label}>Interview date</label>
                        <div className={newStyles.calendar_outerDiv}>
                            <UilCalender className={newStyles.calendarInputIcon}/>
                            <div className={newStyles.calendar_div}>
                                <div className={newStyles.input}>{job.interviewed_date}</div>
                            </div>
                        </div>
                        </> :null
                    }
                    {job.state === "offered"?
                        <>
                        <label className={newStyles.label}>Offered date</label>
                        <div className={newStyles.calendar_outerDiv}>
                            <UilCalender className={newStyles.calendarInputIcon}/>
                            <div className={newStyles.calendar_div}>
                                <div className={newStyles.input}>{job.offered_date}</div>
                            </div>
                        </div>
                        </> :null
                    }
                    {job.state === "rejected"?
                        <>
                        <label className={newStyles.label}>Rejected date</label>
                        <div className={newStyles.calendar_outerDiv}>
                            <UilCalender className={newStyles.calendarInputIcon}/>
                            <div className={newStyles.calendar_div}>
                                <div className={newStyles.input}>{job.rejected_date}</div>
                            </div>
                        </div>
                        </> :null
                    }

                    </div>


                    <div className={newStyles.NoteOuterDiv}>
                        <div className={newStyles.label__container9}>
                            <label className={newStyles.label}>Note</label>

                            <div className={newStyles.inputDiv}>
                                <div className={newStyles.input2}>{job.jobs.description}</div>
                            </div>
                        </div>
                    </div>

                {/* </div> */}
            </div>


            {/* <div className={newStyles.buttonDiv}>
                <button className={newStyles.button} type="submit">
                    Save
                </button>
            </div> */}
        </div>

        )
    }


    const textEditInput =()=>{

        return (<div className={newStyles.outerDiv}>
            <form onSubmit={handleSubmit} className={newStyles.form} >
                <div className={newStyles.body}>
                    {/* <div className={newStyles.bodyLeftPart}> */}
                        <div className={newStyles.label__container1}>
                            <label className={newStyles.label_edit}>Company name</label>

                            <div className={newStyles.inputDiv_edit}>
                                <UilBuilding className={newStyles.inputIcon_edit}/>
                                <input
                                className={newStyles.input_edit}
                                placeholder="Type here"
                                name="companyName"
                                type="text"
                                value={companyName}
                                onChange={(e) => setComponyName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={newStyles.label__container2}>
                            <label className={newStyles.label_edit}>Company logo</label>

                            <div className={newStyles.inputDiv_edit}>
                                <UilPaperclip className={newStyles.inputIcon_edit}/>
                                <input
                                className={newStyles.input_edit}
                                placeholder="Type here"
                                name="companyLogo"
                                type="text"
                                value={companyLogo}
                                onChange={(e) => setComponyLogo(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={newStyles.label__container3}>
                            <label className={newStyles.label_edit}>Company location</label>

                            <div className={newStyles.inputDiv_edit}>
                                <UilLocationPoint className={newStyles.inputIcon_edit}/>
                                <input
                                className={newStyles.input_edit}
                                placeholder="Type here"
                                name="companyLocation"
                                type="text"
                                value={companyLocation}
                                onChange={(e) => setComponyLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={newStyles.label__container4}>
                            <label className={newStyles.label_edit}>Job position</label>

                            <div className={newStyles.inputDiv_edit}>
                                <UilBag className={newStyles.inputIcon_edit}/>
                                <input
                                className={newStyles.input_edit}
                                placeholder="Type here"
                                name="jobPosition"
                                type="text"
                                value={jobPosition}
                                onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>
                        </div>

                    {/* </div> */}

                    {/* <div className={newStyles.bodyRightPart}> */}

                        <div className={newStyles.label__container5}>
                            <label className={newStyles.label_edit}>Post URL</label>

                            <div className={newStyles.inputDiv_edit}>
                                <UilLink className={newStyles.inputIcon_edit}/>
                                <input
                                className={newStyles.input_edit}
                                placeholder="Type here"
                                name="postUrl"
                                type="text"
                                value={postUrl}
                                onChange={(e) => setPostUrl(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={newStyles.label__container6}>
                            <label className={newStyles.label_edit}>Salary</label>

                            <div className={newStyles.inputDiv_edit}>
                                <UilUsdCircle className={newStyles.inputIcon_edit}/>
                                <input
                                className={newStyles.input_edit}
                                placeholder="Type here"
                                name="salary"
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={newStyles.label__container}>
                            <label className={newStyles.label_edit}>
                                Application State
                            </label>

                            <div className={newStyles.inputDiv7}>
                                {/* <select
                                    id="applicationState"
                                    className={newStyles.input}
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
                                className={newStyles.input_application}
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

                        <div className={newStyles.abel__container8}>
                            <label className={newStyles.label_edit}>Applied/Interview/offered/rejected date</label>
                            <div className={newStyles.inputDiv_edit}>
                                <UilCalender className={newStyles.inputIcon_edit}/>
                                <div className={newStyles.calendar_div_edit}>
                                    <DatePicker
                                    className={newStyles.input_edit}
                                    showTimeSelect
                                    selected={applicationStateDate}
                                    onChange={(date) => setApplicationStateDate(date)}
                                    timeClassName={handleColor}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={newStyles.label__container9}>
                            <label className={newStyles.label_edit}>Note</label>

                            <div className={newStyles.inputDiv_edit}>
                                <textarea
                                className={newStyles.input3_edit}
                                name="note"
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                        </div>
                    {/* </div> */}
                </div>
                <div className={newStyles.buttonDiv}>
                    <button className={newStyles.button} type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>)
    }


    return (
        <div className={newStyles.outerDiv}>
            <div className={newStyles.header}>
                <div className={newStyles.formTitle}>
                    Job Information
                </div>
            </div>{
                !editable?
                <>
                <div className={newStyles.pencilButtonDiv}>
                    <UilPen className={newStyles.pencilButton} onClick={()=>{setEditable(true)}} />
                </div>
                </> : <div className={newStyles.nullDiv}/>
            }

            {editable?
            textEditInput(): textDisplay()}
        </div>
    )
}

export default JobInfoForm;
