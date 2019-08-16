import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, makeStyles, createStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useField } from '../hooks/UseField';
import { useDispatch } from 'react-redux';
import { fade } from '@material-ui/core/styles';
import { SetSearchTerm } from '../state/actions/DomainActions';
import { History } from 'history';
import { withRouter } from 'react-router-dom';

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

const FsAppBarImpl: React.FC<{ history: History }> = ({ history }) => {
  const dispatch = useDispatch();
  const searchTerm = useField('text', 'Search...');
  const classes = useStyles();

  useEffect(() => {
    dispatch(SetSearchTerm(searchTerm.value));
  }, [dispatch, searchTerm]);

  return (
    <AppBar style={{ boxShadow: 'none' }} position="fixed">
      <Toolbar>
        <Typography onClick={() => history.push('/')} className={classes.appLogo} variant="body2">
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
  );
};

export const FsAppBar = withRouter(FsAppBarImpl);
