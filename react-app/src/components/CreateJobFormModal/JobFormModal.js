import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "../../components/CreateJobFormModal/JobFormModal.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typeahead } from 'react-bootstrap-typeahead';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAllJobs } from "../../store/allJobs";
import { set } from "date-fns";
import { UilCalender } from '@iconscout/react-unicons'
import { UilBuilding } from '@iconscout/react-unicons'
import { UilPaperclip } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilBag } from '@iconscout/react-unicons'
import { UilLink } from '@iconscout/react-unicons'
import { UilUsdCircle } from '@iconscout/react-unicons'

function CreateJobForm({ setShowModal }) {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState(new Date());
    const [companyName, setComponyName] = useState("");
    const [companyLogo, setComponyLogo] = useState("");
    const [companyLocation, setComponyLocation] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [postUrl, setPostUrl] = useState("");
    const [salary, setSalary] = useState("");
    const [applicationState, setApplicationState] = useState("");
    const [note, setNote] = useState("");

    let handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
      };


    const handleSubmit = async (e)=>{
        e.preventDefault();
        setShowModal(false);
    }

//-------------------------------------------------------------------------------------
const allJobs = useSelector((state) => Object.values(state.allJobs));
// const selectedJob = allJobs.filter(Job => +Job.id === +selectedId)[0]
// console.log("-----------selectedJob",selectedJob)

useEffect(()=>{
    dispatch(getAllJobs())
  },[dispatch])

    var applicationOptions = [
        {id: 1, label: 'applied'},
        {id: 2, label: 'interview'},
        {id: 3, label: 'offered'},
        {id: 4, label: 'rejected'},
    ];

    var options = ()=>{
        let list = []
        for (const job of allJobs){
            let obj = {}
            obj["id"] = +job.id
            obj["label"] = `${job.position_name} - ${job.companies.name}`
            list.push(obj)
        }
        return list

    }


    return (
        <div className={styles.outerDiv}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <div className={styles.formTitle}>
                        Add Job
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.bodyLeftPart}>
                        <div className={styles.label__container}>
                            <label className={styles.label}>Search already exited Job and prefill form</label>
                            <div className={styles.inputDiv}>
                                <Typeahead
                                placeholder="Search here"
                                className={styles.input2}
                                id="jobSearch"
                                onChange={(selected) => {
                                    console.log("selected: ")
                                    console.log(selected)

                                    if (selected.length > 0) {
                                        const selectedJob = allJobs.filter(Job => +Job.id === +selected[0].id)[0]
                                        console.log(allJobs);
                                        console.log(selectedJob);
                                        setComponyName(selectedJob.companies.name)
                                        setComponyLogo(selectedJob.companies.logo_url)
                                        setComponyLocation(selectedJob.companies.location)
                                        setJobPosition(selectedJob.position_name)
                                        setPostUrl(selectedJob.link_url)
                                        setSalary(selectedJob.salary)
                                        setNote(selectedJob.description)
                                    }
                                }}
                                options={options()}
                                filterBy={['label']}
                                />
                            </div>
                        </div>

                        <div className={styles.abel__container}>
                            <label className={styles.label}>Create date</label>
                            <div className={styles.calendar_outerDiv}>
                                <div className={styles.calendar_div}>
                                    <DatePicker
                                    className={styles.input}
                                    showTimeSelect
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    timeClassName={handleColor}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </div>
                                <UilCalender className={styles.calendarInputIcon}/>
                            </div>
                        </div>

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
                    </div>


                    <div className={styles.bodyRightPart}>
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
                                <UilBag className={styles.inputIcon2}/>
                            </div>
                        </div>

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
                                className={styles.input2}
                                placeholder="Select here"
                                id="application"
                                options={applicationOptions}
                                />
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
        </div>
    )
}

export default CreateJobForm;
