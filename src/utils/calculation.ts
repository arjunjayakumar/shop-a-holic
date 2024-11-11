export const roundOffNumber = (num: number) => {
  return num.toFixed(2);
  //   return Math.round((num + Number.EPSILON) * 100) / 100;
};
