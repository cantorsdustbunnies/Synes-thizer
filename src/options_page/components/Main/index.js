import React, { Component } from 'react';
import styled from 'styled-components';
import { Introduction, Editor } from './Pages';

const MainWrapper = styled.div`
	width: calc(100vw - 297px);
	height: calc(100vh - 55px);
	position: absolute;
	top: 55px;
	left: 298px;

	box-sizing: border-box;
	border-radius: 4px;
`;

export default ({ editor, theme, toggleEditor, selected, selectedColor }) => {
	return (
		<MainWrapper>
			{editor ? (
				<Editor selected={selected} selectedColor={selectedColor} theme={theme} toggleEditor={toggleEditor} />
			) : (
				<Introduction theme={theme} />
			)}
		</MainWrapper>
	);
};
