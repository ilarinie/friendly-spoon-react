import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../state/Store';
import { makeStyles, Box, Typography, TextField, BottomNavigation, BottomNavigationAction, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Chip } from '@material-ui/core';
import { RecipeMeta } from '../state/types/RecipeMeta';
import { Restore, Favorite, LocationOn, Star } from '@material-ui/icons';
import Skeleton from 'react-loading-skeleton';


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
    paddingBottom: '60px',
  },
  inline: {
    display: 'inline'
  },
  avatar: {
    height: '80px',
    marginRight: '1em',
    marginTop: '1em',
    width: '80px',
    borderRadius: '5px'
  },
  listItemSecondary: {
    height: '45px'
  },
  listItemSubtitle: {
    display: 'flex',
    marginTop: '0.3em'
  },
  listItemSubtitleIntroduction: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: '0.3em'
  },
  divider: {
    marginTop: '0.3em'
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
      <div className={classes.list}>
          <List>  
          {visibleRecipes.length !== 0 ? 
            visibleRecipes.map((recipe, index) => (
              <Recipe recipe={recipe} onClick={() => openRecipe(recipe.id)} key={index + recipe.name}/>
            ))
            :
              [1,2,3,4,5,6,7].map((index: number) => (
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Skeleton width={50} height={50} />
                  </ListItemAvatar>
                    <ListItemText
                      primary={<Box><Skeleton /></Box>}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            <Skeleton/>
                          </Typography>
                          <Skeleton />
                        </React.Fragment>
                      }
                    />
                </ListItem>
              ))
            }
          </List> 
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
  );

}

const Recipe: React.FC<{recipe: RecipeMeta, onClick: any }> = ({recipe, onClick}) => {
  const url = recipe.coverpicture ? (process.env.REACT_APP_API_URL as string) + recipe.coverpicture.picture.medium.url : 'https://images.unsplash.com/photo-1556911073-52527ac43761?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80';

  const classes = useStyles();
  return (
    <>
    <ListItem alignItems="center" onClick={onClick}>
      <ListItemAvatar>
        <img className={classes.avatar} src={recipe.coverpicture ? process.env.REACT_APP_API_URL + recipe.coverpicture.picture.medium.url : 'https://via.placeholder.com/80'}/>
      </ListItemAvatar>
      <ListItemText
        primary={<Box><Typography>{recipe.name}</Typography></Box>}
        secondary={
          <Box className={classes.listItemSecondary}>
            <Box alignItems="center" justifyContent="space-between" className={classes.listItemSubtitle}>
              {recipe.recipe_tags[0] && <Chip label={recipe.recipe_tags[0].tag.title} size="small" color="secondary"/>}
              {recipe.ratingaverage && <Chip label={<><Star color="secondary" fontSize="small" />{recipe.ratingaverage.toFixed(1)}</>} size="small" variant="outlined" /> }
              <Chip color="secondary" variant="outlined" label={recipe.duration.range} size="small" />
            </Box>
            <Box className={classes.listItemSubtitleIntroduction}>
              {recipe.introduction}
            </Box>
            <Divider className={classes.divider} />
          </Box>
        }
      />
      </ListItem>
    </>
  )
}