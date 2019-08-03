import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './IngredientList';

export const Instruction: React.FC<{instructionHTML: string}> = ({instructionHTML}) => {

  const classes = useStyles();

  return (

    <Box className={classes.box}>
      <Typography variant="h3">Instruction</Typography>
      <div dangerouslySetInnerHTML={{ __html: instructionHTML}} />
    </Box>
  );
}