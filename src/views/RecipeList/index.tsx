import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../state/Store';
import { makeStyles, Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Fade } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import { Recipe } from './RecipeRowItem';
import { RecipeListBottomBar } from './RecipeListBottomBar';
import { filterRecipes } from '../../utils/filterRecipes';

const useStyles = makeStyles({
  recipeBox: {
    width: '100%',
    height: '40px',
  },
  list: {
    overflowX: 'hidden',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    height: '100%',
    paddingBottom: '60px',
  },
  inline: {
    display: 'inline',
  },
});

export const RecipeList: React.FC<{ history: any }> = ({ history }) => {
  const classes = useStyles();

  const searchTerm = useSelector((state: State) => state.uiState.searchTerm);
  const recipes = useSelector((state: State) => state.domainState.recipeList);

  const [visibleRecipes, setVisibleRecipes] = useState(recipes);

  const openRecipe = (recipeId: number) => {
    history.push('/recipes/' + recipeId);
  };

  useEffect(() => {
    setVisibleRecipes(recipes.filter(recipe => filterRecipes(recipe, searchTerm)));
  }, [recipes, searchTerm]);

  return (
    <Fade in={true} timeout={300} style={{ height: '100%' }}>
      <div className={classes.list}>
        <List className={classes.list}>
          {visibleRecipes.length !== 0
            ? visibleRecipes.map((recipe, index) => (
                <Recipe recipe={recipe} onClick={() => openRecipe(recipe.id)} key={index + recipe.name} />
              ))
            : [1, 2, 3, 4, 5, 6, 7].map((index: number) => (
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Skeleton width={50} height={50} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box>
                        <Skeleton />
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                          <Skeleton />
                        </Typography>
                        <Skeleton />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
        </List>
        <RecipeListBottomBar />
      </div>
    </Fade>
  );
};

