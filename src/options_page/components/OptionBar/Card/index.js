import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
	color: white;
	width: 85%;
	margin: 0 auto;
	border-bottom: 1px dashed #f1f1f1a2;
	padding-bottom: 20px;
`;

const CardTitle = styled.p`
	margin-left: 20px;
	font-weight: 100;
	font-family: 'Amiri', serif;
`;

const Content = styled.div`
	width: 100%;
	position: relative;
	text-align: right;
`;

export default ({ title = 'test', children }) => {
	return (
		<CardWrapper>
			<CardTitle> {title}: </CardTitle>

			<Content>{children}</Content>
		</CardWrapper>
	);
};
