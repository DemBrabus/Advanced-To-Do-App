import React, { Component } from 'react';
import classes from './Portal.module.scss';

import { Route, withRouter } from 'react-router'
import ToolBar from '../ToolBar/ToolBar';
import MainView from '../MainView/MainView';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class Portal extends Component {
  state ={ 
    showCompleted: false
  }

  componentDidMount(){
    let currentPath = this.props.location.pathname.split('/')[2];
    if(this.props.authToken != null){
      this.props.onGetTaskList(this.props.userId, currentPath);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state;
  }

  //UI Updates
    completedHandler = () => {
      let currentState = this.state.showCompleted;
      this.setState({ showCompleted: !currentState })
    }
  
  //Helper Functions --------------------------
    idGenerator = () => {
      return Math.random().toString(36).substr(2, 9);
    }

  //Task Handlers ----------------------------
    removeTask = (event, fbID) => {
      let currentPath = this.props.location.pathname.split('/')[2];
      this.props.onRemoveTask(fbID, currentPath)
    }
    completeTask = (event, fbID, id) => {
      let currentPath = this.props.location.pathname.split('/')[2];
      const tasks = this.props.taskList;
      tasks.forEach(task => {
        if(task.id === id){
          let updatedTask = {
                  ...task,
                  fbID: ''
                            }
          this.props.onCompleteTask(fbID, updatedTask, currentPath)
        }
      })
    }
    unCompleteTask = (event, fbID, id) => {
      let currentPath = this.props.location.pathname.split('/')[2];
      const tasks = this.props.completedTasks;
      tasks.forEach(task => {
        if(task.id === id){
          let updatedTask = {
                  ...task,
                  fbID: ''
                            }
          this.props.onUncompleteTask(fbID, updatedTask, currentPath)
        }
      })
    }
    setCurrentTask = (event, id, fbID) => {
      const tasks = this.props.taskList;
      tasks.forEach(task => {
        if(task.id === id){
          const thisTask = {...task}
          this.props.onUpdateCurrentTask(thisTask)
        }
      })
    }
    

  render(){

    let content = (
          <React.Fragment>
            <Route path='/all' render={ () => 
              <ToolBar
                loading={this.props.loading} 
                progress={ this.props.progress}
                logout={ this.props.logout }

                UserName={ this.props.user }
                tasks={ this.props.taskList }
                completedTasks={ this.props.completedTasks }
                completedCount={ this.props.completedCount }
                showCompleted={ this.state.showCompleted }

                updatedCompletedState={ this.completedHandler }
                addStatus={ this.state.addTaskStatus}
                removeTask={ this.removeTask }
                completeTask={ this.completeTask  }
                unCompleteTask={ this.unCompleteTask }
                setCurrentTask={ this.setCurrentTask }

                mainModalTrue={ this.props.mainModalTrue } /> } />
              
            <Route path='/all' render={ () => 
              <MainView 
                tasks={ this.props.taskList }
                currentTask={ this.props.currentTask }
                completeTask={ this.completeTask }
                editCurrentTask={ this.editCurrentTask }
                editModalTrue={ this.props.editModalTrue } /> } />
          </React.Fragment>
    )

    return (
      <div className={ classes.Portal }>
          { content }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    //AUTH - USER
    authToken: state.auth.token,
    userId: state.auth.userId,
    user: state.auth.user,

    //APP FUNC
    taskList: state.main.taskList,
    completedTasks: state.main.completedTasks,
    completedCount: state.main.completedTasksCount,
    currentTask: state.main.currentTask,
    loading: state.main.loading,
    progress: state.main.progressBar,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTaskList: (userId, currentPath) => dispatch( actions.getInitData(userId, currentPath)),
    onUpdateCurrentTask: (task) => dispatch( actions.updateCurrentTask(task)),
    
    onRemoveTask: (fbID, currentPath) => dispatch(actions.removeTask(fbID, currentPath)),
    onCompleteTask: (fbID, updatedTask, currentPath) => dispatch(actions.completeTask(fbID, updatedTask, currentPath)),
    onUncompleteTask: (fbID, updatedTask, currentPath) => dispatch(actions.uncompleteTask(fbID, updatedTask, currentPath))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Portal));