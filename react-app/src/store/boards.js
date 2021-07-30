const SET_BOARD = 'boards/SET_BOARD';
const EDIT_BOARD =  'boards/EDIT_BOARD';

const setBoard = (boards) => ({
    type: SET_BOARD,
    boards
  });

const editBoard = (board) => ({
    type: EDIT_BOARD,
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
      default:
        return state;
    }
  }
