import React from 'react';
import classes from './Cover.module.scss';

const Cover = (props) => {
  return (
    <div className={ classes.Cover }>
      <p className={ classes.Text }>Your screen size is not supported</p>
    </div>
  )
}

export default Cover;