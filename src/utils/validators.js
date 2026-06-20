/**
 * Validates an email address structure.
 */
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a standard 10-digit Indian phone number (optionally with country code).
 */
export const validatePhone = (phone) => {
  const re = /^(\+91[\-\s]?)?[0-9]{10}$/;
  return re.test(String(phone).replace(/\s/g, ''));
};

/**
 * Checks if the blood group is valid.
 */
export const validateBloodGroup = (bloodGroup) => {
  const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validGroups.includes(String(bloodGroup).toUpperCase());
};

/**
 * Checks password strength (simple requirement of min length 6).
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};
