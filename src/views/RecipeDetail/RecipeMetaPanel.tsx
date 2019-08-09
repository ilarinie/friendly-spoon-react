import React from 'react';
import { RecipeFull } from '../../state/types/RecipeFull';
import { Box, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recipeHero: {
      background: theme.palette.primary.light,
      marginLeft: `calc(-1px * ${theme.spacing(2)})`,
      marginBottom: '1em',
      width: `100vw`,
      padding: `${theme.spacing(1)}px ${theme.spacing(4)}px ${theme.spacing(1)}px ${theme.spacing(4)}px`,
      color: theme.palette.primary.contrastText,
      minHeight: '4em',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'fixed',
      top: '4em',
      right: 0,
      left: 'auto',
      zIndex: 99,
    },
    recipeTitle: {
      fontSize: '1.55rem',
    },
    recipeDescriptionContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      top: 0,
      marginTop: '1em',
    },
    rating: {
      width: '100px',
    },
    chip: {
      margin: theme.spacing(1),
    },
    metaInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    image: {
      height: '70px',
      borderRadius: '5px',
      filter: 'sepia',
    },
    expansionPanel: {
      width: '100vw',
      position: 'fixed',
      top: '4em',
      right: 0,
      zIndex: 99,
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      // this is to force no rounded corners (enabled by default for first expansion panel in MUI)
      borderRadius: '0 !important',
    },
    expandIcon: {
      fill: theme.palette.primary.contrastText,
    },
    expansionPanelDetails: {
      // position: 'fixed',
      // top: '5em',
      // right: 0
    },
  }),
);

export const RecipeMetaPanel: React.FC<{ recipe: RecipeFull }> = ({ recipe }) => {
  const classes = useStyles();
  return (
    <Box className={classes.recipeHero}>
      <Typography className={classes.recipeTitle} variant="h6">
        {recipe.name}
      </Typography>
    </Box>
  );
};
