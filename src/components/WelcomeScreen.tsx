import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Typography, Fade } from '@material-ui/core';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    textAlign: 'center'
  }
})


export const WelcomeScreen: React.FC = () => {
  const classes = useStyles();

  const [ fadeIn, setFadeIn ] = useState(true);

  useEffect(() => {
    const waitAWhile = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFadeIn(false);
    }
    waitAWhile();
  }, []);

  return (
    <Fade in={fadeIn} timeout={600} mountOnEnter={true}>
      <Box className={classes.box}>
        <Typography variant="h2">Welcome</Typography>
        <Typography variant="h2">To</Typography>
        <Typography variant="h2">Friendly Spoon</Typography>
      </Box>
    </Fade>
  );
}