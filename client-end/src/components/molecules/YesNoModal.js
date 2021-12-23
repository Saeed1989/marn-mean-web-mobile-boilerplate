export const YesNoModal = (props) => {
  const { isShow, result, message } = props;

  const handleNo = () => {
    result && result(false);
  };

  const handleYes = () => {
    result && result(true);
  };

  return (
    <div
      class={"modal fade " + (isShow ? "show" : "")}
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      style={isShow ? { display: "block" } : null}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation!</h5>
            <button type="button" class="close" onClick={handleNo}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{message}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={handleNo}>
              NO
            </button>
            <button type="button" class="btn btn-primary" onClick={handleYes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
