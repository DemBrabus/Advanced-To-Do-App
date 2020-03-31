import React from 'react';
import classes from './MVTDesc.module.scss';

const MVTDesc = (props) => {
  return (
    <div className={ classes.MVTDesc }>
      <p className={ classes.Title }>Description</p>
      <p className={ classes.Description }>{ props.description }</p>
    </div>
  )
};

export default MVTDesc;