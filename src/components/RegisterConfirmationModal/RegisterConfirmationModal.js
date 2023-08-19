import "./RegisterConfirmationModal.css";

function RegisterConfirmationModal({ onClose, onLoginButton }) {
  return (
    <div className="modal confirm-modal">
      <div className="confirm-modal__container">
        <button
          className="confirm-modal__close"
          id="close-add-modal"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="confirm-modal__title">
          Registration successfully completed!
        </h3>
        <button
          className="confirm-modal__alt-button"
          type="button"
          onClick={onLoginButton}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterConfirmationModal;
