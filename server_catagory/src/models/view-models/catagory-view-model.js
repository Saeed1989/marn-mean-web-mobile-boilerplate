class CatagoryViewModel {
  static convert = (catagory) => {
    const viewModel = Object.create(catagory);
    const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
    return rest;
  };
}

module.exports.CatagoryViewModel = CatagoryViewModel;
