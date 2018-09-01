import React, { Component } from 'react';
import './settings.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateTime } from '../../actions/settingsActions';

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
		
		//The object this is binded to the event handlers
		this.handleSliderChange = this.handleSliderChange.bind(this)
	}
	
	//Event handler for the slider changes
	handleSliderChange(event){
		this.props.updateTime( event.target.value );
	}
	
	//Lifecycle method to catch updates to the calendar
	componentWillReceiveProps(nextProps){
		//To catch changes in time
		if (this.props.time !== nextProps.time){
			console.log(arguments);
		}
		
		//To catch changes in the selection of a state
		if (this.props.selectedState !== nextProps.selectedState){
			//The loading states gets updated
			this.setState({loading: true});
		}

		if (nextProps.weekDays.length > 0 && ( this.props.weekDays.length == 0 || this.props.weekDays[0]["nonce"] !== nextProps.weekDays[0]["nonce"] ) ) {
			//The loading states gets removed
			this.setState({loading: false});
		}
	}
	
	//Helper function to return times
	getTimeHour(theTime) {
		let appn = theTime >= 12 ? 'pm' : 'am';
		let time = appn === 'am' ? theTime : ( theTime - 12 );
		time = (time === 0 ? 12 : time) + ":00" + appn;
		
		return time
	}
	
  render() {
		var asideClasses = 'weather-details ' + (this.state.loading ? 'loading ' : '');
		
    return (
			<aside className={asideClasses}>
				<h1 className="clock-holder">{this.getTimeHour(this.props.time)}</h1>
				<span>
					<i className="fa fa-thermometer-half"></i>
					28&ordm;
				</span>
				<span>
					<i className="fa fa-soundcloud"></i>
					6mph
				</span>
				<span>
					<i className="fa fa-tint"></i>
					43%
				</span>
				<div className="time-adjuster">
					<input type="range" min="0" max="24" step="2" className="slider" value={this.props.time} onChange={this.handleSliderChange} />
				</div>
			</aside>
    );
  }
}

Settings.propTypes = {
	updateTime: PropTypes.func.isRequired,
	temp: PropTypes.string.isRequired,
	wind: PropTypes.string.isRequired,
	humidity: PropTypes.string.isRequired,
	time: PropTypes.number.isRequired,
	weekDays: PropTypes.array,
	selectedState: PropTypes.object
}

const mapStateToProps = state => ({
	selectedState: state.locations.selectedState,
	weekDays: state.locations.weekDays,
	temp: state.settings.temp,
	wind: state.settings.wind,
	humidity: state.settings.humidity,
	time: state.settings.time
})

const mapDispatchToProps = {
	updateTime: updateTime
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
