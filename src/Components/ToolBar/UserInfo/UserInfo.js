import React from 'react';
import classes from './UserInfo.module.scss';
import { Link } from 'react-router-dom';
import LargeDots from '../../UI/Dots/LargeDots/LargeDots';

const UserInfo = (props) => {

  const settings = [
    {
      id: '1',
      name: 'Profile',
      type: 'link',
      action: '/settings/profile'
    },
    {
      id: '2',
      name: 'Settings',
      type: 'link',
      action: '/settings/preferences'
    },
    {
      id: '3',
      name: 'Re Sync',
      type: 'Func',
      action: 'resync={ this.props.resync }'
    },
  ]

  let UserName =  'User Name';
  if(props.UserName != null){
    UserName = props.UserName
  }

  return (
    <div className={ classes.UserInfo }>
      <div className={ classes.Inner }>

        <Link to='/settings/profile' className={ classes.InfoBlock }>
          <div className={ classes.UserImage }></div>
          <p>{ UserName }</p>
        </Link>

        <div className={ classes.SettingsBlock }>
          <LargeDots
            settings={ settings }
            resync={ props.resync }
            logout={ props.logout } />
        </div>
        
      </div>
    </div>
  )
};

export default UserInfo;