import React from 'react';
import ReactDOM from 'react-dom';

const Index = () => {
	return <div style={{ height: 300, width: 200, backgroundColor: 'red' }}> I'm a react app </div>;
};

ReactDOM.render(<Index />, document.getElementById('App'))();
