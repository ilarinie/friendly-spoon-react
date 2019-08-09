import React, { useEffect } from 'react';
import { doGet, validateLogin } from './services/ApiService';
import { RecipeMeta } from './state/types/RecipeMeta';
import { RecipeList } from './views/RecipeList';
import { Route, Switch } from 'react-router-dom';
import { Login } from './views/Login/Login';
import { CssBaseline, Theme, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './state/Store';
import { LOGIN_STATUS } from './state/types/LoginStatus';
import { SetLoginStatus } from './state/actions/UIActions';
import { SetRecipeList } from './state/actions/DomainActions';
import { RecipeDetails } from './views/RecipeDetail/RecipeDetail';
import { FsAppBar } from './components/FsAppBar';
// @ts-ignore
import Div100vh from 'react-div-100vh';

const WELCOME_SCREEN_TIMEOUT_MS = 1000;

const addMinimumTime = async (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, WELCOME_SCREEN_TIMEOUT_MS));
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      paddingTop: '50px',
      height: '100%',
      background: 'rgba(255,255,255,0.9)',
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
    },
  }),
);

const App: React.FC<{ history: any }> = ({ history }) => {
  const classes = useStyles();
  const loginStatus = useSelector((state: State) => state.uiState.loginStatus);

  const dispatch = useDispatch();

  const fetchRecipes = async () => {
    dispatch(SetRecipeList(await doGet<RecipeMeta[]>('/recipes')));
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await validateLogin();
        fetchRecipes();
        await addMinimumTime();
        dispatch(SetLoginStatus(LOGIN_STATUS.LOGGED_IN));
      } catch (err) {
        await addMinimumTime();
        dispatch(SetLoginStatus(LOGIN_STATUS.LOGGED_OUT));
      }
    };
    checkLoginStatus();
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Div100vh>
      <CssBaseline />
      {loginStatus === LOGIN_STATUS.CHECKING && <WelcomeScreen timeout={WELCOME_SCREEN_TIMEOUT_MS} />}
      {loginStatus === LOGIN_STATUS.LOGGED_OUT && <Route component={Login} />}
      {loginStatus === LOGIN_STATUS.LOGGED_IN && (
        <>
          <FsAppBar />
          <div className={classes.contentContainer}>
            <Switch>
              <Route exact path="/" component={RecipeList} />
              <Route path="/recipes/:id" component={RecipeDetails} />
            </Switch>
          </div>
        </>
      )}
    </Div100vh>
  );
};

export default App;
