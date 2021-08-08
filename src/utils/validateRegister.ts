import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater than 2",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include @",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid Email",
      },
    ];
  }

  return null;
};