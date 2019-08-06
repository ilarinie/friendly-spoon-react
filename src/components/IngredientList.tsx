import React from 'react';
import { RecipeFull } from '../state/types/RecipeFull';
import { Box, Typography, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  box: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: '2em'
  }
})

export const IngredientList: React.FC<{recipe: RecipeFull}> = ({ recipe }) => {

  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="h4">Ingredients</Typography>
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