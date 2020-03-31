import axiosInstance from '../../axios-data';
import * as actionTypes from './actionTypes';


export const startProgress = () => {
  return {
    type: actionTypes.START_PROGRESS,
    progress: '0%'
  }
}

export const endProgress = () => {
  return {
    type: actionTypes.END_PROGRESS,
    progress: '100%'
  }
}

export const storeTasks = (data) => {
  return {
    type: actionTypes.STORE_TASKS,
    taskList: data
  }
}

export const storeCompletedTasks = (completedTasks, completedTasksCount) => {
  return {
    type: actionTypes.STORE_COMPLETED_TASKS,
    completedTasks: completedTasks,
    completedTasksCount: completedTasksCount
  }
}

export const storeCurrentTask = (task) => {
  return {
    type: actionTypes.STORE_CURRENT_TASKS,
    currentTask: task
  }
}


export const updateCurrentTask = (task) => {
  return {
    type: actionTypes.UPDATE_CURRENT_TASKS,
    currentTask: task
  }
}



export const getTasks = (userId, currentPath) => {
  return dispatch => {
    axiosInstance.get('https://adv-to-do.firebaseio.com/tasks.json')
        .then(response => {
          const fetchedTasks = [];
          for(let key in response.data){
            if(response.data[key].userId === userId){
              fetchedTasks.push({
                ...response.data[key],
                fbID: key,
              });
            }
          }
          if(response.data === null){
            dispatch(storeTasks(fetchedTasks));
            dispatch(storeCurrentTask({
               id: '', name: '', description: '', notes: '' 
            }))
          } else {
            dispatch(storeTasks(fetchedTasks));
            fetchedTasks.forEach(task => {
              if(task.id === currentPath){
                dispatch(storeCurrentTask(task))
              }
            })
          }
            dispatch(endProgress())
        })
        .catch(error => {
          console.log(error.message)
        })
  }
}
export const getCompletedTasks = (userId) => {
  return dispatch => {
      axiosInstance.get('https://adv-to-do.firebaseio.com/completed.json')
        .then(response => {
          const fetchedCompleted = [];
          for(let key in response.data){
            fetchedCompleted.push({
              ...response.data[key],
              fbID: key,
            });
          }
          dispatch(storeCompletedTasks(fetchedCompleted, fetchedCompleted.length))
        })
  }
}



export const getInitData = (userId, currentPath) => {
  return dispatch => {
    dispatch(startProgress())
    dispatch(getTasks(userId, currentPath))
    dispatch(getCompletedTasks(userId))
  }
}