import React, { Component } from 'react';
import classes from './LargeDots.module.scss';
import { Link } from 'react-router-dom';

class LargeDots extends Component {
  state={
    open: false
  }

  statusHandler = () => {
    let status = this.state.open;
    this.setState({ open: !status });
  }

  mouseOutHandler = () => {
    if(this.state.open === true){
      this.setState({ open: false })
    }
  }


  render(){

    let settings;
    if(this.props.settings){
      settings = this.props.settings.map(item => {
        if(item.type === 'link'){
          return (
            <li key={ item.id }>
              <Link 
                to={item.action} 
                onClick={ this.statusHandler }>
                { item.name }
              </Link>
            </li>
          )
        } else if(item.type === 'func') {
          return (
            <li key={ item.id }>
              <p 
                onClick={ this.props.resync }>
                { item.name }
              </p>
            </li>
          )
        } else {
          return null
        }
      })

      
    };

    let dropdown = null;
    if(this.state.open){
      dropdown = <div className={ classes.DropDown }>
                    <ul>
                      { settings }
                      <li>
                        <p onClick={ this.props.logout }>Sign Out</p>
                      </li>
                    </ul>
                  </div>
    };

    return (
      <div 
        className={ classes.Block }
        onMouseLeave={ this.mouseOutHandler }
        onClick={ this.statusHandler } >
        <div className={ classes.LargeDots }>
          <div className={ classes.Dot }></div>
          <div className={ classes.Dot }></div>
          <div className={ classes.Dot }></div>
        </div>

        { dropdown }

      </div>
    );
  }
};

export default LargeDots;



