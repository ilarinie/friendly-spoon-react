import React, { useEffect } from 'react';
import './App.css';
import { doGet, validateLogin } from './services/ApiService';
import { RecipeMeta } from './state/types/RecipeMeta';
import { SimpleRecipeList } from './components/SimpleRecipeList';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Container, CssBaseline, AppBar, TextField, Toolbar, InputBase, Theme, createStyles, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './state/Store';
import { LOGIN_STATUS } from './state/types/LoginStatus';
import { SetLoginStatus, SetSearchTerm } from './state/actions/UIActions';
import { SetRecipeList } from './state/actions/DomainActions';
import { RecipeDetails } from './components/RecipeDetail';
import { Search } from '@material-ui/icons';
import { fade } from '@material-ui/core/styles';
import { useField } from './hooks/UseField';


const addMinimumTime = async (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 1500))
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
  container: {
    width: '100vw',
    height: '100vh',
  },
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
}));

const App: React.FC<{history: any}> = ({history}) => {
  const classes = useStyles();
  const loginStatus = useSelector((state: State) => state.uiState.loginStatus);

  const dispatch = useDispatch();

  const searchTerm = useField('text', 'Search...');

  useEffect(() => {
    dispatch(SetSearchTerm(searchTerm.value));
  }, [ searchTerm ])
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await validateLogin();
        dispatch(SetRecipeList(await doGet<RecipeMeta[]>('/recipes')))
        await addMinimumTime();
        dispatch(SetLoginStatus(LOGIN_STATUS.LOGGED_IN));
      } catch (err) {
        await addMinimumTime();
        dispatch(SetLoginStatus(LOGIN_STATUS.LOGGED_OUT));
      }
    }
    checkLoginStatus();
  }, [dispatch])

  return (
    <Container className={classes.container}>
      <CssBaseline />
          { loginStatus === LOGIN_STATUS.CHECKING && <WelcomeScreen /> }
          { loginStatus === LOGIN_STATUS.LOGGED_OUT&& <Route component={Login} />}
          { loginStatus === LOGIN_STATUS.LOGGED_IN &&
          <>
            <AppBar position="fixed">
              <Toolbar>
                <Typography  variant="body2">
                  (LOGO)
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
            <div style={{ paddingTop: '75px'}}>
              <Switch>
                <Route exact path="/" component={SimpleRecipeList} />
                <Route path="/recipes/:id" component={RecipeDetails} />
              </Switch>
            </div>
          </>
          }
    </Container>
  );
}

export default App;
