import React from 'react';
import classes from './ToolBar.module.scss';

import ProgressBar from '../UI/ProgressBar/ProgressBar'
import UserInfo from './UserInfo/UserInfo';
import TaskBlock from './TaskBlock/TaskBlock';
import Completed from './Completed/Completed';


const ToolBar = (props) => {


  return (
    <div className={ classes.ToolBar }>
      <div className={ classes.Inner }>

        <ProgressBar 
          loading={ props.loading }
          progress={ props.progress } />

        <UserInfo
          UserName={ props.UserName }
          logout={ props.logout } />

        <TaskBlock
          tasks={ props.tasks }
          addStatus={ props.addStatus }
          setCurrentTask={ props.setCurrentTask }
          removeTask={ props.removeTask }
          completeTask={ props.completeTask }
          mainModalTrue={ props.mainModalTrue } />

        <Completed
          completedTasks={ props.completedTasks }
          showCompleted={ props.showCompleted }
          updatedCompletedState={ props.updatedCompletedState }
          unCompleteTask={ props.unCompleteTask }
          completedCount={ props.completedCount }
          removeTask={ props.removeTask } />

      </div>
    </div>
  )
};

export default ToolBar;