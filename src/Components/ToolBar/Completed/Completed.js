import React from 'react';
import classes from './Completed.module.scss';
import Task from '../Task/Task';

const Completed = (props) => {

  // console.log(props);

  let completedStyle = true;
  

  let CompletedTasks;
  if(props.completedTasks){
    CompletedTasks = props.completedTasks.map(task => {
      return (
        <li
          key={ task.id }>
            <Task
              name={ task.name }
              removeTask={ (event) => props.removeTask(event, task.fbID) }
              completedStyle={ completedStyle }
              unCompleteTask={ (event) => props.unCompleteTask( event, task.fbID, task.id ) }/>
        </li>
      )
    })
  }

  let showCompleted = '44px';
  if(props.showCompleted){
    showCompleted = 'none'; 
  }


  return (
    <div 
      className={  classes.Completed} 
      style={{ maxHeight:`${showCompleted}` }}>
      <div className={ classes.Inner }>

        <div 
          onClick={ props.updatedCompletedState }
          className={ classes.TitleWrap }>
            <span>&#10004;</span>
          <p className={ classes.Title }>Completed</p>
          <p className={ classes.Count }>{ props.completedCount }</p>
        </div>

        <div className={ classes.CompletedTasks }>
          <ul>

            { CompletedTasks }

          </ul>
        </div>
        

      </div>
    </div>
  )
};

export default Completed;