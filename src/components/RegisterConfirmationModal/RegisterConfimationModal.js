import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterConfirmationModal({
  isOpen,
  handleCloseModal,
  isLoading,
  altButtonText,
  altClick,
}) {
  return (
    <ModalWithForm
      title="Registration SuccessFully"
      name="confirm-signup"
      onClose={handleCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Siging up..." : "Sign up"}
      altButtonText={altButtonText}
      handleAltClick={altClick}
    ></ModalWithForm>
  );
}

export default RegisterConfirmationModal;
