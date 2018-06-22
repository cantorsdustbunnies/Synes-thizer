import React from 'react';
import styled from 'styled-components';
import logo from '../../../chrome_extension/images/S.png';

const Header = styled.header`
	height: 56px;
	background-color: #232323;
	display: flex;
	align-items: center;
	font-family: 'Roboto', sans-serif;
`;

const Logo = styled.img`
	margin-left: 20px;
	width: 30px;
	height: 30px;
`;

const Title = styled.span`
	font-size: 30px;
	color: #f1f1f1f2;
	margin-left: 20px;
`;

export default () => {
	return (
		<Header>
			<Logo src={logo} />
			<Title>Synes-thizer </Title>
		</Header>
	);
};
