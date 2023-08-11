import React, { useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onSignUp,
  handleCloseModal,
  isLoading,
  altButtonText,
  altClick,
}) {
  const { handleChange, isFormValid, setIsFormValid, isInvalid } = useForm({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (Object.values(isInvalid).every((item) => item === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isInvalid, setIsFormValid]);

  return (
    <ModalWithForm
      title="Sign up"
      name="singUp"
      onClose={handleCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Siging up..." : "Sign up"}
      altButtonText={altButtonText}
      handleAltClick={altClick}
      isFormValid={isFormValid}
    >
      <label className="modal__label" id="email-label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="input-email"
        className="modal__input modal__input_type_signup-emial"
        placeholder="Enter email"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
      />
      {isInvalid.email && (
        <span className="modal__input-error modal__input-error-email">
          Invalid email address
        </span>
      )}

      <label className="modal__label" id="password-label">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="input-password"
        className="modal__input modal__input_type_signup-password"
        placeholder="Enter password"
        minLength="3"
        maxLength="30"
        required
        onChange={handleChange}
      />
      {isInvalid.password && (
        <span className="modal__input-error modal__input-error-password">
          Invalid password: must be a string with a minimum length of 3 and a
          maximum length of 30.
        </span>
      )}

      <label className="modal__label" id="name-label">
        Username
      </label>
      <input
        type="text"
        name="name"
        id="input-name"
        className="modal__input modal__input_type_signup-name"
        placeholder="Enter your username"
        minLength="1"
        maxLength="30"
        required
        onChange={handleChange}
      />
      {isInvalid.name && (
        <span className="modal__input-error modal__input-error-username">
          Invalid username: must be a string with a minimum length of 1 and a
          maximum length of 30.
        </span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
