export const roundOffNumber = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
