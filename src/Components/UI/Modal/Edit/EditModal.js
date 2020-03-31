import React, { Component } from 'react'
import { connect } from 'react-redux';

import classes from './EditModal.module.scss'
import Input from '../../Input/Input';
import Button from '../../Button/Button';

class EditModal extends Component {
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
      }
    },
    updatedTask: {
      userId: '',
      id: '',
      name: '',
      description: '',
      notes: '',
      fbID: ''
    }
  }

  componentDidMount(){
    this.setCurrentTask();
  }

  setCurrentTask = () => {
    let currentTask = { ...this.props.currentTask };
    let constructedTask = { ...this.state.taskForm };
      constructedTask.name.value = currentTask.name
      constructedTask.description.value = currentTask.description
      constructedTask.notes.value = currentTask.notes
      constructedTask.date.value = currentTask.date
      this.setState({ taskForm: constructedTask });
  }

  onChangeHandler = (event, id) => {
    const task = { ...this.state.taskForm }
    const taskData = { ...task[id] } 
    taskData.value = event.target.value;
    task[id] = taskData;
    this.setState({ taskForm: task })
  }

  saveHandler = (event) => {
    let propsCurrentTask = { ...this.props.currentTask }
    let task = { 
      ...this.state.updatedTask
    }
      task.userId = this.props.userId
      task.id = this.props.currentTask.id;
      task.name = this.state.taskForm.name.value;
      task.description = this.state.taskForm.description.value;
      task.notes = this.state.taskForm.notes.value;
      task.date = this.state.taskForm.date.value;
      task.fbID = propsCurrentTask.fbID;
      
      this.props.editCurrentTask(task)
      this.props.editModalFalse();
      event.preventDefault();
  }

  cancelHandler = (event) => {
      this.props.editModalFalse();
      event.preventDefault();
    }


  render(){

    // console.log('Updated Task: ', this.state.updatedTask);
    // console.log('Props Current Task: ', this.props.currentTask);

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
      <div className={ classes.EditModal }>
        <div className={ classes.Inner }>

            <div 
              onClick={ this.props.editModalFalse }
              className={ classes.ExitWrap }>
              <div className={ classes.ExitWrapInner }>
                <div className={ classes.ExitLine1 }></div>
                <div className={ classes.ExitLine2 }></div>
              </div>
            </div>

            <p className={ classes.Header }>Edit your task!</p>
            <p className={ classes.Instructions }>Adjust task data...</p>

            { form }

          </div>
      </div>
    ) 
  }
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    currentTask: state.main.currentTask
  }
}

export default connect(mapStateToProps)(EditModal);