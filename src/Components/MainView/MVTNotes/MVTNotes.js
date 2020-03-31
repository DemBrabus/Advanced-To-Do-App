import React from 'react';
import classes from './MVTNotes.module.scss';

const MVTNotes = (props) => {
  return (
    <div className={ classes.MVTNotes }>
      <p className={ classes.Title }>Notes</p>
      <p className={ classes.Notes }>{ props.notes }</p>
    </div>
  )
};

export default MVTNotes;