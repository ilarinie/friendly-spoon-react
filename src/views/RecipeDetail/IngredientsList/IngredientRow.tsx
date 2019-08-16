import React, { useState } from 'react';
import { makeStyles, Checkbox, Box, Divider, createStyles, Theme } from '@material-ui/core';
import { RecipeIngredient } from '../../../state/types/RecipeIngredient';
import { IngredientAmountBadge } from './IngredientAmountBadge';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      textTransform: 'lowercase',
      display: 'flex',
      alignItems: 'center',
      lineHeight: '40px',
    },
    lineThrough: {
      textDecoration: 'line-through',
      color: theme.palette.grey[400] + ' !important',
      '& > span': {
        color: theme.palette.grey[400] 
      }
    },
    amount: {
      fontSize: theme.typography.h6.fontSize,
      marginRight: '0.2em',
    },
    unit: {
      color: theme.palette.secondary.main,
      fontWeight: 600,
      marginRight: '0.2em',
      fontSize: '16px',
    },
    instructionSpan: {
      color: theme.palette.grey[700],
      marginLeft: '0.2em'
    },
    nameSpan: {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '10px',
    },
    fractionSpan: {
      fontSize: '14px',
      fontWeight: 'bold'
    },
    checkbox: {
      marginBottom: '-0.1em',
    },
  }),
);

export const IngredientRow: React.FC<{ recipeIngredient: RecipeIngredient }> = ({ recipeIngredient }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  return (
    <>
      <Box className={clsx(classes.box, checked && classes.lineThrough)} onClick={() => setChecked(!checked)}>
        <Checkbox className={classes.checkbox} checked={checked} />
        {/* AMOUNT */}
        <IngredientAmountBadge fractionAmountClassName={classes.fractionSpan} className={classes.amount} ingredient={recipeIngredient} />
        {/* UNIT */}
        {recipeIngredient.unit && <span className={classes.unit}>{recipeIngredient.unit.name}</span>}
        {/* NAME */}
        <span className={classes.nameSpan}>{recipeIngredient.ingredient.name}</span>
        {/* OPTIONAL INSTRUCTION */}
        {recipeIngredient.instruction && <span className={classes.instructionSpan}>{'(' + recipeIngredient.instruction + ')'}</span>}
      </Box>
      <Divider />
    </>
  );
};
