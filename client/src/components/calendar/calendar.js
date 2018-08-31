import React, { Component } from 'react';
import './calendar.css';

class Calendar extends Component {
	constructor() {
		super();
		this.state = {
			week: []
		};
	}
	
	componentDidMount(){
		fetch('/api/v1/getWeek')
			.then(res => res.json())
			.then(week => this.setState({week}, () => console.log('Week fetched..', week)))
	}
	
  render() {
    return (
      <div>
				<ul>
				 {this.state.week.map( day => 
					 <li key={day.time}>
					 	{day.dayName}
					 </li>
				 )}
				</ul>
      </div>
    );
  }
}

export default Calendar;
