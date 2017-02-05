import React from "react";
import _ from "lodash";

export default class Data extends React.Component {
	render() {
			const posts = this.props.busData;
			const postsList = _.map(posts, (post) => {
	            return <li> 
	            			<div display="inline-block" background-color="#004080" border="3px" border-radius="10px" border-color="white" padding= "10px" margin="10px">
								<h3>the {post.busNumber} was {post.lateness} at {this.props.location}</h3>
								<p>{post.currentTime}</p>
							</div>
						</li>;
	        });			            
			return (
					<ul>{postsList}</ul>
			);
	}
}

