import React from 'react';
import styled from 'styled-components';

const IntroWrapper = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props =>
		props.background
			? `rgba(${props.background.r},${props.background.g},${props.background.b},${props.background.a})`
			: `rgba(255,255,255,1)`};
`;
export default ({ backgroundColor }) => {
	return <IntroWrapper background={backgroundColor} />;
};
