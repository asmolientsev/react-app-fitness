import React from 'react';


export class Select extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selected: false,
			file: ''
		};
		this.clickPreview = this.clickPreview.bind(this);
	}

	render() {
		return (
			<div>
				<div className="video-block" onClick={this.clickPreview}>
					<video id="id-video" width="400" height="300">
						<source id="id-source"></source>
					</video>
				</div>
				<div>
					<select onChange={(e) => this.selectVideo(e)}>
						<option> --- </option>
						<option value="file1.mp4">file1</option>
						<option value="file2.mp4">file2</option>
					</select>
				</div>
			</div>
		);
	}

	selectVideo(e){
		let file = e.target.value;
		if (file){
			let video = document.getElementById("id-video");
			let source = document.getElementById("id-source");
			source.setAttribute('src', file);
			video.load();
			video.play();
			this.setState({
				selected: true,
				file: file
			});
		}
	}

	clickPreview(){
		if (this.state.selected){
			let video = document.getElementById("id-video");
			this.props.onVideoReady(this.state.file, video.currentTime);
		}
	}
}