const SET_JOB = 'jobs/SET_JOB';
const CLEAR_JOB = 'jobs/CLEAR_JOB';

const setJob =(jobs)=>({
    type: SET_JOB,
    jobs
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
