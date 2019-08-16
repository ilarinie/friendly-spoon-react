import React from 'react';
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Restore, Favorite, LocationOn, PlusOne, CalendarToday } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../state/Store';
import { SetSearchTerm } from '../../state/actions/DomainActions';

const useStyles = makeStyles({
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
});

export const RecipeListBottomBar: React.FC = () => {
  const classes = useStyles();

  const recipes = useSelector((state: State) => state.domainState.recipeList);

  const dispatch = useDispatch();

  const handleBottomBarClick = (event: any, newValue: string) => {
    if (newValue === '1') {
      dispatch(SetSearchTerm(recipes[Math.floor(Math.random() * recipes.length)].name));
    }
  };

  return (
    <BottomNavigation onChange={handleBottomBarClick} showLabels className={classes.bottomBar}>
      <BottomNavigationAction label="Random" value="1" icon={<Restore />} />
      <BottomNavigationAction label="New Recipe" icon={<PlusOne />} />
      <BottomNavigationAction label="Calendar" icon={<CalendarToday />} />
    </BottomNavigation>
  );
};
