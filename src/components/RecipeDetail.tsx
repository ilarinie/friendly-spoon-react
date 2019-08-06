import React, { useEffect, useState, useRef } from 'react';
import { doGet } from '../services/ApiService';
import { RecipeFull } from '../state/types/RecipeFull';
import { Box, BottomNavigation, BottomNavigationAction, makeStyles, createStyles, useScrollTrigger, Slide, AppBar, Toolbar, Typography, Container, Fade } from '@material-ui/core';
import { List, Code, ArrowBackIos, Comment, Details } from '@material-ui/icons';
import { BeatLoader } from 'react-spinners';
import ReactSwipe from 'react-swipe';
import { IngredientList } from './IngredientList';
import { Instruction } from './Instruction';
import { RecipeMeta } from './RecipeMeta';
import Rating from '@material-ui/lab/Rating';
import { RecipeMetaPanel } from './RecipeMetaPanel';



const useStyles = makeStyles(theme => createStyles({
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    right: 0
  },
  box: {
    paddingBottom: '70px',
    height: 'auto'
  },
  loadingContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  carousel: {
    marginTop: '85px',
    height: 'calc(100vh - 230px)',
    '& > div': {
      height: '100%'
    }
  },
  carouselItem: {
    height: '100%'
  },
}));

export const RecipeDetails: React.FC<{ match: any, history: any }> = ({ match, history }) => {

  const classes = useStyles();

  const swipe = useRef(null);

  const [ recipe, setRecipe ] = useState(null as RecipeFull | null);

  const [ value, setValue ] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await doGet<RecipeFull>('/recipes/' + match.params.id);
      setRecipe(recipe);
    }
    fetchRecipe();
  }, []);



  return (
      <Box className={classes.box}>
        {console.log(value)}
        {!recipe && <div className={classes.loadingContainer}><BeatLoader size={5} margin="5px" /></div>}
        {recipe &&
          <Fade in={true} timeout={500}>
            <div>
            <RecipeMetaPanel recipe={recipe} />
            <ReactSwipe
              className={classes.carousel}
              swipeOptions={{
                continuous: false,
                
              }}
              ref={swipe}
            >
              <div className={classes.carouselItem}><IngredientList recipe={recipe} /></div>
              <div className={classes.carouselItem}><Instruction instructionHTML={recipe.instruction} /></div>
              <div className={classes.carouselItem}><RecipeMeta  recipe={recipe} /></div>
            </ReactSwipe>
            </div>
          </Fade>
        }
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              console.log('newValue', newValue);
              console.log(swipe)
              if (swipe && swipe.current) { 
                const swipedd = ((swipe.current as any).swipe as any);
                console.log(swipedd.slide);
                swipedd.slide(newValue)
              };
            }}
            showLabels
            className={classes.bottomBar}
          >
          <BottomNavigationAction value="-1" label="Back" onClick={() => history.goBack()} icon={<ArrowBackIos />} />
          <BottomNavigationAction value="0" label="Ingredients" icon={<List />} />
          <BottomNavigationAction value="1" label="Instructions" icon={<Code />} />
          <BottomNavigationAction value="2" label="Details" icon={<Details />} />

        </BottomNavigation>
      </Box>
  );
}