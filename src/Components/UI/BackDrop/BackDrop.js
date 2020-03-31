import React from 'react'
import classes from './BackDrop.module.scss'

const BackDrop = (props) => {
  return (
    <div 
      onClick={ props.backDropFalse }
      className={ classes.BackDrop }>

    </div>
  )
};

export default BackDrop;