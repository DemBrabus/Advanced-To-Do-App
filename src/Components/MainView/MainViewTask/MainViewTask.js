import React from 'react';
import classes from './MainViewTask.module.scss';
import MVTHeader from '../MVTHeader/MVTHeader';
import { withRouter } from 'react-router-dom'
import MVTDesc from '../MVTDesc/MTVDesc';
import MVTNotes from '../MVTNotes/MVTNotes';

const MainViewTask = (props) => {

  

  return (
    <div className={ classes.MainViewTask }>
      <MVTHeader
        name={ props.task.name }
        date={ props.task.date }
        completeTask={ props.completeTask }
        editCurrentTask={ props.editCurrentTask }
        editModalTrue={ props.editModalTrue } />

      <MVTDesc
        description={ props.task.description } />

      <MVTNotes
        notes={ props.task.notes } />

    </div>
  )
};

export default withRouter(MainViewTask);