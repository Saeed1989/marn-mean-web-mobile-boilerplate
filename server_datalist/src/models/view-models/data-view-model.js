class DataViewModel {
  static convert = (data) => {
    const viewModel = Object.create(data);
    const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
    return rest;
  };
}

module.exports.DatatViewModel = DataViewModel;
