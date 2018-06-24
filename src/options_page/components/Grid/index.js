import React, { Component } from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-height: 350px;
`;

const GridItem = styled.div.attrs({
	color: props => props.color || 'white',
	background: props => props.background || 'black',
})`
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1.25px;
	color: ${props => props.color};
	background-color: ${props => props.background};
	transition: background-color 0.65s;
	:hover {
		background-color: #ffffff82;
	}
`;

const defaultGraphemes = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

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
		const { theme } = this.props;
		return graphemes.map(grapheme => (
			<GridItem background="#f1f1f12a" key={grapheme} color={this.getColor(grapheme)}>
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
		return <GridWrapper>{this.createGridItems()}</GridWrapper>;
	}
}

export default Grid;
