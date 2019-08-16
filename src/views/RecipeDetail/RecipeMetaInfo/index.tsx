import React from 'react';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import { RecipeFull } from '../../../state/types/RecipeFull';
import { RecipeDetailSubContainer } from '../RecipeDetailSubContainer';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export const RecipeMeta: React.FC<{ recipe: RecipeFull | null }> = ({ recipe }) => {
  const classes = useStyles();

  const url =
    recipe && recipe.coverpicture
      ? process.env.REACT_APP_API_URL + recipe.coverpicture.picture.medium.url
      : 'https://via.placeholder.com/100';
  return (
    <RecipeDetailSubContainer>
      <Box>
        <img src={url} alt="" />
      </Box>
    </RecipeDetailSubContainer>
  );
};
