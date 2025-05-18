export const nameBuilder = (fullName: string) => {
  if (!fullName || typeof fullName !== "string") {
    return;
  }

  const parts = fullName.trim().split(/\s+/); //splitted by one o more spaces

  if (parts.length >= 3) {
    return {
      firstName: parts[0],
      middleName: parts[1],
      lastName: parts.slice(2).join(" "),
    };
  } else if (parts.length === 2) {
    return {
      firstName: parts[0],
      middleName: "",
      lastName: parts[1],
    };
  } else if (parts.length === 1) {
    return {
      firstName: parts[0],
      middleName: "",
      lastName: "",
    };
  }

  return {
    firstName: "",
    middleName: "",
    lastName: "",
  };
};
