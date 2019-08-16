import { Action } from 'redux';
import { RecipeMeta } from '../types/RecipeMeta';

export const SET_RECIPE_LIST = 'SET_RECIPE_LIST';

interface SetRecipeListAction extends Action {
  type: typeof SET_RECIPE_LIST;
  recipes: RecipeMeta[];
}

export const SetRecipeList = (recipes: RecipeMeta[]): DomainAction => {
  return {
    type: SET_RECIPE_LIST,
    recipes,
  };
};

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

interface SetSearchTermAction extends Action {
  type: typeof SET_SEARCH_TERM;
  searchTerm: string;
}

export const SetSearchTerm = (searchTerm: string): DomainAction => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm,
  };
};

export type DomainAction = SetRecipeListAction | SetSearchTermAction;
