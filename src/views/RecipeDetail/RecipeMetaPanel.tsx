import React from 'react';
import { RecipeFull } from '../../state/types/RecipeFull';
import { Box, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { teal } from '@material-ui/core/colors';
// @ts-ignore
import { Textfit } from 'react-textfit';

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
      justifyContent: 'center',
      position: 'fixed',
      top: '4em',
      right: 0,
      left: 'auto',
      zIndex: 99,
      textAlign: 'center',
    },
    recipeTitle: {
      fontSize: '1.7rem',
      maxWidth: '100%',
    },
  }),
);

export const RecipeMetaPanel: React.FC<{ recipe: RecipeFull | null }> = ({ recipe }) => {
  const classes = useStyles();
  return (
    <Box className={classes.recipeHero}>
      <Typography className={classes.recipeTitle} variant="h6">
        {recipe ? (
          <Textfit mode="single" forceSingleModeWidth={false}>
            {recipe.name}
          </Textfit>
        ) : (
          <SkeletonTheme color={teal[300]} highlightColor="white">
            <Skeleton width={300} />
          </SkeletonTheme>
        )}
      </Typography>
    </Box>
  );
};
