import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './bartr';

if (DEPLOYMENT_ENV === 'development') {

  let reactHotLoader = require('react-hot-loader')
  let AppContainer = reactHotLoader.AppContainer

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
} else {
  ReactDOM.render(
      <Routing/>,
    document.getElementById('app')
  );
}