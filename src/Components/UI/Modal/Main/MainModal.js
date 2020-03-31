import React, { Component } from 'react';
import axiosInstance from '../../../../axios-data';
import classes from './MainModal.module.scss';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { connect } from 'react-redux';

class MainModal extends Component {
  state = {
    taskForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter a Task Name'
        },
        value: ''
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Task Description'
        },
        value: ''
      },
      notes: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Add Any Notes'
        },
        value: ''
      },
      date: {
        elementType: 'input',
        elementConfig: {
          type: 'date',
          placeholder: 'Add a Due Date'
        },
        value: ''
      },
      // subtasks: {
      //   elementType: 'input',
      //   elementConfig: {
      //     type: 'text',
      //     placeholder: 'Add A SubTask'
      //   },
      //   value: ''
      // },
    },
    formButton: {
      cancel: {
        name: 'Cancel',
        color: 'rgb(191, 191, 191)'
      },
      save: {
        name: 'Save',
        color: 'rgb(143, 181, 213)',
        action: '',
      }
    },
    newTask: {
      userId: '',
      id: '',
      name: '',
      description: '',
      notes: ''
    },
    newTaskAdd: false,
  };



    idGenerator = () => {
      return Math.random().toString(36).substr(2, 9);
    }

    onChangeHandler = (event, id) => {
      const updatedNewTask = {
        ...this.state.taskForm
      };
      const newTaskData = {
        ...updatedNewTask[id]
      }
      newTaskData.value = event.target.value
      updatedNewTask[id] = newTaskData;
      this.setState({ taskForm: updatedNewTask })
    };

    saveHandler = (event) => {
      const constructedTask = {...this.state.newTask}; 
        constructedTask.userId = this.props.userId
        constructedTask.id = this.idGenerator()
        constructedTask.name = this.state.taskForm.name.value
        constructedTask.description = this.state.taskForm.description.value
        constructedTask.notes = this.state.taskForm.notes.value
        constructedTask.date = this.state.taskForm.date.value
        
        this.sendNewTask(constructedTask);
        this.props.mainModalFalse();
        event.preventDefault();
    }

    cancelHandler = (event) => {
      this.props.mainModalFalse();
      event.preventDefault();
    }

    postNewTask = () => {
      const newTask = this.state.newTask;
      axiosInstance.post('/tasks.json', newTask)
        .then(response => {
          console.log('post Fired');
          this.props.mainModalFalse();
        })
      this.setState({ newTaskAdd: false });
    }

    sendNewTask = (task) => {
      let newTask = {
        ...task
      }
      this.props.newTask(newTask)
    }

 


  render(){

    const cssClasses = [
      classes.MainModal,
      this.props.show === 'entering' ? classes.ModalIn : 
      this.props.show === 'exiting' ? classes.ModalOut : null
    ]
      

    const formElementArray = []
      for(let key in this.state.taskForm){
        formElementArray.push({
          id: key,
          config: this.state.taskForm[key]
        })
      };

      const formButtonArray = [];
      for(let key in this.state.formButton){
        formButtonArray.push({
          id: key,
          config: this.state.formButton[key]
        })
      }

    let form = 
      <form className={ classes.Form }>
        { 
        formElementArray.map(formElement => (
          <Input 
            key={ formElement.id }
            elementtype={ formElement.config.elementType }
            elementconfig={ formElement.config.elementConfig }
            inputvalue={ formElement.config.value }
            changed={ (event) => this.onChangeHandler(event, formElement.id) } />
        ))
        }
        <div className={ classes.FormButtonWrap }>
           <Button 
              clicked={ this.cancelHandler }
              buttonColor={ this.state.formButton.cancel.color }
              buttonText={ this.state.formButton.cancel.name } 
              />
           <Button 
              clicked={ (event) => this.saveHandler(event) }
              buttonColor={ this.state.formButton.save.color }
              buttonText={ this.state.formButton.save.name } 
              />
          
        </div>
        
      </form>


    return (
        <div className={ cssClasses.join(' ') }>
          <div className={ classes.Inner }>

            <div 
              onClick={ this.props.mainModalFalse }
              className={ classes.ExitWrap }>
              <div className={ classes.ExitWrapInner }>
                <div className={ classes.ExitLine1 }></div>
                <div className={ classes.ExitLine2 }></div>
              </div>
            </div>

            <p className={ classes.Header }>Create a Task!</p>
            <p className={ classes.Instructions }>Fill out all necessary fields. All data can be changed and adjusted later.</p>

            { form }

          </div>
        </div>
    )
  }
};


const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(MainModal);