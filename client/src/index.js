import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './bartr';
import { AppContainer } from 'react-hot-loader'


// if (module.hot) {
//   console.log('try hot reload')
//   module.hot.accept('./bartr.js', () => {
//     const NextRootContainer = require('./bartr.js').default;
//     render(<NextRootContainer />, document.getElementById('app'));
//   })
// }

// ReactDOM.render(<Routing/>, document.getElementById('app'));

ReactDOM.render(
  <AppContainer>
    <Routing/>
  </AppContainer>,
  document.getElementById('app')
);


// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./bartr', () => {
    const NextApp = require('./bartr').default;
    ReactDOM.render(
      <AppContainer>
        <Routing/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}