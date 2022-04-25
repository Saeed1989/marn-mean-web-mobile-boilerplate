class AlertViewModel {
  static convert = (alert) => {
    const viewModel = Object.create(alert);
    const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
    return rest;
  };
}

module.exports.AlertViewModel = AlertViewModel;
