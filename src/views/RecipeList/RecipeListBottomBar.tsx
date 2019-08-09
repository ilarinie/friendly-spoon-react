import React, { useState } from 'react';
import { makeStyles, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Restore, Favorite, LocationOn } from '@material-ui/icons';

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

  const [value, setValue] = useState('');

  return (
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
  );
};
