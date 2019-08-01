import React, { useEffect } from 'react';
import './App.css';
import { doGet, validateLogin } from './services/ApiService';
import { RecipeMeta } from './state/types/RecipeMeta';
import { SimpleRecipeList } from './components/SimpleRecipeList';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useDispatch, useSelector } from 'react-redux';
import { State } from './state/Store';
import { LOGIN_STATUS } from './state/types/LoginStatus';
import { SetLoginStatus } from './state/actions/UIActions';
import { SetRecipeList } from './state/actions/DomainActions';
import { RecipeDetails } from './components/RecipeDetail';


const addMinimumTime = async (): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, 1500))
}

const useStyles = makeStyles({
  container: {
    width: '100vw',
    height: '100vh',
  }
})

const App: React.FC<{history: any}> = ({history}) => {
  const classes = useStyles();
  const loginStatus = useSelector((state: State) => state.uiState.loginStatus);

  const dispatch = useDispatch();
  
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
            <Switch>
              <Route exact path="/" component={SimpleRecipeList} />
              <Route path="/recipes/:id" component={RecipeDetails} />
            </Switch>
          }
    </Container>
  );
}

export default App;
