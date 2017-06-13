import React from 'react';

import { Dashboard } from './dashboard';
import { Select } from './select';
import { View } from './view';


export class Tabs extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			duration: 0,
			duration_countdown: 30*60,
			calories: 0,
			speed: 9,
			grade: 0,
			heart_rate: 127,
			pace: 0,
			distance: 0,
			format: 'metric',
			file: '',
			time: 0
		};
	}

	render() {
		return (
			<div className="tabs">
				<div className="tabs-block">
					<div id="dashboard" className="active">
						<Dashboard 
							duration={this.formatData('duration', this.state.duration)} 
							duration_countdown={this.formatData('duration_countdown', this.state.duration_countdown)} 
							calories={this.formatData('calories', this.state.calories)}
							speed={this.formatData('speed', this.state.speed)}
							grade={this.formatData('grade', this.state.grade)}
							heart_rate={this.formatData('heart_rate', this.state.heart_rate)} 
							pace={this.formatData('pace', this.state.pace)}
							distance={this.formatData('distance', this.state.distance)} 
							onChangeFormat={(format) => this.changeFormat(format)}/>
					</div>
					<div id="select">
						<Select 
							onVideoReady={(file, time) => this.videoShowFull(file,time)}
						/>
					</div>
					<div id="view">
						<View 
							file={this.state.file} 
							time={this.state.time}
							onStartedVideo={() => this.onViewNavigate()} 
						/>
					</div>
				</div>
				<ul className="tabs-links">
					<li className="active"><a href="#dashboard" onClick={(e) => this.selectTab(e, '#dashboard')}>Dashboard</a></li>
					<li><a href="#select" onClick={(e) => this.selectTab(e, '#select')}>Entertainment Select</a></li>
					<li><a href="#view" onClick={(e) => this.selectTab(e, '#view')}>Entertainment View</a></li>
				</ul>
			</div>
		);
	}

	selectTab(e, tabId) {
		this._selectTab(e.target, tabId);
	}

	_selectTab(el, tabId) {
		document.querySelector('.tabs-block > div.active').classList.remove('active');
		document.querySelector(tabId).classList.add('active');
		document.querySelector('.tabs-links > li.active').classList.remove('active');
		el.parentNode.classList.add('active');
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 500);
  	}

  	componentWillUnmount() {
  		clearInterval(this.timerID);
  	}

  	tick() {
    	this.setState((prevState, props) => {
    		let duration = prevState.duration + 0.5;
    		let distance = prevState.distance + prevState.speed/3600/2;
    		return {
	      		duration: duration,
				duration_countdown: prevState.duration_countdown - 0.5,
				calories: prevState.calories + 0.1875/2 ,
				// speed: 9,
				grade: 0,
				// heart_rate: 0,
				pace: duration/distance,
				distance: distance,
	    	}
	    });
  	}

  	formatData(type, value) {
  		let out, sec_num, hours, minutes, seconds;
  		switch (type) {
  			case 'duration':
  				sec_num = this.state.duration;
  				hours   = Math.floor(sec_num / 3600);
			    minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			    seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));
  				out = `${('0'+hours).slice(-2)}:${('0'+minutes).slice(-2)}:${('0'+seconds).slice(-2)}`;
  				break;
  			case 'duration_countdown':
  				sec_num = this.state.duration_countdown;
  				hours   = Math.floor(sec_num / 3600);
			    minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			    seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));
  				out = `${('0'+hours).slice(-2)}:${('0'+minutes).slice(-2)}:${('0'+seconds).slice(-2)}`;
  				break;
  			case 'speed':
  				out = this.state.speed;
  				if (this.state.format==='imperial')
  					out = out*0.621371;
  				out = out.toFixed(1);
  				break;
  			case 'grade':
  				out = this.state.grade.toFixed(1);
  				break;
  			case 'pace':
  				sec_num = this.state.pace;
  				if (this.state.format==='imperial')
  					sec_num = sec_num/0.621371;
  				minutes = Math.floor(sec_num / 60);
			    seconds = Math.floor(sec_num - (minutes * 60));
  				out = `${('0'+minutes).slice(-2)}:${('0'+seconds).slice(-2)}`;
  				break;
  			case 'distance':
  				out = this.state.distance;
  				if (this.state.format==='imperial')
  					out = out*0.621371;
  				out = out.toFixed(2);
  				break;
  			case 'heart_rate':
  				out = Math.floor(this.state.heart_rate);
  				break;
  			case 'calories':
  				out = Math.floor(this.state.calories);
  				break
  			default:
  				out = value;
  		}

  		return out;
  	}

  	videoShowFull(file,time) {
  		this.setState({
  			file: file,
  			time: time
  		});
  	}

  	onViewNavigate(){
  		let el = document.querySelector('a[href="#view"]');
  		this._selectTab(el, '#view');
  	}

  	changeFormat(format) {
  		this.setState({
  			format: format
  		});
  	}
}