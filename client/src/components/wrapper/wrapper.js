import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Calendar from '../calendar/calendar';
import Location from '../location/location';
import Settings from '../settings/settings';

class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeClass: 'time12',
			cloudClass: ''
		};
	}
	
	//Lifecycle method to catch updates to the calendar
	componentWillReceiveProps(nextProps){
		//When the time gets updated
		if ('time' in nextProps && nextProps.time !== this.props.time ){
			this.setState({
				timeClass: 'time' + nextProps.time,
				cloudClass: (nextProps.cloudy ? 'cloudy' : '')
			});
			
		}
	}
	
  render() {
    return (
      <div className={"App " + this.state.timeClass + " " + this.state.cloudClass}>
				<div className="wrapper">
					<section className="AppContainer">
	        	<Location />
						<Settings />
	        	<Calendar />
					</section>
				</div>
      </div>
    );
  }
}

Wrapper.propTypes = {
	time: PropTypes.number,
	cloudy: PropTypes.bool,
	weekDays: PropTypes.array
}

const mapStateToProps = state => ({
	time: state.settings.time,
	cloudy: state.settings.cloudy,
	weekDays: state.locations.weekDays
})

export default connect(mapStateToProps, {})(Wrapper);
