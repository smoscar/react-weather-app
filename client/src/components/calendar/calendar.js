import React, { Component } from 'react';
import './calendar.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateWeekDay } from '../../actions/calendarActions';

class Calendar extends Component {
	constructor(props){
		super(props);
		
		//The object this is binded to the event handlers
		this.onClick = this.onClick.bind(this)
	}
	
	//Handler for the day clicks
	onClick(event){
		let selectedDay = parseInt(event.currentTarget.id.replace('day', ''), 10);
		this.props.updateWeekDay( selectedDay )
	}
	
	//Lifecycle method to catch updates to the calendar
	componentWillReceiveProps(nextProps){
		if ('weekDays' in nextProps){
			console.log(nextProps)
		}
	}
	
	//Function that returns the li's accordingly
	createWeekLi( day, index ){
		const icons = {
			'clear-day': 'fa-sun-o',
			'clear-night': 'fa-sun-o',
			'fog': 'fa-cloud',
			'cloudy': 'fa-cloud',
			'partly-cloudy-day': 'fa-cloud',
			'partly-cloudy-night': 'fa-cloud',
			'wind': 'fa-ioxhost',
			'rain': 'fa-sellsy',
			'snow': 'fa-sellsy',
			'sleet': 'fa-sellsy'
		};
		
		return (
			<li key={day.time} className={this.props.selectedDay === index ? 'active' : ''} id={"day"+ index} onClick={this.onClick}>
			 <span>{day.dayName}</span>
			 <i className={"fa " + (day.icon in icons ? icons[day.icon] : '')  }></i>
			 {parseInt(day.temperatureHigh, 10)}&ordm;
			</li>
		)
	}
	
	//Function that gets the message
	getMessageLabel( ){
		if (this.props.weekDays.length === 0) return "";
		let output = "Week of ";
		let d = new Date( this.props.weekDays[ this.props.selectedDay ].time * 1000 );
		
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		output += " " + monthNames[ d.getMonth() ] + " " + d.getDate() + " " + d.getFullYear();
		
		return output
	}
	
  render() {
    return (
      <footer>
				<ul>
				 { this.props.weekDays.map( (day, n) => this.createWeekLi( day, n ) ) }
				</ul>
				<div className="week-label">{ this.getMessageLabel() } <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a></div>
      </footer>
    );
  }
}

Calendar.propTypes = {
	updateWeekDay: PropTypes.func.isRequired,
	selectedDay: PropTypes.number.isRequired,
	weekDays: PropTypes.array
}

const mapStateToProps = state => ({
	selectedDay: state.calendar.selectedDay,
	weekDays: state.locations.weekDays
})

const mapDispatchToProps = {
	updateWeekDay: updateWeekDay
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
