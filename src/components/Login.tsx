import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, TextField, Box, makeStyles, Button, Fade } from '@material-ui/core';
import { doLogin } from '../services/ApiService';
import { BeatLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { LOGIN_STATUS } from '../state/types/LoginStatus';
import { SetLoginStatus } from '../state/actions/UIActions';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  fieldBox: {
    margin: '1em auto',
    display: 'flex'
  },
  submitButton: {
    height: '50px',
    width: '100px',
    margin: '0 auto'
  },
  textField: {
    width: '260px'
  }
})

export const Login: React.FC<{history: any}> = ({history}) => {

  const classes = useStyles();
  const [ fadeIn, setFadeIn ] = useState(true);

  const dispatch = useDispatch();

  const useField = (type: string, placeholder: string )=> {
    const [value, setValue] = useState('')
    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)
    return { type, value, onChange, placeholder }
  }

  const email = useField('string', 'Email address');
  const password = useField('password','Password');

  const [ submitEnabled, setSubmitEnabled ] = useState(false);

  const [ loadingState, setLoadingState ] = useState(false);

  useEffect(() => {
    setSubmitEnabled((email.value !== '' && password.value !== ''));
  }, [email.value, password.value])

  const submitLogin = async () => {
    if (!submitEnabled) {
      return;
    }
    setLoadingState(true);
    try {
      await doLogin(email.value, password.value);
      setFadeIn(false);
      setLoadingState(false);
      setTimeout(() => {
        dispatch(SetLoginStatus(LOGIN_STATUS.LOGGED_IN));
      }, 300);
    } catch (err) {
      setLoadingState(false);
      dispatch(SetLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    }
  }

  return (
    <Fade in={fadeIn} timeout={300} mountOnEnter={true}>
      <Box className={classes.box} flexDirection="column" justifyContent="center" alignItems="center">
        <Box className={classes.fieldBox}>
          <Typography variant="h1">Log in</Typography>
        </Box>
        <form onSubmit={submitLogin}>
          <Box className={classes.fieldBox}>
            <TextField className={classes.textField} variant="standard"  {...email} />
          </Box>
          <Box className={classes.fieldBox}>
            <TextField className={classes.textField} variant="standard"  {...password} />
          </Box>
          <Box className={classes.fieldBox}>
            <Button type="submit" className={classes.submitButton} variant="outlined" disabled={!submitEnabled || loadingState} onClick={submitLogin} >
              {loadingState ? <span style={{ height: '20px'}}><BeatLoader size={5} margin="5px" /></span> : "Log in"}
            </Button>
          </Box>
        </form>
      </Box>
    </Fade>
  );
}