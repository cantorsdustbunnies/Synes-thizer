/* global chrome */

import React, { Component } from 'react';
import styled from 'styled-components';

import default_state from '../chrome_extension/state';

import Header from './components/Header';
import OptionBar from './components/OptionBar';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowBackgroundEdit: null,
			backgroundColor: '',
			defaultGraphemes: [],
			defaultThemes: [],
			selectedTheme: {},
			userGraphemes: '',
			userThemes: [],
		};
	}

	componentDidMount() {
		if (chrome.storage) {
			console.log('now running from chrome storage');
			chrome.storage.sync.get('state', data => {
				const {
					allow_background_edit,
					background_color,
					default_graphemes,
					default_themes,
					selected_theme,
					user_graphemes,
					user_themes,
				} = data.state;
				this.setState({
					allowBackgroundEdit: allow_background_edit,
					backgroundColor: background_color,
					defaultGraphemes: default_graphemes,
					defaultThemes: default_themes,
					selectedTheme: selected_theme,
					userGraphemes: user_graphemes,
					userThemes: user_themes,
				});
			});
		} else {
			console.log('chrome storage not found, now running from local state');
			const {
				allow_background_edit,
				background_color,
				default_graphemes,
				default_themes,
				selected_theme,
				user_graphemes,
				user_themes,
			} = default_state;

			this.setState({
				allowBackgroundEdit: allow_background_edit,
				backgroundColor: background_color,
				defaultGraphemes: default_graphemes,
				defaultThemes: default_themes,
				selectedTheme: selected_theme,
				userGraphemes: user_graphemes,
				userThemes: user_themes,
			});
		}
	}

	onEditableChange(e) {
		this.setState({
			allowBackgroundEdit: !this.state.allowBackgroundEdit,
		});
	}

	onThemeChange(e) {
		this.setState({
			selectedTheme: this.getTheme(e.target.value),
		});
	}

	getTheme(themeName) {
		const { defaultThemes, userThemes } = this.state;
		const themes = [...defaultThemes, ...userThemes];
		for (let theme of themes) {
			if (theme.name === themeName) {
				return theme;
			}
		}
	}

	render() {
		return (
			<div>
				<Header />
				<OptionBar
					onEditableChange={this.onEditableChange.bind(this)}
					onThemeChange={this.onThemeChange.bind(this)}
					options={this.state}
				/>
			</div>
		);
	}
}

export default App;
