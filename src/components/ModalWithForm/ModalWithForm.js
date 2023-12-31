import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText = "",
  altButtonText,
  title,
  name,
  onClose,
  onSubmit,
  handleAltClick,
  isValid,
}) {
  const buttonClassName = isValid
    ? "modal__submit-btn modal__submit-btn-valid"
    : "modal__submit-btn";

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__container">
        <button
          className="modal__close"
          id="close-add-modal"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} className="modal__form" name={`${name}`}>
          {children}

          <button type="submit" className={buttonClassName} disabled={!isValid}>
            {buttonText}
          </button>
          <p className="modal__alt-button-text">
            or
            <button
              className="modal__alt-button"
              type="button"
              onClick={handleAltClick}
            >
              {altButtonText}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
