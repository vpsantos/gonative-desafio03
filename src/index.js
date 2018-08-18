import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import ErrorBox from 'components/ErrorBox';
import Main from 'pages/main';

import 'config/ReactotronConfig';
import store from 'store';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Main />
      <ErrorBox />
    </Fragment>
  </Provider>
);

export default App;
