import React from "react";
import _ from "lodash";

export default class Data extends React.Component {
	render() {
		const posts = this.props.buses;
		const postsList = _.map(this.state.posts, (post) => {
            return <li> 
            		<span>
						<h3>the {post.busNumber} was {post.lateness} at {this.props.location}.</h3>
						<p>{post.currentTime}</p>
					</span>
					</li>;
        });			            
		return (
				<ul>{postList}</ul>
		);
	}
}

