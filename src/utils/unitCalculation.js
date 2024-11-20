export const getWeightInKg = metric => {
  if (!metric) return 'N/A';
  const [min, max] = metric.split(' - ').map(Number);
  return ((min + max) / 2).toFixed(1);
};

export const getHeightInFeet = metric => {
  if (!metric) return 'N/A';
  const [min, max] = metric.split(' - ').map(Number);
  const minFeet = (min / 30.48).toFixed(2);
  const maxFeet = (max / 30.48).toFixed(2);
  return `${minFeet} - ${maxFeet}`;
};
