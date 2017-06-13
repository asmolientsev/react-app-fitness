import React from 'react';


export class View extends React.Component {

	render() {
		return (
			<div>
				<video id="id-video-full" width="100%" height="100%" controls="controls">
					<source id="id-source-full" src={this.props.file}></source>
				</video>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState){
		if (nextProps.file!=='' && this.props.time!==nextProps.time){
			let video = document.getElementById("id-video-full");
			video.load();
			video.currentTime = nextProps.time;
			video.play();
			this.props.onStartedVideo();
			return true;
		}else{
			return false;
		}
	}

}