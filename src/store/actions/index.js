export {
  getInitData,
  updateCurrentTask,
  getTasks,
  startProgress,
  endProgress
} from './getData';

export {
  postNewTask,
  removeTask,
  completeTask,
  uncompleteTask
} from './postData';

export {
  authSignUp,
  clearSignUp,
  clearError,
  checkAuthState,
  logout
} from './auth';