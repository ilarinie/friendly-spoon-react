import React, { useEffect, useState } from 'react';
import { doGet } from '../services/ApiService';
import { RecipeFull } from '../state/types/RecipeFull';
import { Box } from '@material-ui/core';

export const RecipeDetails: React.FC<{ match: any}> = ({ match }) => {

  const [ recipe, setRecipe ] = useState(null as RecipeFull | null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await doGet<RecipeFull>('/recipes/' + match.params.id);
      setRecipe(recipe);
    }
    fetchRecipe();
  }, []);


  return (
    <Box>
      {!recipe && 'Loading recipe...'}
      {recipe && <pre>{JSON.stringify(recipe, null, 2)}</pre>}
    </Box>
  );
}