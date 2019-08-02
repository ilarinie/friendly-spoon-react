import React from 'react';
import { Box, Typography } from '@material-ui/core'
import { RecipeFull } from '../state/types/RecipeFull';
import Rating from '@material-ui/lab/Rating';

export const Comments: React.FC<{recipe: RecipeFull}> = ({recipe}) => {

  return (
    <Box>
      <Typography variant="h3">Comments</Typography>
      <ul>
        {recipe.notes.map((note) => (
          <li><Rating value={note.rating} precision={0.1} /> {note.note} - <i>{note.username}</i></li>
        ))}
      </ul>
    </Box>
  );
}