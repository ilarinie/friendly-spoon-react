import React from 'react';
import { Typography } from '@material-ui/core';
import { RecipeFull } from '../../../state/types/RecipeFull';
import Rating from '@material-ui/lab/Rating';
import { RecipeDetailSubContainer } from '../RecipeDetailSubContainer';

export const RecipeMeta: React.FC<{ recipe: RecipeFull }> = ({ recipe }) => {
  return (
    <RecipeDetailSubContainer>
      <Typography variant="h4">Comments</Typography>
      <ul>
        {recipe.notes.map(note => (
          <li key={note.note}>
            <Rating value={note.rating} precision={0.1} /> {note.note} - <i>{note.username}</i>
          </li>
        ))}
      </ul>
    </RecipeDetailSubContainer>
  );
};
