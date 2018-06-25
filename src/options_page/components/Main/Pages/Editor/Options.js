import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from '../../../Grid';

const GridWrapper = styled.div``;

export default class Options extends Component {
	render() {
		return (
			<React.Fragment>
				<label htmlFor="themeName">
					Theme Name:
					<input id="themeName" type="text" value="" placeholder="My Awesome Theme" />
				</label>
				<label htmlFor="gridSelector">Graphemes:</label>
				<GridWrapper />
			</React.Fragment>
		);
	}
}
