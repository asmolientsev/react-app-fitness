import React from 'react';


export class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'metric'
		}
	}
	render() {
		return (
			<div>
				<ul>
					<li>Duration - {this.props.duration}</li>
					<li>Duration countdown - {this.props.duration_countdown}</li>
					<li>Calories - {this.props.calories}</li>
					<li>Speed - {this.props.speed} {this.formatData('speed')}</li>
					<li>Grade - {this.props.grade}</li>
					<li>Heart rate - {this.props.heart_rate}</li>
					<li>Pace - {this.props.pace} {this.formatData('pace')}</li>
					<li>Distance - {this.props.distance} {this.formatData('distance')}</li>
				</ul>
				<div>
					<input type="radio" value="metric" name="format" onChange={(e) => this.setFormat(e)} />metric
					<input type="radio" value="imperial" name="format" onChange={(e) => this.setFormat(e)} />imperial
				</div>
			</div>
		);
	}

	setFormat(e) {
		const value = e.target.value;
		this.setState({
			format: value
		});
		this.props.onChangeFormat(value);
	}

	formatData(type) {
		let out;
		switch (type) {
			case 'speed':
				if (this.state.format==='metric')
					out = 'kph';
				else
					out = 'mph';
				break;
			case 'distance':
				if (this.state.format==='metric')
					out = 'km';
				else
					out = 'miles';
				break;
			case 'pace':
				if (this.state.format==='metric')
					out = 'min/km';
				else
					out = 'min/mile';
				break;
			default:
				out = '';
		}
		return out;
	}
}