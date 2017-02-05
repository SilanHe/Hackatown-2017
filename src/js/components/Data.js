import React from "react";
import _ from "lodash";

export default class Data extends React.Component {
	render() {
			let late;
			const posts = this.props.busData;
			const postsList = _.map(posts, (post) => {

				if(post.lateness=="-1"){
					late="late";
				}else if (post.lateness=="0"){
					late="on time";
				}else if (post.lateness=="1"){
					late="early";
				}else {
					late="N/A";
				}
	            return <li> 
	            			<div className="post">
								<h3>the {post.busNumber} was {late} at {post.location}</h3>
								<p>{post.currentTime}</p>
							</div>
						</li>;
	        });			            
			return (
					<ul>{postsList}</ul>
			);
	}
}

