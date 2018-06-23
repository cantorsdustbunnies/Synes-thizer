/* global chrome */

import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import OptionBar from './components/OptionBar';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
		};
	}

	render() {
		console.log(this.state.data);
		return (
			<div>
				<Header />
				<OptionBar />
			</div>
		);
	}
}

export default App;
