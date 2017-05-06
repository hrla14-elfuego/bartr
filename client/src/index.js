import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './bartr';

if (module.hot) {
  console.log('try hot reload')
  module.hot.accept('./bartr.js', () => {
    const NextRootContainer = require('./bartr.js').default;
    render(<NextRootContainer />, document.getElementById('app'));
  })
}

ReactDOM.render(<Routing/>, document.getElementById('app'));
