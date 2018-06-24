/* global chrome */

import React, { Component } from 'react';
import default_state from '../chrome_extension/state';

import Header from './components/Header';
import Main from './components/Main';
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
			editorOpen: false,
			themeTitle: '',
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

	toggleEditor() {
		this.setState({
			editorOpen: !this.state.editorOpen,
		});
	}

	onThemeChange(e) {
		this.setState({
			selectedTheme: this.getTheme(e.target.value),
		});
	}

	setEditorTitle(e) {
		this.setState({
			themeTitle: e.target.value,
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

	toggleBGEdit() {
		this.setState({
			allowBackgroundEdit: !this.state.allowBackgroundEdit,
		});
	}

	render() {
		return (
			<div>
				<Header />
				<OptionBar
					toggleEditor={this.toggleEditor.bind(this)}
					onThemeChange={this.onThemeChange.bind(this)}
					options={this.state}
					onEditorTitleChange={this.setEditorTitle.bind(this)}
					editorTitle={this.state.themeTitle}
					toggleBGEdit={this.toggleBGEdit.bind(this)}
				/>
				<Main
					editor={this.state.editorOpen}
					theme={this.state.selectedTheme}
					toggleEditor={this.toggleEditor.bind(this)}
				/>
			</div>
		);
	}
}

export default App;
