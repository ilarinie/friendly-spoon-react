import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../state/Store';
import { Fade } from '@material-ui/core';

export const SimpleRecipeList: React.FC<{history: any}>= ({history}) => {

  const recipes = useSelector((state: State) => state.domainState.recipeList );

  const openRecipe = (recipeId: number) => {
    history.push('/recipes/' + recipeId);
  }

  return (
    <Fade in={true} timeout={300}>
      <div>
        {recipes.length !== 0 ? 
          recipes.map((recipe, index) => (
            <div key={recipe.name} onClick={() => openRecipe(recipe.id)}>
              {recipe.name}
            </div>
          ))
          :
          'Loading recipes...'
        }
      </div>
    </Fade>
  );

}