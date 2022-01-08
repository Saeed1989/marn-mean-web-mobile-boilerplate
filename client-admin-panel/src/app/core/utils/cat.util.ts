/**
 *
 */
export class CatagoryUtil {
  /**
   *
   * @param catList
   * @param catSku
   * @returns
   */
  public static getSelectedCatList(catList, catSku) {
    const selectedCatList = catList.filter((cat) => {
      return cat.parentSku === catSku;
    });
    return selectedCatList;
  }

  /**
   *
   * @param catList
   * @returns
   */
  public static getCatHierarchy(catList) {
    let catHierarchy = '';
    if (!catList || !catList.length || catList.length <= 0) {
      return catHierarchy;
    }

    catList.forEach((cat) => {
      catHierarchy = catHierarchy + '/' + cat.sku;
    });

    return catHierarchy;
  }

  public static getCatListHierarchy(catList, catSku) {
    const resultList = []
    const cat =  catList.find(cat=> cat.catSku === catSku);
    if(cat && cat.parentSku) {
      resultList.push(this.getCatListHierarchy(catList, cat.parentSku));
    } else if(cat) {
      resultList.push(cat);
    }

    return resultList;
  }
}
