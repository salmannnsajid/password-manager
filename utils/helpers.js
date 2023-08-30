export const forgetPasswordError = (error) => {
  const errorCode = error.code;

  let message = "Error sending password reset email";

  if (errorCode === "auth/invalid-email") {
    message = "Invalid email format.";
  } else if (errorCode === "auth/user-not-found") {
    message = "User with this email does not exist.";
  } else if (errorCode === "auth/unauthorized-domain") {
    message = "This operation is not allowed from your domain.";
  }
  return message;
};
