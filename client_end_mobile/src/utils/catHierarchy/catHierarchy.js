export const getSelectedCatList = (catList, catSku) => {
  const selectedCatList = catList.filter(cat => {
    return cat.parentSku === catSku;
  });
  return selectedCatList;
};

export const getCatHierarchy = catList => {
  let catHierarchy = '';
  if (!catList || !catList.length || catList.length <= 0) {
    return catHierarchy;
  }

  catList.forEach(cat => {
    catHierarchy = catHierarchy + '/' + cat.sku;
  });

  return catHierarchy;
};
