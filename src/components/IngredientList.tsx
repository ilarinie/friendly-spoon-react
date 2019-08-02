import React from 'react';
import { RecipeFull } from '../state/types/RecipeFull';
import { Box, Typography } from '@material-ui/core';

export const IngredientList: React.FC<{recipe: RecipeFull}> = ({ recipe }) => {

  return (
    <Box>
      <Typography variant="h3">IngredientList</Typography>
      <ul>
        {recipe.recipe_ingredients.map((ingredient, index) => (
          <li key={ingredient.ingredient.name}>{ingredient.ingredient.name}</li>
        ))}
      </ul>
      {
        recipe.recipe_ingredient_groups.map((group) => (
          <Box>
            <Typography variant="h4">{group.name}</Typography>
            <ul>
              {group.recipe_ingredients.map((ingredient) => (
                <li>{ingredient.ingredient.name}</li>
              ))}
            </ul>
          </Box>
        ))
      }
    </Box>
  );
}