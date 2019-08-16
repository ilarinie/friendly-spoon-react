import React from 'react';
import { RecipeFull } from '../../../state/types/RecipeFull';
import { Box } from '@material-ui/core';
import { RecipeDetailSubtitle } from '../RecipeDetailSubtitle';
import { RecipeDetailSubContainer } from '../RecipeDetailSubContainer';
import { IngredientRow } from './IngredientRow';
import { makeStyles } from '@material-ui/styles';
import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles({
  ingredientListContainer: {
    marginTop: '0.5em',
  },
});

export const IngredientList: React.FC<{ recipe: RecipeFull | null }> = ({ recipe }) => {
  const classes = useStyles();
  return (
    <RecipeDetailSubContainer>
      <RecipeDetailSubtitle>Ingredients</RecipeDetailSubtitle>
      <Box className={classes.ingredientListContainer}>
        {recipe &&
          recipe.recipe_ingredients.map((ingredient, index) => (
            <IngredientRow key={ingredient.ingredient.name} recipeIngredient={ingredient} />
          ))}
        {!recipe && (
          <Box className={classes.ingredientListContainer}>
            <Skeleton count={12} height={20} />{' '}
          </Box>
        )}
      </Box>
      {recipe &&
        recipe.recipe_ingredient_groups.map(group => (
          <Box className={classes.ingredientListContainer} key={group.name}>
            <RecipeDetailSubtitle>{group.name}</RecipeDetailSubtitle>
            {group.recipe_ingredients.map(ingredient => (
              <IngredientRow key={group.id + ' ' + ingredient.id} recipeIngredient={ingredient} />
            ))}
          </Box>
        ))}
    </RecipeDetailSubContainer>
  );
};
