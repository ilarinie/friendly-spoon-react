import React from 'react';
import { Typography } from '@material-ui/core';
import { RecipeDetailSubContainer } from '../RecipeDetailSubContainer';

export const Instructions: React.FC<{ instructionHTML: string }> = ({ instructionHTML }) => {
  return (
    <RecipeDetailSubContainer>
      <Typography variant="h4">Instruction</Typography>
      <div dangerouslySetInnerHTML={{ __html: instructionHTML }} />
    </RecipeDetailSubContainer>
  );
};
