import React, { Component } from 'react';
import './settings.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateTime, fetchDayInfo } from '../../actions/settingsActions';

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
		let index = parseInt(event.target.value, 10);
		index = index === 24 ? 23 : index
		let icon = this.props.day.hourly.data[ index ].icon;
		
		this.props.updateTime({
			temp: this.props.day.hourly.data[ index ].temperature,
			wind: this.props.day.hourly.data[ index ].windSpeed,
			humidity: this.props.day.hourly.data[ index ].humidity,
			time: parseInt(event.target.value, 10),
			cloudy: ( icon === 'fog' || icon === 'cloudy' || icon === 'partly-cloudy-day' || icon === 'partly-cloudy-night' )
		});
	}
	
	//Lifecycle method to catch updates to the calendar
	componentWillReceiveProps(nextProps){
		//To catch changes in the selection of a state
		if (this.props.selectedState !== nextProps.selectedState){
			//The loading states gets updated
			this.setState({loading: true});
		}
		
		//When the week's request gets received
		if (nextProps.weekDays.length > 0 && ( this.props.weekDays.length === 0 || this.props.weekDays[0]["nonce"] !== nextProps.weekDays[0]["nonce"] ) ) {
			let icon = nextProps.weekDays[0].icon;
			//The initial data gets added 
			this.props.updateTime({
				temp: nextProps.weekDays[0].temperatureHigh,
				wind: nextProps.weekDays[0].windSpeed,
				humidity: nextProps.weekDays[0].humidity,
				time: 12,
				cloudy: ( icon === 'fog' || icon === 'cloudy' || icon === 'partly-cloudy-day' || icon === 'partly-cloudy-night' )
			})
			
			//The day's data gets fetched
			const post = {
				dayIndex: 0,
				coords: nextProps.selectedCoords,
				location: nextProps.selectedCoords
			}
			this.props.fetchDayInfo( post ).then(() => {
				//The loading states gets removed
				this.setState({loading: false});
			});
		}
		
		//When a different day was requested
		if (nextProps.selectedDay !== this.props.selectedDay){
			//The loading states gets updated
			this.setState({loading: true});
			
			let icon = nextProps.weekDays[nextProps.selectedDay].icon;
			
			this.props.updateTime({
				temp: nextProps.weekDays[nextProps.selectedDay].temperatureHigh,
				wind: nextProps.weekDays[nextProps.selectedDay].windSpeed,
				humidity: nextProps.weekDays[nextProps.selectedDay].humidity,
				time: 12,
				cloudy: ( icon === 'fog' || icon === 'cloudy' || icon === 'partly-cloudy-day' || icon === 'partly-cloudy-night' )
			})
			
			//The day's data gets fetched
			const post = {
				dayIndex: nextProps.selectedDay,
				coords: nextProps.selectedCoords,
				location: nextProps.selectedCoords
			}
			this.props.fetchDayInfo( post ).then(() => this.setState({loading: false}));
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
					{this.props.temp}&ordm;
				</span>
				<span>
					<i className="fa fa-soundcloud"></i>
					{this.props.wind}mph
				</span>
				<span>
					<i className="fa fa-tint"></i>
					{parseInt(this.props.humidity * 100, 10)}%
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
	fetchDayInfo: PropTypes.func.isRequired,
	temp: PropTypes.number.isRequired,
	wind: PropTypes.number.isRequired,
	humidity: PropTypes.number.isRequired,
	time: PropTypes.number.isRequired,
	cloudy: PropTypes.bool.isRequired,
	day: PropTypes.object.isRequired,
	weekDays: PropTypes.array,
	selectedState: PropTypes.object,
	selectedCoords: PropTypes.string,
	selectedDay: PropTypes.number
}

const mapStateToProps = state => ({
	selectedState: state.locations.selectedState,
	selectedCoords: state.locations.selectedCoords,
	weekDays: state.locations.weekDays,
	temp: state.settings.temp,
	wind: state.settings.wind,
	humidity: state.settings.humidity,
	time: state.settings.time,
	cloudy: state.settings.cloudy,
	day: state.settings.day,
	selectedDay: state.calendar.selectedDay
})

const mapDispatchToProps = {
	updateTime: updateTime,
	fetchDayInfo: fetchDayInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
