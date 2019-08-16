import React from 'react';
import { makeStyles } from '@material-ui/core';
import { RecipeDetailSubContainer } from '../RecipeDetailSubContainer';
import { RecipeDetailSubtitle } from '../RecipeDetailSubtitle';

const useStyles = makeStyles({
  instructionContainer: {},
});

export const Instructions: React.FC<{ instructionHTML: string | null }> = ({ instructionHTML }) => {
  const classes = useStyles();
  return (
    <RecipeDetailSubContainer>
      <RecipeDetailSubtitle>Instructions</RecipeDetailSubtitle>
      {instructionHTML && <div className={classes.instructionContainer} dangerouslySetInnerHTML={{ __html: instructionHTML }} />}
    </RecipeDetailSubContainer>
  );
};
