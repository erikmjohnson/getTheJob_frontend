import {combineReducers} from 'redux';
import token from './token-reducer';
import jobSearch from './jobSearch-reducer';
import profile from './profile-reducer'

export default combineReducers({
  token,
  jobSearch,
  profile
})
