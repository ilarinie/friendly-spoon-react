import React, { useEffect, useState, useRef } from 'react';
import { doGet } from '../services/ApiService';
import { RecipeFull } from '../state/types/RecipeFull';
import { Box, BottomNavigation, BottomNavigationAction, makeStyles, createStyles, useScrollTrigger, Slide, AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { List, Code, ArrowBackIos, Comment } from '@material-ui/icons';
import { BeatLoader } from 'react-spinners';
import ReactSwipe from 'react-swipe';
import { IngredientList } from './IngredientList';
import { Instruction } from './Instruction';
import { Comments } from './Comments';
import Rating from '@material-ui/lab/Rating';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


const useStyles = makeStyles(theme => createStyles({
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  box: {
    paddingBottom: '70px',
    height: '100%'
  },
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  carousel: {
    height: '100%',
  },
  carouselItem: {
    height: '100%'
  },
  recipeHero: {
    background: theme.palette.primary.light,
    marginTop: '-1.4em',
    marginLeft: `calc(-1px * ${theme.spacing(2)})`,
    marginBottom: '1em',
    width: `calc(100% + ${theme.spacing(4)}px)`,
    padding: '1em',
    color: theme.palette.primary.contrastText,
    minHeight: '4em'
  },
  recipeDescriptionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    position: 'sticky',
    top: '60px',
    marginTop: '1em'
  },
  coverPicture: {
    height: '100%',
    marginLeft: `calc(-1px * ${theme.spacing(2)})`,
    marginTop: `calc(-1px * ${theme.spacing(2)})`,
    width: `calc(100% + ${theme.spacing(4)}px)`,
    maxWidth: '100vw'
  }
}));

export const RecipeDetails: React.FC<{ match: any, history: any }> = ({ match, history }) => {

  const classes = useStyles();

  const swipe = useRef(null);

  const [ recipe, setRecipe ] = useState(null as RecipeFull | null);

  const [ value, setValue ] = useState('0');

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await doGet<RecipeFull>('/recipes/' + match.params.id);
      setRecipe(recipe);
    }
    fetchRecipe();
  }, []);



  return (
    <Box className={classes.box}>
      {!recipe && <div className={classes.loadingContainer}><BeatLoader size={5} margin="5px" /></div>}
      {recipe &&
        <>
          <Box className={classes.recipeHero}>
            <img className={classes.coverPicture} src={`${process.env.REACT_APP_API_URL}/${recipe.coverpicture.picture.medium.url}`} />
            <Container className={classes.recipeDescriptionContainer}>
              <Typography variant="h4">{recipe.name}</Typography>
              <Rating value={recipe.ratingaverage} precision={0.1} />
            </Container>
          </Box>
          <ReactSwipe
            className={classes.carousel}
            swipeOptions={{
              continuous: false,
              // callback: (index, element) => { setValue('' + index); (swipe.current as any).slide(index) },
            }}
            ref={swipe}
          >
            <div className={classes.carouselItem}><IngredientList recipe={recipe} /></div>
            <div className={classes.carouselItem}><Instruction instructionHTML={recipe.instruction} /></div>
            <div className={classes.carouselItem}><Comments  recipe={recipe} /></div>
          </ReactSwipe>
        </>
      }
      <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (swipe && swipe.current) { (swipe.current as any).slide(newValue); };
          }}
          showLabels
          className={classes.bottomBar}
        >
        <BottomNavigationAction label="Back" onClick={() => history.goBack()} icon={<ArrowBackIos />} />
        <BottomNavigationAction value="0" label="Ingredients" icon={<List />} />
        <BottomNavigationAction value="1" label="Instructions" icon={<Code />} />
        <BottomNavigationAction value="2" label="Comments" icon={<Comment />} />

      </BottomNavigation>
    </Box>
  );
}