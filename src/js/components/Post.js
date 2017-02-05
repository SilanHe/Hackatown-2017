import React from "react";


export default class Post extends React.Component {
	handlePost(e){
		const post = e.target.value;
		this.props.changePost(post);
	}

	render() {
		return (
			<div>
				<input placeholder=" try 'the 470 is on time'" type="text" onChange={this.handlePost.bind(this)}/>
				<br/>
			</div>
		);
	}
}
