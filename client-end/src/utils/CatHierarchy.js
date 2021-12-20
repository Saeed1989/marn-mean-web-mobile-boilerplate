export const getSelectedCatList = (catList, catSku) => {
  const selectedCatList = catList.filter((cat) => {
    return cat.parentSku === catSku;
  });
  return selectedCatList;
};
