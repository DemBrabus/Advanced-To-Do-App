import * as actionTypes from '../actions/actionTypes';

const initState = {
  taskList: [],
  completedTasks: [],
  completedTasksCount: '',
  currentTask: {},
  loading: false,
  progressBar: '0%',
}

const mainReducer = (state = initState, action) => {
  switch (action.type){
      case actionTypes.STORE_TASKS:
        return {
          ...state,
          taskList: action.taskList
        }
      case actionTypes.STORE_COMPLETED_TASKS:
        return {
          ...state,
          completedTasks: action.completedTasks,
          completedTasksCount: action.completedTasksCount
        }
      case actionTypes.STORE_CURRENT_TASKS:
        return {
          ...state,
          currentTask: action.currentTask
        }
      case actionTypes.UPDATE_CURRENT_TASKS:
        return {
          ...state,
          currentTask: action.currentTask
        }
      case actionTypes.START_PROGRESS:
        return {
          ...state,
          loading: true,
          progressBar: action.progress
        }
      case actionTypes.END_PROGRESS:
        return {
          ...state,
          loading: false,
          progressBar: action.progress
        }
    default: return state
  }
}

export default mainReducer;