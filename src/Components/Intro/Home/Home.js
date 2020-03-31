import React from 'react';
import classes from './Home.module.scss';
import { NavLink } from 'react-router-dom';

const Home = (props) => {

  

  return (
    <div className={ classes.Home }>
      <h1 className={ classes.Title }>
        Advanced To Do App
      </h1>
      <p className={ classes.Disclaimer }>* This Web App is not complete but a good demonstration of a working Full Stack Web Application with features like: Authentication, Routing, Database, and Personalized UI for every user. *</p>
      <p className={ classes.Disclaimer }>Additionally this web app only supports larger screen sizes.</p>
      <NavLink to="/account/signup" className={ classes.Disclaimer }>Create an account and explore the features of the app!</NavLink>
    </div>
  )
};

export default Home;