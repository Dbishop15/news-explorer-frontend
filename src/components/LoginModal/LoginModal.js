import React, { useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function LoginModal({
  isOpen,
  handleCloseModal,
  handleSignIn,
  isLoading,
  altButtonText,
  altClick,
}) {
  const {
    values,
    handleChange,
    setValues,
    isFormValid,
    setIsFormValid,
    isInvalid,
  } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen === true) {
      setValues({
        email: "",
        password: "",
      });
    }
  }, [isOpen, setValues]);

  useEffect(() => {
    if (Object.values(isInvalid).every((item) => item === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isInvalid, setIsFormValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSignIn(values);
  };

  // const [email, setEmail] = useState("");
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };
  // const [password, setPassword] = useState("");
  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onSignIn({ email, password });
  // }

  // useEffect(() => {
  //   if (isOpen === true) {
  //     setEmail("");
  //     setPassword("");
  //   }
  // }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      onClose={handleCloseModal}
      isOpen={isOpen}
      buttonText={isLoading ? "Signing in..." : "Sign in"}
      altButtonText={altButtonText}
      handleAltClick={altClick}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" id="email-label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="input-email"
        className="modal__input modal__input_type_login-emial"
        placeholder="Enter email"
        required
        // onChange={handleEmailChange}
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
        className="modal__input modal__input_type_login-password"
        placeholder="Enter password"
        required
        // onChange={handlePasswordChange}
        onChange={handleChange}
      />
      {isInvalid.password && (
        <span className="modal__input-error modal__input-error-password">
          Invalid password
        </span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
