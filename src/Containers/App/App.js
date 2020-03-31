import React, { Component } from 'react';
import classes from './App.module.scss';
import Layout from '../Layout/Layout';
import Cover from '../../Components/UI/Cover/Cover';

class App extends Component {
  state = {

  }
  
  render(){
    return (
      <div className={ classes.App } data-react="React">
        <Layout />
        <Cover />
      </div>
    );
  }
}

export default App;
