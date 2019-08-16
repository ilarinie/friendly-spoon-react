import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Box, TextField, Button } from '@material-ui/core';
import { partitionSearchTerm, amountParser, mockCreate } from './utils';
import { Code } from '@material-ui/icons';

const useStyles = makeStyles({
  box: {
    padding: '1em',
  },
  input: {
    flexGrow: 1,
  },
  inputBox: {
    display: 'flex',
  },
  suggestion: {
    border: '1px solid black',
  },
  saveButton: {},
});

const asd = () => {
  const amounts = [];
  for (let i = 0; i < 10; i++) {
    const beginning = i ? i : '';
    const separator = i ? ' ' : '';
    amounts.push(beginning.toString());
    amounts.push(beginning + separator + '1/4');
    amounts.push(beginning + separator + '1/3');
    amounts.push(beginning + separator + '1/2');
  }
  return amounts;
};

const AMOUNTS = asd();
const INGREDIENTS = [{ id: 1, name: 'apples' }, { id: 2, name: 'aubergines' }, { id: 3, name: 'oranges' }, { id: 4, name: 'tomatoes' }];
const UNITS = [{ id: 1, name: 'tbs' }, { id: 2, name: 'tbsp' }, { id: 3, name: 'g' }];

const INGREDIENT_FORMAT = /^\d{1,6}\s\S{0,10}\s/gm;

export const IngredientInput: React.FC<{ recipeId: number }> = ({ recipeId }) => {
  const classes = useStyles();

  const inputEl = useRef(null);

  const [suggestions, setSuggestions] = useState([] as string[]);
  const [showError, setShowError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const showAmountSuggestions = (filter: string) => {
    console.log(`'${filter}' filter`);
    if (inputEl && inputEl.current) {
      if (!(((inputEl as any).current as any) === document.activeElement)) {
        setSuggestions([]);
        return;
      }
    }
    let amountSuggestions;
    if (filter === '') {
      amountSuggestions = AMOUNTS.map(i => i);
    } else {
      amountSuggestions = AMOUNTS.filter(i => i.charAt(0) === filter);
    }
    amountSuggestions.length = Math.min(amountSuggestions.length, 5);
    setSuggestions(amountSuggestions);
  };

  const showUnitSuggestions = (filter: string) => {
    let unitSuggestions;
    if (filter === '') {
      unitSuggestions = UNITS.map(i => i.name);
    } else {
      unitSuggestions = UNITS.filter(i => i.name.includes(filter)).map(i => i.name);
    }
    unitSuggestions.length = Math.min(unitSuggestions.length, 5);
    setSuggestions(unitSuggestions);
  };

  const showIngredientSuggestions = (filter: string) => {
    const ingredientSuggestions = INGREDIENTS.filter(i => i.name.includes(filter)).map(i => i.name);
    ingredientSuggestions.length = Math.min(ingredientSuggestions.length, 5);
    setSuggestions(ingredientSuggestions);
  };

  useEffect(() => {
    updateSuggestions();
  }, [searchTerm]);

  const updateSuggestions = () => {
    const parts = partitionSearchTerm(searchTerm);
    if (parts.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      if (parts.length === 1 && searchTerm.charAt(searchTerm.length - 1) !== ' ') {
        showAmountSuggestions(parts[0] || '');
      }
      if (
        (parts.length === 1 && searchTerm.charAt(searchTerm.length - 1) === ' ') ||
        (parts.length === 2 && searchTerm.charAt(searchTerm.length - 1) !== ' ')
      ) {
        showUnitSuggestions(parts[1] || '');
      } else if ((parts.length === 2 && searchTerm.charAt(searchTerm.length - 1) === ' ') || parts.length > 2) {
        showIngredientSuggestions(parts[2] || '');
      }
    }
  };

  const mockSave = async () => {
    setLoading(true);
    setSuggestions([]);
    const parts = partitionSearchTerm(searchTerm);
    if (parts.length === 3) {
      const amount = amountParser(parts[0]);
      const unitString = parts[1];
      const ingredientString = parts[2];

      let unit: { id: number; name: string } | null = null;
      for (let i = 0; i < UNITS.length; i++) {
        if (UNITS[i].name === unitString) {
          unit = UNITS[i];
          break;
        }
      }

      if (unit === null) {
        unit = (await mockCreate(unitString)) as { id: number; name: string };
      }

      let ingredient: { id: number; name: string } | null = null;

      for (let i = 0; i < INGREDIENTS.length; i++) {
        if (INGREDIENTS[i].name === ingredientString) {
          ingredient = INGREDIENTS[i];
          break;
        }
      }

      if (ingredient === null) {
        ingredient = (await mockCreate(ingredientString)) as { id: number; name: string };
      }
      console.log(JSON.stringify({ amount, unit_id: unit.id, ingredient_id: ingredient.id }, null, 2));
    } else {
      console.error('error');
    }

    setLoading(false);
  };

  const addToSearchTerm = (toAdd: string) => {
    const parts: string[] = searchTerm.split(' ');
    parts[parts.length - 1] = toAdd;
    setSearchTerm(parts.join(' ') + ' ');
    if (inputEl !== null && inputEl.current !== null) {
      ((inputEl as any).current as any).focus();
    }
  };

  return (
    <Box className={classes.box}>
      <Box className={classes.inputBox}>
        <TextField
          inputProps={{ ref: inputEl }}
          variant="outlined"
          value={searchTerm}
          className={classes.input}
          onChange={handleSearchTermChange}
          disabled={loading}
          onFocus={() => updateSuggestions()}
        />
        <Button disabled={loading} tabIndex={1} variant="outlined" color="secondary" className={classes.saveButton} onClick={mockSave}>
          {!loading ? 'Save' : <Code />}
        </Button>
      </Box>
      {suggestions.length !== 0 && (
        <Box className={classes.suggestion}>
          {suggestions.map((s, index) => (
            <div tabIndex={0} key={s} onClick={() => addToSearchTerm(s)} onKeyPress={() => addToSearchTerm(s)}>
              {s}
            </div>
          ))}
        </Box>
      )}
      {showError && <div>ERRORR</div>}
    </Box>
  );
};

