import React, { Component } from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
	width: 255px;
	height: 255px;
	grid-gap: 1px;
	pointer-events: ${props => (props.editorActive ? 'auto' : 'none')};
`;

const GridItem = styled.div.attrs({
	color: props => props.color || 'white',
	background: props => props.background || 'black',
})`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${props => props.color};
	background-color: ${props => props.background};
	cursor: pointer;
	border-radius: 50%;
	:hover {
		transition: background-color 0.4s, font-size 0.2s;
		font-size: 150%;
		transform: scale(2.4);
		background-color: #00000055;
	}
	:active {
		transition: background-color 0.1s, font-size 0.1s;
		font-size: inherit;
		background-color: #00000055;
		transform: scale(0.9);
	}
`;

class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: '',
			graphemes: props.graphemes,
			theme: props.theme,
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			graphemes: newProps.graphemes,
			theme: newProps.theme,
		});
	}

	createGridItems() {
		const { graphemes } = this.state;
		console.log(this.props);
		return graphemes.map(grapheme => (
			<GridItem
				background={this.props.selectedGrapheme === grapheme ? 'black' : 'inherit'}
				key={grapheme}
				color={this.getColor(grapheme)}
				id={grapheme}
				onClick={() => this.props.selectGrapheme(grapheme, this.getColor(grapheme))}
			>
				{grapheme.match(/[a-z]/) ? `${grapheme.toUpperCase()}${grapheme}` : grapheme}
			</GridItem>
		));
	}

	parseThemeColor(colorObj) {
		return `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, ${colorObj.a})`;
	}

	getColor(grapheme) {
		const { theme } = this.state;
		if (theme.data) {
			return this.parseThemeColor(theme.data[grapheme]);
		} else {
			return 'black';
		}
	}

	render() {
		return <GridWrapper editorActive={this.props.editorActive}>{this.createGridItems()}</GridWrapper>;
	}
}

export default Grid;
