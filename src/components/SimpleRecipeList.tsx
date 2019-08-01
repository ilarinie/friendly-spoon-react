import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../state/Store';
import { Fade, makeStyles, Box, Typography, TextField, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { RecipeMeta } from '../state/types/RecipeMeta';
import { useField } from '../hooks/UseField';
import { Restore, Favorite, LocationOn } from '@material-ui/icons';

const useStyles = makeStyles({
  recipeBox: {
    width: '100%',
    height: '40px'
  },
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  list: {
    paddingBottom: '60px'
  }
})


export const SimpleRecipeList: React.FC<{history: any}>= ({history}) => {

  const classes = useStyles();

  const searchTerm = useSelector((state: State) => state.uiState.searchTerm);

  const [ value, setValue ] = useState('');

  const recipes = useSelector((state: State) => state.domainState.recipeList);

  const [ visibleRecipes, setVisibleRecipes ] = useState(recipes);

  const openRecipe = (recipeId: number) => {
    history.push('/recipes/' + recipeId);
  }

  useEffect(() => {
    setVisibleRecipes(recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [ searchTerm ])

  return (
    <Fade in={true} timeout={300}>
      <div className={classes.list}>
        {visibleRecipes.length !== 0 ? 
          visibleRecipes.map((recipe, index) => (
            <Recipe recipe={recipe} key={recipe.name} onClick={() => openRecipe(recipe.id)} />
          ))
          :
          'Loading recipes...'
        }
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.bottomBar}
        >
        <BottomNavigationAction label="Recents" icon={<Restore />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
      </BottomNavigation>
      </div>
    </Fade>
  );

}

const Recipe: React.FC<{recipe: RecipeMeta, onClick: any }> = ({recipe, onClick}) => {


  const url = recipe.coverpicture ? (process.env.REACT_APP_API_URL as string) + recipe.coverpicture.picture.medium.url : 'https://images.unsplash.com/photo-1556911073-52527ac43761?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80';

  const classes = useStyles();
  return (
    <Box onClick={onClick} className={classes.recipeBox}>
      <Typography>{recipe.name}</Typography>
    </Box>
  )
}