import {
  getCatHierarchy,
  getSelectedCatList,
} from '../../src/utils/catHierarchy/catHierarchy';

beforeAll(async () => null);

afterEach(async () => null);

afterAll(async () => null);

describe('catHierarchy', () => {
  it('should return the empty array when getSelectedCatList with parentSku that is not in the list', () => {
    const catList = getSelectedCatList(
      [
        {
          parentSku: 'match',
        },
        {
          parentSku: 'match',
        },
        {
          parentSku: 'third',
        },
        {
          parentSku: 'fourth',
        },
      ],
      'unknown',
    );
    console.log(catList);
    expect(catList.length).toBe(0);
  });

  it('should return the cat list when getSelectedCatList with parentSku match in the list', () => {
    const catList = getSelectedCatList(
      [
        {
          parentSku: 'match',
        },
        {
          parentSku: 'match',
        },
        {
          parentSku: 'third',
        },
        {
          parentSku: 'fourth',
        },
      ],
      'match',
    );
    expect(catList.length).toBe(2);
  });

  it('should return empty string when getCatHierarchy with null', () => {
    const catHi = getCatHierarchy(null);
    expect(catHi).toBe('');
  });

  it('should return CatHierarchy string when getCatHierarchy with cat list', () => {
    const catHi = getCatHierarchy([
      {
        sku: 'first',
      },
      {
        sku: 'second',
      },
      {
        sku: 'third',
      },
    ]);
    expect(catHi).toBe('/first/second/third');
  });
});
