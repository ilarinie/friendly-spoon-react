import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listTitle: {
      fontFamily: `'Pacifico', cursive`,
      textAlign: 'center',
      color: theme.palette.grey[600],
      marginBottom: '0.5em',
    },
  }),
);

export const RecipeDetailSubtitle: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.listTitle} variant="h4">
      {children}
    </Typography>
  );
};
