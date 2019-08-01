import { Action } from 'redux';
import { LOGIN_STATUS } from '../types/LoginStatus';
import { UserProfile } from '../types/UserProfile';

export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

interface SetLoginStatusAction extends Action {
  type: typeof SET_LOGIN_STATUS;
  loginStatus: LOGIN_STATUS
}

export const SetLoginStatus = (loginStatus: LOGIN_STATUS): UIAction => {
    return {
        type: SET_LOGIN_STATUS,
        loginStatus,
    };
};

export const SET_USER_PROFILE = 'SET_USER_PROFILE';

interface SetUserProfileAction extends Action {
  type: typeof SET_USER_PROFILE;
  userProfile: UserProfile;
}

export const SetUserProfile = (userProfile: UserProfile): UIAction => {
    return {
        type: SET_USER_PROFILE,
        userProfile,
    };
};

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

interface SetSearchTermAction extends Action {
  type: typeof SET_SEARCH_TERM;
  searchTerm: string;
}

export const SetSearchTerm = (searchTerm: string): UIAction => {
    return {
        type: SET_SEARCH_TERM,
        searchTerm,
    };
};


export type UIAction = SetLoginStatusAction | SetUserProfileAction | SetSearchTermAction;