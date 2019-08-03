import React from 'react';
import { RecipeFull } from '../state/types/RecipeFull';
import { Box, Container, Typography, createStyles, makeStyles, Theme, Chip } from '@material-ui/core';
import classes from '*.module.css';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) => createStyles({
  recipeHero: {
    background: theme.palette.primary.light,
    marginTop: '-1.4em',
    marginLeft: `calc(-1px * ${theme.spacing(2)})`,
    marginBottom: '1em',
    width: `100vw`,
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.primary.contrastText,
    minHeight: '4em',
    position: 'absolute',
    top: 60,
    zIndex: 5,
  },
  recipeDescriptionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    top: 0,
    marginTop: '1em'
  },
  rating: {
    width: '100px'
  },
  chip: {
    margin: theme.spacing(1),
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export const RecipeMetaPanel: React.FC<{ recipe: RecipeFull }> = ({ recipe }) => {

  const classes = useStyles();

  return (
    <Box className={classes.recipeHero}>
        <Typography variant="h5">{recipe.name}</Typography>
        <Box className={classes.metaInfo}>
          <Rating size="small" value={recipe.ratingaverage} precision={0.1} />
          <Chip label={recipe.level.level} color="primary" size="small" className={classes.chip} variant="default" />
          <Chip label={recipe.duration.range} color="primary" size="small" className={classes.chip} variant="default" />
        </Box>
    </Box>
  );
}