import React from 'react';
import classes from './IntroNav.module.scss';
import Logo from '../../../Assets/Logo.png'

import { NavLink } from 'react-router-dom';

const IntroNav = (props) => {
  return (
    <div className={ classes.IntroNav }>

      <img src={ Logo } alt='Lighting Bolts Logo' className={ classes.Logo } />

      <nav className={ classes.Nav }>
        <NavLink to="/home" activeClassName={ classes.active } className={ classes.NavLink } >Home</NavLink>
        <NavLink to="/features" activeClassName={ classes.active } className={ classes.NavLink } >Features</NavLink>
        <NavLink to="/pricing" activeClassName={ classes.active } className={ classes.NavLink } >Pricing</NavLink>
        <NavLink to="/support" activeClassName={ classes.active } className={ classes.NavLink } >Support</NavLink>
        <NavLink to="/account/signin" activeClassName={ classes.active } className={ classes.NavLink } >Sign In</NavLink>
        <NavLink to="/account/signup" activeClassName={ classes.active } className={ classes.NavLink } >Get Started</NavLink>
      </nav>

    </div>
  )
};

export default IntroNav;