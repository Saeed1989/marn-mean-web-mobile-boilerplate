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
      className={"modal fade " + (isShow ? "show" : "")}
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      style={isShow ? { display: "block" } : null}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmation!</h5>
            <button type="button" className="close" onClick={handleNo}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleNo}>
              NO
            </button>
            <button type="button" className="btn btn-primary" onClick={handleYes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
