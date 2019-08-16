export const partitionSearchTerm = (searchTerm: string): any[] => {
  let initialParts = searchTerm.split(' ');
  initialParts = initialParts.filter(i => i !== '');
  if (initialParts.length === 0) {
    return [''];
  }
  const formattedParts = [];
  let unitIndex = 1;
  if (/^\d{1,2}\/\d{1,2}$/i.test(initialParts[0])) {
    formattedParts.push(initialParts[0]);
  } else if (/^\d{1,10}$/.test(initialParts[0])) {
    if (initialParts[1] && /^\d{1,2}\/\d{1,2}$/i.test(initialParts[1])) {
      formattedParts.push(initialParts[0] + ' ' + initialParts[1]);
      unitIndex = 2;
    } else {
      formattedParts.push(initialParts[0]);
    }
  } else {
    console.error('Errorneous amount: ' + initialParts[0]);
    return [];
  }

  if (initialParts[unitIndex]) {
    if (/^[a-zA-ZöÖåÅäÄ]{1,10}$/gm.test(initialParts[unitIndex])) {
      formattedParts.push(initialParts[unitIndex]);
    } else {
      console.error('Errorneous unit: ' + initialParts[unitIndex]);
      return [];
    }
  }

  if (initialParts[unitIndex + 1]) {
    formattedParts.push(initialParts.slice(unitIndex + 1, initialParts.length).join(' '));
  }

  return formattedParts.slice(0, 3);
};

export const amountParser = (amount: string): number => {
  let parts = amount.split(' ');
  parts = parts.filter(i => i !== '');
  if (parts.length === 1) {
    return parseInt(amount);
  } else if (parts.length === 2) {
    if (/^\d{1,2}\/\d{1,3}$/i.test(parts[1])) {
      try {
        const split = parts[1].split('/');
        const num = parseInt(split[0]);
        const dem = parseInt(split[1]);
        const dec = num / dem;
        return parseInt(parts[0]) + dec;
      } catch (e) {
        return 0;
      }
    } else {
      return 0;
    }
  }
  return 0;
};

export const mockCreate = async (name: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id: 99, name }), 500);
  });
};
