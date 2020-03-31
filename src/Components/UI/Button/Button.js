import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {

  let btnDisabled = false;
  if(props.disabled){
    btnDisabled = true
  }

  let color = props.buttonColor;
  return (
    <button 
      disabled={ btnDisabled }
      onClick={ props.clicked }
      style={{ backgroundColor: `${color}` }}
      className={ classes.Button }>
        { props.buttonText }
    </button>
  )
};

export default Button;