import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  box: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: '2em',
    width: '90%',
  },
});

export const RecipeDetailSubContainer: React.FC = ({ children }) => {
  const classes = useStyles();

  return <Box className={classes.box}>{children}</Box>;
};
