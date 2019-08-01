import { LOGIN_STATUS } from './types/LoginStatus';
import { combineReducers } from 'redux';
import { State, UIState, DomainState } from './Store';
import { SET_LOGIN_STATUS, SET_USER_PROFILE } from './actions/UIActions';
import { SET_RECIPE_LIST } from './actions/DomainActions';
import { AppAction } from './actions';

const uiState = (uiState: UIState = { loginStatus: LOGIN_STATUS.CHECKING, userProfile: null }, action: AppAction) => {
  switch (action.type) {
    case SET_LOGIN_STATUS:
      return { ...uiState, loginStatus: action.loginStatus };
    case SET_USER_PROFILE:
      return { ...uiState, userProfile: action.userProfile };
    default:
      return uiState;
  }
}

const domainState = (domainState: DomainState = { recipeList: []}, action: AppAction) => {
  switch (action.type) {
    case SET_RECIPE_LIST:
      return { ...domainState, recipeList: action.recipes }
    default:
      return domainState;
  }
}

export default combineReducers<State, AppAction>({
  uiState,
  domainState
});