import React, { Component } from 'react';
import Sketch from 'react-color';
import styled, { keyframes } from 'styled-components';

import Card from './Card';
import Grid from '../Grid';

let OptionsWrapper = styled.div`
	width: 300px;
	height: calc(100vh - 56px);
	background-color: #232323;
	padding-top: 20px;
	color: white;
`;

let ColorPickerWrapper = styled.div`
	width: 100px;
	height: 25px;
	border: 1px solid white;
	display: inline-block;
`;

let ColorPickerColor = styled.div`
	width: 90px;
	height: 15px;
	background-color: ${props =>
		props.background
			? `rgba(${props.background.r},${props.background.g},${props.background.b},${props.background.a})`
			: `rgba(255,255,255,1)`};
	margin: 5px;
`;

let Selector = styled.select``;

const NewThemeBtn = styled.button`
    width: 100% 
    margin-top: 20px; 
    background-color: inherit; 
    color: white; 
	border: 1px solid white;
	outline: none;  
`;

const PopOver = styled.div`
	position: absolute;
	z-index: 2;
`;

const Cover = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
`;

const PickerContainer = styled.div`
	position: absolute;
	bottom: calc(123.75px * 2 + 30px);
	left: 260px;
`;

class OptionBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTheme: false,
			editorTitle: '',
			displayColorPicker: false,
		};
	}

	populateOptions() {
		const { defaultThemes, userThemes, selectedTheme } = this.props.options;
		const options = [...defaultThemes, ...userThemes];
		return options.map(theme => <option key={theme.name}>{theme.name}</option>);
	}

	toggleNewTheme() {
		this.setState({
			newTheme: !this.state.newTheme,
		});
		this.props.toggleEditor();
	}

	togglePicker() {
		this.setState({
			displayColorPicker: !this.state.displayColorPicker,
		});
	}

	handlePickerClose() {
		this.setState({
			displayColorPicker: false,
		});
	}

	renderPicker() {
		const { backgroundColor } = this.props.options.backgroundColor;
		if (this.state.displayColorPicker) {
			return (
				<PopOver>
					<Cover onClick={this.handlePickerClose.bind(this)} />
					<Sketch color={backgroundColor} onChange={this.props.onBackgroundColorChange} />
				</PopOver>
			);
		}
	}

	render() {
		const { allowBackgroundEdit, editorOpen, selectedGrapheme, backgroundColor } = this.props.options;
		return (
			<OptionsWrapper>
				<Card title="Current Theme">
					<Selector onChange={e => this.props.onThemeChange(e)}>{this.populateOptions()}</Selector>
				</Card>

				<Card title="Graphemes">
					<Grid
						theme={this.props.options.selectedTheme}
						graphemes={this.props.options.defaultGraphemes}
						editorActive={editorOpen}
						selectGrapheme={this.props.selectGrapheme}
						selectedGrapheme={selectedGrapheme}
						backgroundColor={backgroundColor}
					/>
					<NewThemeBtn onClick={() => this.toggleNewTheme()}>
						{this.state.newTheme ? 'Cancel' : 'Create New'}
					</NewThemeBtn>
				</Card>

				<Card title="Allow app to change the background color on pages I visit">
					<input type="checkbox" onChange={e => this.props.toggleBGEdit()} />
				</Card>

				<Card title="Background Color" editable={allowBackgroundEdit}>
					<ColorPickerWrapper>
						<ColorPickerColor background={backgroundColor} onClick={() => this.togglePicker()} />
						<PickerContainer>{this.renderPicker()}</PickerContainer>
					</ColorPickerWrapper>
				</Card>
			</OptionsWrapper>
		);
	}
}

export default OptionBar;
