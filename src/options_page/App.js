import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Header />
			</div>
		);
	}
}

export default App;
