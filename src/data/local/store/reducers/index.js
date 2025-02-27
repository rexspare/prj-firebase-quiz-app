import {combineReducers} from 'redux';
import themeReducer from './ThemeReducer';
import langReducer from './LangReducer';

var reducers = combineReducers({
    themeReducer, langReducer
  });
  
  export default rootReducer = (state, action) => {

    return reducers(state, action);
  };