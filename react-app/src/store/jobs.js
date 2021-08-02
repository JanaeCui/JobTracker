const SET_JOB = 'jobs/SET_JOB';
const POST_JOB= 'jobs/POST_JOB';
const CLEAR_JOB = 'jobs/CLEAR_JOB';

const setJob =(jobs)=>({
    type: SET_JOB,
    jobs
})

const createJob = (job) => ({
  type: POST_JOB,
  job
})

const removeAllJobs = (jobs)=>({
  type:CLEAR_JOB,
  jobs
})

const initialState = {};

export const getJobs = (boardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${boardId}/jobs`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(setJob(data));
    }
  }

export const postJob = (job) => async (dispatch) => {
    // const res = await fetch(`/api/jobs/post/`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(job)
    // });
    // if (res.ok) {
    //     const data = await res.json();
    //     if (data.errors) {
    //         return data;
    //     }
    //     dispatch(createJob(data));
    //     return data;
    // }
    dispatch(createJob(job));
    return job;
}


  export const deleteAllJobs = (boardId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}/jobs`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeAllJobs(data))
        return data;
    }
  }



  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_JOB:
        const allJobs ={}
        action.jobs.forEach(job =>{
            allJobs[job.id] = job
        })
        return allJobs
      case POST_JOB:
        return {
            ...state,
            [action.job.id] : action.job
        }
      case CLEAR_JOB:
        const newObj = {...state};
        action.jobs.forEach(job => {
          delete newObj[job.id];
        })
        return newObj
      default:
        return state;
    }
  }
