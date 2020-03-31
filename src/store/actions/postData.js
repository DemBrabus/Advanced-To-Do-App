import axiosInstance from '../../axios-data';
import * as dataActions from './index';


const updateTasks = (userId, currentPath) => {
  return dispatch => {
    dispatch(dataActions.getInitData(userId, currentPath))
  }
}


export const postNewTask = (task, currentPath) => {
  let newTask = {
        ...task
      };
  const userId = localStorage.getItem('userId')
  return dispatch => {
    axiosInstance.post('/tasks.json', newTask)
        .then( response => {
          dispatch(updateTasks(userId, currentPath))
        })
        .catch(error => {
          console.log(error.message);
          
        })
  }
}

export const removeTask = (id, currentPath) => {
  const userId = localStorage.getItem('userId')
  return dispatch => {
    axiosInstance.delete(`/tasks/${id}.json`)
        .then( response => {
          dispatch(updateTasks(userId, currentPath))
        })
        .catch(error => {
          console.log(error.message);
          
        })
      axiosInstance.delete(`/completed/${id}.json`)
        .then( response => {
          dispatch(updateTasks(userId, currentPath))
        })
        .catch(error => {
          console.log(error.message);
          
        })
  }
}

export const completeTask = (fbID, updatedTask, currentPath) => {
  const userId = localStorage.getItem('userId')
  return dispatch => {
    axiosInstance.post('/completed.json', updatedTask);
    axiosInstance.delete(`/tasks/${fbID}.json`)
      .then(response => {
        dispatch(updateTasks(userId, currentPath))
      })
  }
}

export const uncompleteTask = (fbID, updatedTask, currentPath) => {
  const userId = localStorage.getItem('userId')
  return dispatch => {
    axiosInstance.post('tasks.json', updatedTask);
    axiosInstance.delete(`completed/${fbID}.json`)
      .then(response => {
        dispatch(updateTasks(userId, currentPath))
      })
  }
}