import React from 'react';
import { RecipeFull } from '../../../state/types/RecipeFull';
import { Box, Typography } from '@material-ui/core';
import { RecipeDetailSubContainer } from '../RecipeDetailSubContainer';

export const IngredientList: React.FC<{ recipe: RecipeFull }> = ({ recipe }) => {
  return (
    <RecipeDetailSubContainer>
      <Typography variant="h4">Ingredients</Typography>
      <ul>
        {recipe.recipe_ingredients.map((ingredient, index) => (
          <li key={ingredient.ingredient.name}>{ingredient.ingredient.name}</li>
        ))}
      </ul>
      {recipe.recipe_ingredient_groups.map(group => (
        <Box key={group.name}>
          <Typography variant="h4">{group.name}</Typography>
          <ul>
            {group.recipe_ingredients.map(ingredient => (
              <li key={group.id + ' ' + ingredient.id}>{ingredient.ingredient.name}</li>
            ))}
          </ul>
        </Box>
      ))}
    </RecipeDetailSubContainer>
  );
};
