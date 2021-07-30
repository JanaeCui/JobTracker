const SET_BOARD = 'boards/SET_BOARD';
const EDIT_BOARD =  'boards/EDIT_BOARD';
const POST_BOARD = 'boards/POST_BOARD';
const DELETE_BOARD = 'boards/DELETE_BOARD';

const setBoard = (boards) => ({
    type: SET_BOARD,
    boards
  });

const editBoard = (board) => ({
    type: EDIT_BOARD,
    board
})

const createBoard = (board) =>({
    type: POST_BOARD,
    board
})

const removeBoard = (board)=>({
    type: DELETE_BOARD,
    board
})

const initialState = {};


export const getBoards = () => async (dispatch) => {
    const response = await fetch('/api/boards/', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(setBoard(data));
    }
  }

  export const updateBoard = (name, BoardId) => async (dispatch) => {
    const response = await fetch(`/api/boards/${BoardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(editBoard(data));
      return data
   }

  }

  export const postBoard = (board) => async (dispatch) => {
    const res = await fetch(`/api/boards/post/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(board)
    });
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
        dispatch(createBoard(data));
        return data;
    }
}

export const deleteBoard = (id) => async (dispatch) => {
  const res = await fetch(`/api/boards/${id}`, {
      method: 'DELETE'
  });

  if (res.ok) {
      const data = await res.json();
      dispatch(removeBoard(data))
      return data;
  }
}


 export default function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_BOARD:
        const allBoards ={}
        action.boards.forEach(board =>{
            allBoards[board.id] = board
        })
        return allBoards
      case EDIT_BOARD:
        return {
            ...state,
            [action.board.id] : action.board
        }
      case POST_BOARD:
        return {
            ...state,
            [action.board.id] : action.board
        }
      case DELETE_BOARD:
        const newObj = {...state};
        delete newObj[action.board.id];
        return newObj
      default:
        return state;
    }
  }
