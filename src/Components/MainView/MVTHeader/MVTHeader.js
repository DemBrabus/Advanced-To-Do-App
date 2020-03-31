import React from 'react';
import classes from './MVTHeader.module.scss';

const MVTHeader = (props) => {
    let modDate;
    if(props.date){
      let dueDate = props.date;
    let year = dueDate.split('-')[0];
    let month = dueDate.split('-')[1];
    let day = dueDate.split('-')[2];
    modDate = `${month} - ${day} - ${year}`;
    }

    

  return (
    <div className={ classes.Header }>
      <h1 className={ classes.Title }>
        { props.name }
      </h1>
      <div className={ classes.HeaderOptions }>
        <p className={ classes.Date}>{ modDate }</p>
        <div 
          onClick={ props.completeTask }
          className={ classes.Complete }>
        </div>
        <div
          onClick={ props.editModalTrue } 
          className={ classes.Edit }>
          <p className={ classes.EditText }>Edit</p>
        </div>
      </div>
    </div>
  )
};

export default MVTHeader;