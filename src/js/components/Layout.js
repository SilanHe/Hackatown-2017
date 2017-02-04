import React from "react";
import Request from "superagent";


export default class Layout extends React.Component {
	constructor(){
		super();
		this.state = {
		};
	}

	componentWillMount(){
		var url = "localhost:3000/api/data";
		Request.get(url+"data").then((response) => {
			this.setState({
				post: response
			})
		})
	}

	render(){
		return(
			<h90>{this.state.post}</h90>
		);
	}
}
