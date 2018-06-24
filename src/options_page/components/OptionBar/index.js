import React, { Component } from 'react';

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
	background-color: white;
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

class OptionBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTheme: false,
			editorTitle: '',
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



	render() {
		const { allowBackgroundEdit } = this.props.options;
		return (
			<OptionsWrapper>
				<Card title="Current Theme">
					<Selector onChange={e => this.props.onThemeChange(e)}>{this.populateOptions()}</Selector>
				</Card>

				<Card title="Graphemes">
					<Grid theme={this.props.options.selectedTheme} graphemes={this.props.options.defaultGraphemes} />
					<NewThemeBtn onClick={() => this.toggleNewTheme()}>
						{this.state.newTheme ? 'Cancel' : 'Create New'}
					</NewThemeBtn>
				</Card>

				<Card title="Allow app to change the background color on pages I visit">
					<input type="checkbox" onChange={e => this.props.toggleBGEdit()} />
				</Card>

				<Card title="Background Color" editable={allowBackgroundEdit}>
					<ColorPickerWrapper>
						<ColorPickerColor />
					</ColorPickerWrapper>
				</Card>
			</OptionsWrapper>
		);
	}
}

export default OptionBar;
