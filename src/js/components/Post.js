import React from "react";


export default class Post extends React.Component {
	handlePost(e){
		const post = e.target.value;
		this.props.changePost(post);
	}

	render() {
		return (
			<div>
				<input type="text" onChange={this.handlePost.bind(this)}/>
				<br/>
			</div>
		);
	}
}
