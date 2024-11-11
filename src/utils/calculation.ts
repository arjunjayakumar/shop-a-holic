export const roundOffNumber = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const calculateOriginalPrice = (
  price: number,
  quantity: number,
  discountPercentage: number
): number => {
  const totalDiscountedPrice = price * quantity;
  const originalPrice = totalDiscountedPrice / (1 - discountPercentage / 100);
  return roundOffNumber(originalPrice);
};
