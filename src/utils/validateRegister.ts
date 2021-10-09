import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Das Passwort muss mindestens 3 Zeichen haben",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Der Nutzername muss mindestens 3 Zeichen haben",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Der Nutzername darf kein @ enthalten",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Diese Email ist ungültig",
      },
    ];
  }
  if (options.username === options.password) {
    return [
      {
        field: "password",
        message: "Dein Password darf nicht gleich dein Nutzername sein",
      },
    ];
  }

  return null;
};
