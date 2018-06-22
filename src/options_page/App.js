import React, { Component } from 'react';
import styled from 'styled-components';

const Test = styled.div`
	width: 100px;
	height: 100px;
	background-color: red;
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <Test />;
	}
}

export default App;
