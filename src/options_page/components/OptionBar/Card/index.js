import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div.attrs({
	//editable
	pointerEvents: props => (props.editable ? 'inherit' : 'none'),
	opacity: props => (props.editable ? '1' : '.5'),
})`
	color: white;
	width: 85%;
	margin: 0 auto;
	padding-bottom: 20px;
	opacity: ${props => props.opacity};
	pointer-events: ${props => props.pointerEvents};
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

const DashedLine = styled.div`
	width: 85%;
	margin: 0 auto;
	height: 1px;
	border-bottom: 1px dashed white;
`;

export default ({ editable = true, title = 'test', children }) => {
	return (
		<React.Fragment>
			<CardWrapper editable={editable}>
				<CardTitle> {title}: </CardTitle>

				<Content>{children}</Content>
			</CardWrapper>
			<DashedLine />
		</React.Fragment>
	);
};
