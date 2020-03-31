import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement]

  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid)
  }

  switch(props.elementtype){
    case('input'):
      inputElement = <input
                      id={ props.id }
                      className={ inputClasses.join(' ') }
                      { ...props.elementconfig }
                      value={  props.inputvalue}
                      onChange={ props.changed } />
      break;
    default:
      inputElement = <input
                      id={ props.id }
                      className={ inputClasses.join(' ') }
                      { ...props.elementconfig }
                      value={  props.inputvalue}
                      onChange={ props.changed } />
  }

  return (
    <div className={ classes.Input }>
      <label className={ classes.Label }>{ props.label }</label>
      {inputElement}
    </div>
  )
}

export default Input;