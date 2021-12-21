import { Modal, Button } from "react-bootstrap";

export const YesNoModal = (props) => {
  const { result, message } = props;

  const handleNo = () => {
    result && result(false);
  };

  const handleYes = () => {
    result && result(true);
  };

  return (
    <div>
      <Modal show={props.isShow} onHide={handleNo} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNo}>
            No
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
