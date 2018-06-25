import React, { Component } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const getColor = color => {
	if (typeof color === 'string') {
		return color;
	} else {
		return `rgba(${color.r},${color.g},${color.b},${color.a})`;
	}
};

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	align-items: center;
	height: 100%;
`;

const Display = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 8rem;
	color: ${props => getColor(props.color)};
	height: 100%;
`;

const PickerWrapper = styled.div`
	justify-content: flex-end;
`;

const Icon = styled.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const IconWrapper = styled.div`
	width: 30px;
	height: 30%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: absolute;
	z-index: 2;
	font-size: 50px;
	color: black;
`;

export default class ColorEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalColor: '',
			color: '',
		};
	}

	componentDidMount() {
		this.setState({
			originalColor: this.props.selectedColor,
			color: this.props.selectedColor,
		});
	}

	componentWillReceiveProps(newProps) {
		if (newProps.selectedColor) {
			this.setState({
				originalColor: newProps.selectedColor,
				color: newProps.selectedColor,
			});
		}
	}

	setColor(color, e) {
		this.setState({
			color: color.rgb,
		});
	}

	revertColor() {
		this.setState({
			color: this.state.originalColor,
		});
	}

	saveColor() {
		this.setState({
			savedGraphemes: this.state.savedGraphemes.push({}),
		});
	}

	render() {
		const { selectedGrapheme } = this.props;
		return (
			<React.Fragment>
				<Wrapper>
					<Display color={this.state.color}>
						<IconWrapper>
							<Icon onClick={() => this.revertColor()}> &#x238c; </Icon>
							<Icon> &#x2713; </Icon>
						</IconWrapper>
						{selectedGrapheme.match(/[a-z]/)
							? `${selectedGrapheme.toUpperCase()}${selectedGrapheme}`
							: `${selectedGrapheme}`}
					</Display>
					<PickerWrapper>
						<SketchPicker color={this.props.selectedColor} onChange={this.setColor.bind(this)} />
					</PickerWrapper>
				</Wrapper>
			</React.Fragment>
		);
	}
}
