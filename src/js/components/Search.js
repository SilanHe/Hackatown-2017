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
					<input type="text" onChange={this.handleSearch.bind(this)}/>
					<br/>
				</div>
			</div>
		);
	}
}
