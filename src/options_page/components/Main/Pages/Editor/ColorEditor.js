import React, { Component } from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
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
	color: ${props => props.color};
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
			color: 'red',
		};
	}

	render() {
		const { selectedColor, selectedGrapheme } = this.props;
		return (
			<React.Fragment>
				<Wrapper>
					<Display color={selectedColor}>
						<IconWrapper>
							<Icon> &#x238c; </Icon>
							<Icon> &#x2713; </Icon>
						</IconWrapper>
						{selectedGrapheme.match(/[a-z]/)
							? `${selectedGrapheme.toUpperCase()}${selectedGrapheme}`
							: `${selectedGrapheme}`}
					</Display>
					<PickerWrapper>
						<SketchPicker color={selectedColor ? selectedColor : 'white'} />
					</PickerWrapper>
				</Wrapper>
			</React.Fragment>
		);
	}
}
