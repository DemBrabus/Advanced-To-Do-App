import React from 'react';
import classes from './Task.module.scss';
import SmallDots from '../../UI/Dots/SmallDots/SmallDots';

const Task = (props) => {

  const settings = [
    {
      // id: '1',
      // name: 'Edit',
      // type: 'link',
      // action: '/task/:id'
    },
    {
      id: '1',
      name: 'Delete',
      type: 'delete'
    },
  ]

  let completedStylingColor = null;
  let completedStylingBorder = null;
  let completedSmallDotColor = null;
  let onClickBox = props.completeTask;
  let completedCursor = null;
    if(props.completedStyle){
      completedStylingColor = 'rgb(108, 108, 108)';
      completedStylingBorder = '1px solid rgb(108, 108, 108)';
      completedSmallDotColor = 'rgb(108, 108, 108)';
      completedCursor = 'default';
      onClickBox = props.unCompleteTask;
    }

  return (
    <div 
      className={ classes.Task }
      style={{ cursor: `${completedCursor}` }}>

      <div className={ classes.InfoBlock }>
        <div 
          aria-label="Complete"
          onClick={ onClickBox }
          className={ classes.CompleteBox }
          style={{ border: `${completedStylingBorder}` }}></div>
        <p 
          className={ classes.Name }
          style={{ color: `${ completedStylingColor }` }} >
            { props.name }
          </p>
      </div>

      <div className={ classes.SettingsBlock }>
        <SmallDots 
          settings={ settings }
          completedColor={ completedSmallDotColor }
          removeTask={ props.removeTask }
          id={ props.id } />
      </div>

    </div>
  )
};

export default Task;