import React, { useState } from 'react';
import { RecipeFull } from '../../state/types/RecipeFull';
import { useField } from '../../hooks/UseField';
import { Box, makeStyles } from '@material-ui/core';
import { IngredientInput } from '../../components/IngredientInput';

const useStyles = makeStyles({
  box: {
    paddingTop: '60px',
  },
});

export const RecipeEditor: React.FC<{ recipeToEdit?: RecipeFull }> = ({ recipeToEdit }) => {
  const [recipe, setRecipe] = useState(recipeToEdit || ({} as RecipeFull));

  const classes = useStyles();

  const name = useField('string', 'Recipe name');
  const introduction = useField('string', 'Recipe introduction');
  const instruction = useField('string', 'Instructions');

  return (
    <Box className={classes.box}>
      <IngredientInput recipeId={1} />
    </Box>
  );
};
