import React from "react";

import Post from "./Post";
import Search from "./Search";
import Notification from "./Notification";
import Notification1 from "./Notification1";

export default class Input extends React.Component {
	constructor() {
		super();
		this.state= {
			post: "tell us what happened to your bus",
			search: "search",
		};
	}

	changePost(post){
		this.setState({post});
	}

	changeSearch(search){
		this.setState({search});
	}

	submitPost(){
		//fadsflkdagl
	}

	render() {
		return (
			<div>
				<h1>tell us what happened to your bus</h1>
				<Notification post={this.state.post}/>
				<Post changePost={this.changePost.bind(this)}/>
				<button onClick={this.submitPost.bind(this)}/>
				<h1>search your bus</h1>
				<Notification1 search={this.state.search}/>
				<Search changeSearch={this.changeSearch.bind(this)}/>
			</div>
		);
	}
}
