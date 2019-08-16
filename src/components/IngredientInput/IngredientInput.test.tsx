import { partitionSearchTerm, amountParser } from './utils';

describe('IngredientPartitioner test', () => {
  it('Parses lines with just the amount correctly', () => {
    const string_1 = '1';
    const desiredResult1 = ['1'];
    expect(partitionSearchTerm(string_1)).toEqual(desiredResult1);

    const string_2 = '2 1/4';
    const desiredResult2 = ['2 1/4'];
    expect(partitionSearchTerm(string_2)).toEqual(desiredResult2);

    const string_3 = '1/4';
    const desiredResult3 = ['1/4'];
    expect(partitionSearchTerm(string_3)).toEqual(desiredResult3);
  });
  it('Parses lines with just the amount and unit correctly', () => {
    const string_1 = '1 tbs';
    const desiredResult1 = ['1', 'tbs'];
    expect(partitionSearchTerm(string_1)).toEqual(desiredResult1);

    const string_2 = '2 1/4 g';
    const desiredResult2 = ['2 1/4', 'g'];
    expect(partitionSearchTerm(string_2)).toEqual(desiredResult2);
  });
  it('Returns empty array with invalid input', () => {
    const string_1 = '1aa3 asbs';
    const desiredResult1: any[] = [];
    expect(partitionSearchTerm(string_1)).toEqual(desiredResult1);

    const string_2 = '1 111 111 111';
    const desiredResult2: any[] = [];
    expect(partitionSearchTerm(string_2)).toEqual(desiredResult2);
  });
  it('Parses full ingredient strings correctly', () => {
    const string_1 = '1 1/2 tbs apple';
    const desiredResult1 = ['1 1/2', 'tbs', 'apple'];

    expect(partitionSearchTerm(string_1)).toEqual(desiredResult1);

    const string_2 = '2 1/4 g apple sauce';
    const desiredResult2 = ['2 1/4', 'g', 'apple sauce'];

    expect(partitionSearchTerm(string_2)).toEqual(desiredResult2);

    const string_3 = '3 g apple sauce';
    const desiredResult3 = ['3', 'g', 'apple sauce'];

    expect(partitionSearchTerm(string_3)).toEqual(desiredResult3);
  });
  it('Handles extra whitespaces', () => {
    const string_1 = '1    ';
    const desiredResult1 = ['1'];

    expect(partitionSearchTerm(string_1)).toEqual(desiredResult1);

    const string_2 = '1    tbs';
    const desiredResult2 = ['1', 'tbs'];

    expect(partitionSearchTerm(string_2)).toEqual(desiredResult2);

    const string_3 = '1    tbs     ';
    const desiredResult3 = ['1', 'tbs'];

    expect(partitionSearchTerm(string_3)).toEqual(desiredResult3);

    const string_4 = '1  3/4  tbs     apple   sauce   juice   ';
    const desiredResult4 = ['1 3/4', 'tbs', 'apple sauce juice'];

    expect(partitionSearchTerm(string_4)).toEqual(desiredResult4);

    const string_5 = '   1  3/4  tbs     apple   sauce   juice   ';
    const desiredResult5 = ['1 3/4', 'tbs', 'apple sauce juice'];

    expect(partitionSearchTerm(string_5)).toEqual(desiredResult5);
  });
});

describe('AmountParser test', () => {
  it('correctly parses simple amounts', () => {
    expect(amountParser('1')).toEqual(1);

    expect(amountParser('1331')).toEqual(1331);

    expect(amountParser('42')).toEqual(42);

    expect(amountParser('9999')).toEqual(9999);
  });
  it('correctly parses more complicated amounts', () => {
    expect(amountParser('1    1/2')).toEqual(1.5);

    expect(amountParser('1 1/4  ')).toEqual(1.25);

    expect(amountParser('1 1/100')).toEqual(1.01);

    expect(amountParser('  1 1/22')).toEqual(1.0454545454545454);
  });
});
