import React from 'react';
import { Box, Typography } from '@material-ui/core';

export const Instruction: React.FC<{instructionHTML: string}> = ({instructionHTML}) => {

  return (
    <Box style={{ height: 'calc(100vh - 150px)', overflow: 'auto'}}>
      <Typography variant="h3">Instruction</Typography>
      <div dangerouslySetInnerHTML={{ __html: instructionHTML}} />
    </Box>
  );
}