import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

// import ProfileReducer from './reducers/profileReducer';


//const store = createStore(rootReducer);
////console.log("this is store",store)

//export let history = syncHistoryWithStore(browserHistory, store);

// export default store;