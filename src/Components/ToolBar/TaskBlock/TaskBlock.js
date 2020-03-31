import React, { Component } from 'react';
import classes from './TaskBlock.module.scss';
import Task from '../Task/Task';
import { withRouter, NavLink } from 'react-router-dom';

class TaskBlock extends Component {
  state = {
    tasks: [],
  }

    render(){

      let tasks = null;
      if(this.props.tasks.length > 0){
        tasks = this.props.tasks.map(task => {
          return (
            <li 
              key={ task.id }
              onClick={ (event) => this.props.setCurrentTask(event, task.id, task.fbID) }
              className={ classes.TaskItem }>
              <NavLink
                activeClassName={ classes.Active }
                to={{
                  pathname: '/all/task/' + task.id,
                  search: '?title=' + task.name,
                }}
                >
                  <Task 
                    id={ task.id }
                    name={ task.name }
                    removeTask={(event) => {
                      this.props.removeTask(event, task.fbID)}}
                    completeTask={(event) => {
                      this.props.completeTask(event, task.fbID, task.id)}} />
              </NavLink>
            </li>
          ) 
        });
      }

    return (
      <div className={ classes.TaskBlock }>

        <div className={ classes.TitleBlock }>
          <p className={ classes.Title }>Your Tasks</p>
        </div>

        <div className={ classes.TaskList }>
          <ul>
            { tasks }
          </ul>
          <div 
            onClick={ this.props.mainModalTrue }
            className={ classes.AddBlock }>
            <p>+ Add a task</p>
          </div>
        </div>

      </div>
    )
  }
};

export default withRouter(TaskBlock);