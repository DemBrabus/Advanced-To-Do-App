import React, { Component } from 'react';
import classes from './SmallDots.module.scss';
import { withRouter } from 'react-router-dom';

class SmallDots extends Component {
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
        if(item.type === 'delete'){
            return (
              <li key={ item.id }>
                <p 
                  onClick={ this.props.removeTask }>
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
                    </ul>
                  </div>
    };

    return (
      <div 
        className={ classes.Block }
        onClick={ this.statusHandler }
        onMouseLeave={ this.mouseOutHandler } >
        <div className={ classes.SmallDots }>
          <div className={ classes.Dot } style={{ backgroundColor: `${this.props.completedColor}` }}></div>
          <div className={ classes.Dot } style={{ backgroundColor: `${this.props.completedColor}` }}></div>
          <div className={ classes.Dot } style={{ backgroundColor: `${this.props.completedColor}` }}></div>
        </div>

        { dropdown }

      </div>
    );
  }
};

export default withRouter( SmallDots );



