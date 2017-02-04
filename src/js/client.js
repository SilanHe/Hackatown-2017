import React from "React";
import ReactDOM from "react-dom";

class Layout extends React.Component {
	render() {
		return (
			<h1>React App</h1>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);