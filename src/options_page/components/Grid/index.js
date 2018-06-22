import React, { Component } from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-height: 350px;
`;

const GridItem = styled.div`
    color: ${props => props.color || 'black'} 
    background-color: ${props => props.background || 'white'}
    width: 40px; 
    height: 40px;  
    display: flex; 
    justify-content: center; 
    align-items: center; 
    margin: 1.25px; 
`;

const defaultGraphemes = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			graphemes: props.graphemes || defaultGraphemes,
		};
	}

	createGridItems() {
		const { graphemes } = this.state;

		return graphemes.map(
			grapheme =>
				grapheme.match(/[a-z]/) ? (
					<GridItem key={grapheme}>
						{grapheme.toUpperCase()}
						{grapheme}
					</GridItem>
				) : (
					<GridItem key={grapheme}> {grapheme} </GridItem>
				)
		);
	}

	render() {
		return <GridWrapper>{this.createGridItems()}</GridWrapper>;
	}
}

export default Grid;
