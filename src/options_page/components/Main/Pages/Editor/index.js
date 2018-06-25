import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import ColorEditor from './ColorEditor';
import Preview from './Preview';
import Options from './Options';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	background-color: ${props =>
		props.background
			? `rgba(${props.background.r},${props.background.g},${props.background.b},${props.background.a})`
			: `rgba(255,255,255,1)`};
	display: grid;
	grid-template-areas:
		'editor preview'
		'options preview';
	grid-template-columns: 1fr 1fr;
`;

const EditorWrapper = styled.div`
	grid-area: editor;

	padding: 40px;
`;
const OptionsWrapper = styled.div`
	grid-area: options;
	color: white;
	padding: 30px;
	background-color: #4b88ab;
	box-sizing: border-box;
	border-right: 1px solid black;

	label {
		display: flex;
		flex-direction: column;
		height: 50px;
		justify-content: space-between;
		margin-bottom: 20px;
		input {
			max-width: 40%;
		}
	}
`;

const PreviewWrapper = styled.div`
	grid-area: preview;
	padding: 40px;
	box-sizing: border-box;
	overflow-y: auto;
	width: 100%;
	padding-right: 40px;
`;

export default class Editor extends Component {
	render() {
		return (
			<Wrapper background={this.props.backgroundColor}>
				<EditorWrapper>
					<ColorEditor selectedGrapheme={this.props.selected} selectedColor={this.props.selectedColor} />
				</EditorWrapper>
				<OptionsWrapper>
					<Options />
				</OptionsWrapper>
				<PreviewWrapper>
					<Preview />
				</PreviewWrapper>
			</Wrapper>
		);
	}
}
