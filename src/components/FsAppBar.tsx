import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, useScrollTrigger, makeStyles, createStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useField } from '../hooks/UseField';
import { SetSearchTerm } from '../state/actions/UIActions';
import { useDispatch } from 'react-redux';
import { fade } from '@material-ui/core/styles';

function ElevationScroll(props: any) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      width: '90%',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    appLogo: {
      fontFamily: `'Pacifico', cursive`,
      fontSize: '28px',
    },
  }),
);

export const FsAppBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useField('text', 'Search...');
  const classes = useStyles();

  useEffect(() => {
    dispatch(SetSearchTerm(searchTerm.value));
  }, [dispatch, searchTerm]);

  return (
    <ElevationScroll>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.appLogo} variant="body2">
            FS
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              {...searchTerm}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
