import React from 'react';
import { RecipeMeta } from '../../state/types/RecipeMeta';
import { ListItem, ListItemAvatar, Box, Typography, Chip, Divider, makeStyles } from '@material-ui/core';
import { Star } from '@material-ui/icons';

const useStyles = makeStyles({
  avatar: {
    height: '80px',
    marginRight: '1em',
    marginTop: '1em',
    width: '80px',
    borderRadius: '5px',
  },
  listItemSecondary: {
    height: '45px',
  },
  listItemSubtitle: {
    display: 'flex',
    marginTop: '0.3em',
    '& > div': {
      marginRight: '0.5em',
    },
  },
  listItemSubtitleIntroduction: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: '0.3em',
  },
  listItemText: {
    overflow: 'hidden',
    width: '100%',
  },
  listItemTitle: {},
  divider: {
    marginTop: '0.3em',
  },
});

export const Recipe: React.FC<{ recipe: RecipeMeta; onClick: any }> = ({ recipe, onClick }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="center" onClick={onClick}>
        <ListItemAvatar>
          <img
            alt=""
            className={classes.avatar}
            src={
              recipe.coverpicture
                ? process.env.REACT_APP_API_URL + recipe.coverpicture.picture.medium.url
                : 'https://via.placeholder.com/80'
            }
          />
        </ListItemAvatar>
        <Box className={classes.listItemText}>
          <Box className={classes.listItemTitle}>
            <Typography>{recipe.name}</Typography>
          </Box>
          <Box className={classes.listItemSecondary}>
            <Box alignItems="center" justifyContent="flex-start" className={classes.listItemSubtitle}>
              {recipe.recipe_tags[0] && <Chip label={recipe.recipe_tags[0].tag.title} size="small" color="secondary" />}
              {recipe.ratingaverage && (
                <Chip
                  label={
                    <>
                      <Star color="secondary" fontSize="small" />
                      {recipe.ratingaverage.toFixed(1)}
                    </>
                  }
                  size="small"
                  variant="outlined"
                />
              )}
              <Chip color="secondary" variant="outlined" label={getDurationLabel(recipe.duration.id)} size="small" />
            </Box>
            <Box className={classes.listItemSubtitleIntroduction}>{recipe.introduction}</Box>
            <Divider className={classes.divider} />
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export const getDurationLabel = (durationId: number) => {
  switch (durationId) {
    case 1:
      return '30min';
    case 2:
      return '1h';
    case 3:
      return '2h';
    case 4:
      return '3h';
    default:
      return '4h';
  }
};
