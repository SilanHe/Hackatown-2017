import React from "react";

export default class Search extends React.Component {
	handleSearch(e){
		const search = e.target.value;
		this.props.changeSearch(search);
	}
	render() {	
		return (
			<div>
				<div>
					<input placeholder=" try 'is the 470 usually late'" type="text" onChange={this.handleSearch.bind(this)}/>
					<br/>
				</div>
			</div>
		);
	}
}
