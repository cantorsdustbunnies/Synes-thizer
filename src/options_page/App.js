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
			backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
			defaultGraphemes: [],
			defaultThemes: [],
			selectedTheme: {},
			userGraphemes: '',
			userThemes: [],
			editorOpen: false,
			themeTitle: '',
			selectedGrapheme: '',
			selectedColor: null,
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
		if (this.state.editorOpen) {
			this.setState({
				selectedGrapheme: '',
				editorOpen: !this.state.editorOpen,
				selectedColor: null,
			});
		} else {
			this.setState({
				editorOpen: !this.state.editorOpen,
				selectedGrapheme: 'a',
				selectedColor: this.state.selectedTheme.data['a'],
			});
		}
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

	onBackgroundColorChange(color, e) {
		this.setState({
			backgroundColor: color.rgb,
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
		if (this.state.allowBackgroundEdit) {
			this.setState({
				backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
			});
		}
		this.setState({
			allowBackgroundEdit: !this.state.allowBackgroundEdit,
		});
	}

	selectGrapheme(grapheme, color) {
		this.setState({
			selectedGrapheme: grapheme,
			selectedColor: color,
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
					selectGrapheme={this.selectGrapheme.bind(this)}
					onBackgroundColorChange={this.onBackgroundColorChange.bind(this)}
				/>
				<Main
					editor={this.state.editorOpen}
					theme={this.state.selectedTheme}
					toggleEditor={this.toggleEditor.bind(this)}
					selected={this.state.selectedGrapheme}
					selectedColor={this.state.selectedColor}
					backgroundColor={this.state.backgroundColor}
				/>
			</div>
		);
	}
}

export default App;
