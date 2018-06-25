let unstyled = {};
let graphemes = 'abcdefghijklmnopqrstuvwxyz0123456789';
let graphemeList = graphemes.split('');
let black = { r: 0, g: 0, b: 0, a: 1 };
for (let grapheme of graphemeList) {
	unstyled[grapheme] = black;
}

export default unstyled;
