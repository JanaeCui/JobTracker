const SET_ALLJOBS = 'jobs/SET_ALLJOBS';

const setAllJob =(jobs)=>({
    type: SET_ALLJOBS,
    jobs
  })

  export const getAllJobs = () => async (dispatch) => {
    const response = await fetch(`/api/jobs`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(setAllJob(data));
    }
  }

  const initialState = {};
  export default function reducer(state = initialState, action) {
    switch (action.type) {

      case SET_ALLJOBS:
        const allJobs ={}
        action.jobs.forEach(job =>{
            allJobs[job.id] = job
        })
        return allJobs
      default:
        return state;
    }
  }
