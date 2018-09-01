import React, { Component } from 'react';
import './calendar.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			week: []
		};
	}
	
	//Lifecycle method to catch updates to the calendar
	componentWillReceiveProps(nextProps){
		if ('weekDays' in nextProps){
			console.log(nextProps)
		}
	}
	
  render() {
    return (
      <div>
				<ul>
				 {this.props.weekDays.map( day => 
					 <li key={day.time}>
					 	{day.dayName}
					 </li>
				 )}
				</ul>
      </div>
    );
  }
}

Calendar.propTypes = {
	weekDays: PropTypes.array
}

const mapStateToProps = state => ({
	weekDays: state.locations.weekDays
})

export default connect(mapStateToProps, {})(Calendar);
