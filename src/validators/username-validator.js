function usernameValidator(usernameStr) {
  if (usernameStr.trim() === "")
    return {valid: false, msg: "Username cannot be empty!"};

  const usernamePattern = /^[0-9a-zA-Z_]+$/;
  if (!usernamePattern.test(usernameStr))
    return {valid: false, msg: "Username contains invalid characters!"};

  return {valid: true};
}

export default usernameValidator;