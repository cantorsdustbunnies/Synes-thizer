import { fisherPrice, unstyled } from '../themes';

// For testing purposes only
chrome.storage.sync.clear();
//

const default_themes = {
	fisherPrice: {
		name: 'Fisher Price',
		data: fisherPrice,
		isDefault: true,
	},
	unstyled: {
		name: 'Unstyled',
		data: unstyled,
		isDefault: true,
	},
};

const default_graphemes = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
const selected_theme = default_themes.fisherPrice;

const default_state = {
	default_themes,
	default_graphemes,
	selected_theme,
	user_themes: {},
	user_graphemes: [],
	allow_background_edit: false,
	background_color: '#ffffffff',
};

// populates state if it doesn't exist, otherwise calls for it.
chrome.storage.sync.get({ state: default_state }, data => {
	chrome.storage.sync.set({ state: data.state }, () => {});
});

//passes state to content script for futher processing.

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
	chrome.storage.sync.get('state', data => {
		chrome.tabs.sendMessage(tab.id, data);
	});
}
