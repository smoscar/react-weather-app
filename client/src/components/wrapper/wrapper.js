import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Calendar from '../calendar/calendar';
import Location from '../location/location';


class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.state = { };
	}
	
	//Lifecycle method to catch updates to the calendar
	componentWillReceiveProps(nextProps){
		if ('weekDays' in nextProps){
			console.log(nextProps)
		}
	}
	
  render() {
    return (
      <div className={"App time12 cloudy"}>
				<div className="wrapper">
					<section class = "AppContainer">
	        	<Location />
	        	<Calendar />
					</section>
				</div>
      </div>
    );
  }
}

Wrapper.propTypes = {
	weekDays: PropTypes.array
}

const mapStateToProps = state => ({
	weekDays: state.locations.weekDays
})

export default connect(mapStateToProps, {})(Wrapper);
