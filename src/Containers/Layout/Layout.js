import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';
import classes from './Layout.module.scss';
import * as actions from '../../store/actions/index';

import Transition from 'react-transition-group/Transition'


import MainModal from '../../Components/UI/Modal/Main/MainModal';
import BackDrop from '../../Components/UI/BackDrop/BackDrop';
import EditModal from '../../Components/UI/Modal/Edit/EditModal';
import Portal from '../../Components/Portal/Portal';

import IntroNav from '../../Components/UI/IntroNav/IntroNav';
import Home from '../../Components/Intro/Home/Home';
import Features from '../../Components/Intro/Features/Features';
import SignUp from '../../Components/Intro/SignUp/SignUp';
import SignIn from '../../Components/Intro/SignIn/SignIn';
import Pricing from '../../Components/Intro/Pricing/Pricing';
import Support from '../../Components/Intro/Support/Support';


class Layout extends Component {
  state = {
    mainModal: false,
    editModal: false,
    
  };

  componentDidMount(){
    this.props.onAuthAutoSignIn();
  }
  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state;
  }

  //Update UI States ----------------------
    mainModalFalse = () => {
      this.setState({ mainModal: false });
    }
    mainModalTrue = () => {
      this.setState({ mainModal: true });
    }
    editModalFalse = () => {
      this.setState({ editModal: false });
    }
    editModalTrue = () => {
      this.setState({ editModal: true });
    }
    backDropFalse = () => {
      this.setState({ backDrop: false });
      if(this.state.mainModal){
        this.mainModalFalse();
      }
      if(this.state.editModal){
        this.editModalFalse();
      }
    }
    backDropTrue = () => {
      this.setState({ backDrop: true });
    }

  //Helper Functions --------------------------
    idGenerator = () => {
      return Math.random().toString(36).substr(2, 9);
    }

  //Task Functions -------------
     addNewTask = (task) => {
      let newTask = {
        ...task
      };
      let currentPath = this.props.location.pathname.split('/')[2];
      this.props.onAddNewTask(newTask, currentPath)
    }
    removeTask = (event, fbID) => {
      let currentPath = this.props.location.pathname.split('/')[2];
      this.props.onRemoveTask(fbID, currentPath)
    }
    editCurrentTask = (task) => {
      let updatedTask = { fbID: '', ...task };
      let event;
      const updatedTaskList = this.props.taskList;
      updatedTaskList.forEach(t => {
        if(updatedTask.id === t.id){
            this.removeTask(event, task.fbID);
            updatedTask.id = this.idGenerator();
            this.addNewTask(updatedTask);
        }
      });
    }


  render(){

    // console.log(this.props.completedTasks)
    // console.log(this.props.authRedirect);

    
    
    let backDrop = null;
    if(this.state.mainModal || this.state.editModal){
      backDrop = <BackDrop 
                  backDropFalse={ this.backDropFalse } />
    }

    // let mainModal = null;
    // if(this.state.mainModal){
    //   mainModal = <MainModal 
    //                 newTask={ this.addNewTask}
    //                 mainModalFalse={ this.mainModalFalse } />
    // }

    let editModal = null;
    if(this.state.editModal){
      editModal = <EditModal
                    editModalFalse={ this.editModalFalse }
                    editCurrentTask={ this.editCurrentTask }
                    currentTask={ this.props.currentTask } />
    }

    let introNav = null;
    if( this.props.location.pathname === '/home' || 
        this.props.location.pathname === '/features' || 
        this.props.location.pathname === '/pricing' || 
        this.props.location.pathname === '/support' || 
        this.props.location.pathname === '/account/signin' || 
        this.props.location.pathname === '/account/signup' ){
      introNav = <IntroNav />
    }

    let routes; 
    if(this.props.authToken == null){
      routes = (
      <Switch>
        <Route path='/home' component={ Home } />
        <Route path='/features' component={ Features } /> 
        <Route path='/pricing' component={ Pricing } />
        <Route path='/support' component={ Support } />
        <Route path='/account/signin' component={ SignIn } />
        <Route path='/account/signup' component={ SignUp } />
        <Redirect to={ this.props.authRedirect } />
      </Switch>
    );
    } else if(this.props.authToken != null){
      routes = (
        <Switch>
          {/* <Route path='/home' component={ Home } />
          <Route path='/features' component={ Features } /> 
          <Route path='/pricing' component={ Pricing } />
          <Route path='/support' component={ Support } />
          <Route path='/account/signin' component={ SignIn } />
          <Route path='/account/signup' component={ SignUp } /> */}
          <Route path="/all" render={() => 
            <Portal
              loading={this.props.loading} 
              progress={ this.props.progress}
              logout={ this.props.onLogout }

              UserName={ this.props.user }
              tasks={ this.props.taskList }
              completedTasks={ this.props.completedTasks }
              completedCount={ this.props.completedCount }
              showCompleted={ this.state.showCompleted }

              updatedCompletedState={ this.completedHandler }
              addStatus={ this.state.addTaskStatus }
              removeTask={ this.removeTask }
              completeTask={ this.completeTask }
              unCompleteTask={ this.unCompleteTask }
              setCurrentTask={ this.setCurrentTask }

              mainModalTrue={ this.mainModalTrue }
              
              currentTask={ this.props.currentTask }
              editModalTrue={ this.editModalTrue } />} />

          <Redirect to={ this.props.authRedirect } />
        </Switch>
        
      )
      
    }
    
    return (
      <div className={ classes.Layout }>

            { backDrop }
            <Transition 
              mountOnEnter
              unmountOnExit
              in={ this.state.mainModal } 
              timeout={ 1000 } >
                {state => (
                  <MainModal 
                    show={ state }
                    newTask={ this.addNewTask}
                    mainModalFalse={ this.mainModalFalse } />
                )}
            </Transition>
            {/* { mainModal } */}
            { editModal }
            { introNav }
            { routes }
          
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    //AUTH - USER
    user: state.auth.user,
    authUserId: state.auth.userId,
    authLoading: state.auth.loading,
    authError: state.auth.error,
    authToken: state.auth.token,
    authRedirect: state.auth.redirect,
    authSignIn: state.auth.SignIn,

    //MAIN FUNC
    currentTask: state.main.currentTask,
    taskList: state.main.taskList
    
  }
}

const mapDispatchToState = dispatch => {
  return {
    onAuthAutoSignIn: () => dispatch(actions.checkAuthState()),
    onLogout: () => dispatch(actions.logout()),
    onAddNewTask: (task, currentPath) => dispatch( actions.postNewTask(task, currentPath)),
    onRemoveTask: (fbID, currentPath) => dispatch(actions.removeTask(fbID, currentPath)),
  }
}

export default connect(mapStateToProps, mapDispatchToState)(withRouter(Layout));