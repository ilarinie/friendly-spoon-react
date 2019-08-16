import React, { useEffect, useState, useRef } from 'react';
import { doGet } from '../../services/ApiService';
import { RecipeFull } from '../../state/types/RecipeFull';
import { Box, BottomNavigation, BottomNavigationAction, makeStyles, createStyles, Fade } from '@material-ui/core';
import { List, Code, ArrowBackIos, Details } from '@material-ui/icons';
import ReactSwipe from 'react-swipe';
import { IngredientList } from './IngredientsList';
import { Instructions } from './Instructions';
import { RecipeMeta } from './RecipeMetaInfo';
import { RecipeMetaPanel } from './RecipeMetaPanel';

const useStyles = makeStyles(theme =>
  createStyles({
    bottomBar: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      right: 0,
    },
    box: {
      paddingBottom: '70px',
      height: '100%',
    },
    loadingContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    carousel: {
      paddingTop: '45px',
      height: '100%',
      '& > div': {
        height: '100%',
      },
      padding: theme.spacing(2),
    },
    carouselItem: {
      height: '100%',
    },
  }),
);

export const RecipeDetails: React.FC<{ match: any; history: any }> = ({ match, history }) => {
  const classes = useStyles();

  const swipe = useRef(null);

  const [recipe, setRecipe] = useState(null as RecipeFull | null);

  const [value, setValue] = useState('2');

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe =  await doGet<RecipeFull>('/recipes/' + match.params.id);
      setRecipe(recipe);
    };
    fetchRecipe();
  }, [match.params.id]);

  return (
    <Fade in={true}>
      <Box className={classes.box}>
        <RecipeMetaPanel recipe={recipe} />
        <ReactSwipe
          className={classes.carousel}
          swipeOptions={{
            continuous: true,
          }}
          ref={swipe}
        >
          <div className={classes.carouselItem}>
            <IngredientList recipe={recipe} />
          </div>
          <div className={classes.carouselItem}>
            <Instructions instructionHTML={recipe && recipe.instruction} />
          </div>
          <div className={classes.carouselItem}>
            <RecipeMeta recipe={recipe} />
          </div>
        </ReactSwipe>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue === '-1') {
              return;
            }
            setValue(newValue);
            if (swipe && swipe.current) {
              const swipedd = (swipe.current as any).swipe as any;
              swipedd.slide(newValue);
            }
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
    </Fade>
  );
};
