module.exports.getSearchCriteria = (targetRexExp, priceRange) => {
  const { minPrice, maxPrice } = priceRange;
  const priceCriteria = [
    {
      price: { $gte: minPrice },
    },
    {
      price: { $lte: maxPrice },
    },
  ];
  const targetCriteria = [
    {
      category: { $regex: targetRexExp },
    },
    {
      brand: { $regex: targetRexExp },
    },
    {
      describtion: { $regex: targetRexExp },
    },
    {
      model: { $regex: targetRexExp },
    },
  ];
  return { targetCriteria, priceCriteria };
};
