# Welcome To JobTracker

JobTracker is a job search management platform that allows users to easily to track their job search status. The user can create a board collection to collect jobs in one folder and they can add, edit and delete this board folder and they also can add job cards under the board which they created. And they also can add, edit and delete job cards any time any where. They can click the link button to link to the job post website like linkedin and they also can add the applied job, offer, interview in the calendar to easily get a reminder. They also can search the job cards by the position name, company name and date. They can upload and edit and delete a company logo by choosing the file in their computer. They also can easily change their profile name just by clicking the name and edit it. The most import function is they can drag and drop the job cards to manage these jobs.

<br>

[Click here to see it in action!](https://app-jobtrack.herokuapp.com/)

<br>

## Splash Page

![home](https://user-images.githubusercontent.com/67615302/128549080-7ace5374-fd7e-4a49-a2ce-44f56c1d2d95.png)
![home](https://user-images.githubusercontent.com/67615302/128549462-67eca23b-4b9b-4204-8f4e-b260b56c818f.png)
![home](https://user-images.githubusercontent.com/67615302/128549342-0ecd3935-1a3f-4119-bc3b-7e44df495ebf.png)

<br>
# Technologies Used

The main logic of the backend of jobTracker was created using python and flask with all database aspects being initialized using sqlalchemy and handled with postgreSQL.The front end was created using Javascript and rendered using React. React was chosen for this project due to its lite foot print, quick response times to maximize user experience especially when there may be multiple query's happening per page, and strong ecosystem backing and support especially around library's and other recourses to help maximize efficiency . The Site was styled with the use of CSS modules.

<br>

# Components

## Browsing Job Cards
* On the main page the application renders a list of available job boards and job cards that are available for the session users. On these individual job cards there is a job position title, a compony name and date based on the user job search status. If users do not upload a compony logo the logo should have the same color as the column color, otherwise it shows the compony logo they uploaded.

<br>

![image](https://user-images.githubusercontent.com/67615302/128550367-3fa4a7aa-f6c1-46fa-8248-ff1f8a155320.png)

<br>

###  - Drag and Drop
* In the main page there is a drag and drop feature that users can drag and drop the job cards in different columns, applied job column, interview column, offered column and rejected column. And the text on the job card can dynamically change from one application state to another application state. And the logo color can dynamically change by dragging and dropping.

![image](https://user-images.githubusercontent.com/67615302/128552085-5d8c9196-4ace-42fb-8d20-25f4174d3009.png)

<br>

```javascript
 //---------------------------------drag and drop--------------------------------

const onDragEnd = async (result) => {
const { destination, source, draggableId, type } = result;
// console.log('destination', destination, 'source', source, draggableId);

if (!destination || source.droppableId === destination.droppableId) {
    return;
}

const selectedJob = applicationMap[draggableId];

const newApplication = {
    name: selectedJob.jobs.companies.name,
    location: selectedJob.jobs.companies.location,
    logo_url: selectedJob.jobs.companies.logo_url,

    position_name: selectedJob.jobs.position_name,
    link_url: selectedJob.jobs.link_url,
    salary: selectedJob.jobs.salary,
    description: selectedJob.jobs.description,
    company_id: selectedJob.jobs.companies.id,

    state: destination.droppableId,
    date: new Date(),
    selected_board_id: selected,
    job_id: selectedJob.jobs.id,
    application_id:selectedJob.id
    }

    var form_data = new FormData()
    for ( var key in newApplication ) {
    form_data.append(key, newApplication[key]);
    }
    await dispatch(updateJob(form_data))
}

```

<br>

###  - Search
* In the main page there is also a search feature that is used by running a filter query on the current state of application jobs and returning only the job cards that match the job position name, company name or date.

<br>

```javascript
  //---------------------------------search---------------------------

const [searchTerm, setSearchTerm] = useState("");
const editSearch = (e) => {
    setSearchTerm(e.target.value);
};

const getTime = (date) => {
    if (date) {
    return format(Date.parse(date), "yyyy-MM-dd")
    }
    return "";
}

const getReleventDateSTr = (job, state) => {
    switch(state) {
    case "applied":
        return getTime(job.applied_date)
    case "interview":
        return getTime(job.interviewed_date)
    case "offered":
        return getTime(job.offered_date)
    case "rejected":
        return getTime(job.rejected_date)
    default:
        return ""
    }

}
const dynamicSearch = () => {
    return applicationRelatedJobs.filter((applicationRelatedJob) =>{
        return applicationRelatedJob?.jobs?.position_name?.toLowerCase().includes(searchTerm.toLowerCase())
        || applicationRelatedJob?.jobs?.companies.name?.toLowerCase().includes(searchTerm.toLowerCase())

        || getReleventDateSTr(applicationRelatedJob, applicationRelatedJob.state).includes(searchTerm)
    }
    );
};

const getJobInColumn = (state) => {
    return dynamicSearch().filter(applicationRelatedJob => applicationRelatedJob.state === state);
}

const renderJobCard = (state)=>{
    let jobs = getJobInColumn(state)
    if(jobs){
        return jobs.map((appliedJob, index) =>{

        return <JobCard key={appliedJob.id} job={appliedJob} index={index}/>
        })
    }
    return []
}
```

<br>

## Post and Edit Job Boards and Job Cards

### Post and Edit Features
* If the users double click the board card, users can edit the board tile and if users click the plus button on the left bar, users can add board card. Users also can click the delete button to delete board. Of course, users can click the big plus button on the right bottom corner to create job card and if users click the existed job card can see all the job information and users can click the pencil button to edit the job information.

<br>

![image](https://user-images.githubusercontent.com/67615302/128562961-fecb5e7a-447e-44f2-a382-aaedeaefbd7b.png)
![image](https://user-images.githubusercontent.com/67615302/128563038-a5f2a90a-b9ad-40bf-b9f7-3cb101cfd3dd.png)
![image](https://user-images.githubusercontent.com/67615302/128563043-788fb19e-23a7-4e66-9130-ee99fb209b64.png)

### Job Forms
* All forms on the site from job card creating to job info editing are protected from Cross-Site Request Forgery attacks using csrf tokens. In addition each  individual form contains a set of its own unique error handling. Routes on the backend that go through the  database are handled using flask wtfroms and queried using squalchemy to send the submit information into the database.

<br>

```javascript
@application_route.route('/api/applications/post/', methods=['POST'])
def post_application():
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        url = ""
        if "logo_url" in request.files:
            image = request.files["logo_url"]

            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]

        newObj = {}
        company = Company(
            name=form.name.data,
            location=form.location.data,
            logo_url=url,
        )
        db.session.add(company)
        db.session.commit()
        print("company id_____", company.id)
        job = Job(
            position_name=form.position_name.data,
            link_url=form.link_url.data,
            salary=form.salary.data,
            description=form.description.data,
            company_id=company.id
        )
        db.session.add(job)
        db.session.commit()
        application = Application(
            state=form.state.data,
            job_id=job.id,
            user_id=current_user.id
        )
        if form.state.data == "applied":
            application.applied_date = form.date.data
        elif form.state.data == "interview":
            application.interviewed_date = form.date.data
        elif form.state.data == "offered":
            application.offered_date = form.date.data
        elif form.state.data == "rejected":
            application.rejected_date = form.date.data
        db.session.add(application)
        db.session.commit()

        child = Child(
            board_id=form.selected_board_id.data,
            application_id=application.id
        )
        db.session.add(child)
        db.session.commit()

        newObj["company"] = company.to_dict()
        newObj["job"] = job.to_dict()
        newObj["application"] = application.to_dict()

        return newObj

    errorMessages = []
    for field in form.errors:
        for error in form.errors[field]:
            formattedErr = error[10:]
            formattedField = field.replace('_', ' ').replace(' id', '').capitalize()
            errorMessages.append(f'{formattedField} {formattedErr}')
    return{'errors': errorMessages}

```

## Link And Calendar
### Link To Outside Web
 * Users can click the link button to directly link to the website like linkedin which has more details of job which users post. The users can easily just click the link button on the job card or also can click the link in the job info form.

 ```javascript
<div className={newStyles.label__container5}>
    <label className={newStyles.label}>Post URL</label>

    <div className={newStyles.inputDiv}>
        <UilLink className={newStyles.inputIcon}/>
        {postUrl?<a href={postUrl} target="_blank" className={newStyles.input_job_link}>Job Link </a>:null}
    </div>
</div>

<div className={styles.buttons}>
    <UilLink onClick={handleLinktoLinkedin} className={styles.editButton}/>
    <UilTrashAlt onClick={handleDelete} className={styles.deleteButton}/>
</div>

const handleLinktoLinkedin = (e) =>{
    e.stopPropagation()
    if(job.jobs.link_url){
        window.open(job.jobs.link_url, "_blank")
    }
}

 ```

 <br>



### Calender
 * Users can add the interview date, offer date to your own apple calendar, google calendar, outlook calendar and Yahoo calendar. To make sure users can get notification when that important date coming.


```javascript
//-------------------------add to calendar-----------------------------

let event = {
    title: job.jobs.position_name,
    description: job.jobs.description,
    location: job.jobs.companies.location,
}
if(job.state === "applied" ){
    // event.startsAt = `${format(Date.parse(job.applied_date), "yyyyMMddTHHmmss")}Z`
    // event.endsAt = `${format(Date.parse(job.applied_date), "yyyyMMddTHHmmss")}Z`
    event.startDatetime = `${format(Date.parse(job.applied_date), "yyyyMMdd")}Z`
    event.endDatetime = `${format(Date.parse(job.applied_date), "yyyyMMdd")}Z`
    event.duration = 0
}
else if(job.state === "interview" ){
    event.startDatetime = `${format(Date.parse(job.interviewed_date), "yyyyMMdd")}Z`
    event.endDatetime = `${format(Date.parse(job.interviewed_date), "yyyyMMdd")}Z`
    event.duration = 0
}
else if(job.state === "offered" ){
    event.startDatetime = `${format(Date.parse(job.offered_date), "yyyyMMdd")}Z`
    event.endDatetime = `${format(Date.parse(job.offered_date), "yyyyMMdd")}Z`
    event.duration = 0
}
else if(job.state === "rejected" ){
    event.startDatetime = `${format(Date.parse(job.rejected_date), "yyyyMMdd")}Z`
    event.endDatetime = `${format(Date.parse(job.rejected_date), "yyyyMMdd")}Z`
    event.duration = 0
}

const AddToCalendar = ReactAddToCalendarHOC(Button, Dropdown);

 ```
 <br>

## Not Found Page
### 404
 * Once the users accidentally go into a url not belongs to our routes, we make a nice 404 page for them and nicely direct them back to home page.

 <br>

![image](https://user-images.githubusercontent.com/67615302/128565458-6b0e409b-3d29-4372-9c9f-0b82ce179ec8.png)

 <br>
