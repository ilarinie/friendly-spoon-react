import { LOGIN_STATUS } from './types/LoginStatus';
import reducers from './Reducers';
import { createStore, Store } from 'redux';
import { UserProfile } from './types/UserProfile';
import { RecipeMeta } from './types/RecipeMeta';
import { AppAction } from './actions';

export interface UIState {
  loginStatus: LOGIN_STATUS;
  userProfile: UserProfile | null;
}

export interface DomainState {
  recipeList: RecipeMeta[];
}


export interface State {
  uiState: UIState;
  domainState: DomainState;
}



export const makeStore = (): Store<State, AppAction> => {
    return createStore(reducers);
};
