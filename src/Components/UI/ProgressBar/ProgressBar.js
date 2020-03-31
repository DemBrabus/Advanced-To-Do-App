import React from 'react';
import classes from './ProgressBar.module.scss';

const ProgressBar = (props) => {

  let visibility; 
  if(props.loading){
      visibility = 1
  } else {
    visibility = 0
  }

  return (
    <div className={ classes.ProgressBar }>
      <div className={ classes.Inner } >
        <div 
          className={ classes.Progress } 
          style={{ width: props.progress, opacity: `${visibility}` }}>

        </div>
      </div>
    </div>
  )
}

export default ProgressBar;