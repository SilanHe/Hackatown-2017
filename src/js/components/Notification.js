import React from "react";

export default class Notification extends React.Component {
	render() {
		return (
			<h1>{this.props.post}</h1>
		);
	}
}
