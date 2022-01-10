import { Catagory } from '../modles/catagory.model';

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

  public static getCatListStructure(
    catList: Catagory[],
    parentSku: string = '',
    catHierarchy: string = ''
  ): any {
    const newCatList: Catagory[] = catList.filter((cat) => {
      return cat.parentSku === parentSku;
    });

    if (!newCatList || newCatList.length === 0) return null;

    return newCatList.map((cat) => {
      const hierarcy = `${catHierarchy}/${cat.sku}`;
      return {
        name: cat.catName,
        sku: cat.sku,
        catHierarchy: hierarcy,
        catagory: cat,
        sub: this.getCatListStructure(catList, cat.sku, hierarcy),
      };
    });
  }
}
