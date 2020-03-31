import React from 'react';
import classes from './MainView.module.scss';
import MainViewTask from './MainViewTask/MainViewTask';
import { Route, withRouter } from 'react-router';
import Logo from '../../Assets/Logo.png'

const MainView = (props) => {
  
  const noTaskPathHandler = () => {
    props.history.replace('/all');
  }

  if(props.currentTask === { id: '', name: '', description: '', notes: '' }){
    noTaskPathHandler();
  }

  let Task;
  if(props.location.pathname === '/all' || props.location.pathname === '/all/' || props.location.pathname === '/all/task' || props.location.pathname === '/all/task/'){
    Task = (<div style={{ width:'100%', 
                  height:'100%', 
                  display:'flex', 
                  justifyContent:'center', 
                  alignItems:'center', }}>
              <h1>What are we doing today?</h1>
            </div>)
  } else {
    // eslint-disable-next-line no-useless-concat
    Task = <Route  path={'/all/task/' + ':id'} render={ () => {
          return <MainViewTask 
                    task={ props.currentTask } 
                    completeTask={ (event) => props.completeTask(event, props.currentTask.fbID, props.currentTask.id) }
                    editCurrentTask={ (event) => props.editCurrentTask(event, props.currentTask, props.currentTask.id, props.currentTask.fbID) }
                    editModalTrue={ props.editModalTrue } />
        } }/>
  }
    

  return (
    <div className={ classes.MainView }>
      <div className={ classes.Inner }>

        <img src={ Logo } alt="Background Logo" className={ classes.BGLogo } />

        { Task }

      </div>
    </div>
  )
};

export default withRouter(MainView);


