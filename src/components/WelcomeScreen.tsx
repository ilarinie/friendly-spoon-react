import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Typography, Fade, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100vh',
      alignItems: 'center',
      textAlign: 'center',
      background: theme.palette.primary.main,
      width: '100vw',
      position: 'absolute',
      top: 0,
      right: 0,
      color: theme.palette.primary.contrastText,
      zIndex: 999,
    },
  }),
);

export const WelcomeScreen: React.FC<{ timeout: number }> = ({ timeout }) => {
  const classes = useStyles();

  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const waitAWhile = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // setFadeIn(false);
    };
    waitAWhile();
  }, [timeout]);
  return (
    <Fade in={fadeIn} timeout={600} mountOnEnter={true}>
      <Box className={classes.box}>
        <Typography variant="h2">Welcome</Typography>
        <Typography variant="h2">To</Typography>
        <Typography variant="h2">Friendly Spoon</Typography>
      </Box>
    </Fade>
  );
};
