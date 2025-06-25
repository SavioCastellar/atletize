export const normalizePhoneNumber = (value: string) => {
  let justNumbers = value.replace(/\D/g, '');

  if (justNumbers.length <= 2) {
    return `(${justNumbers}`;
  } else if (justNumbers.length <= 6) {
    return justNumbers.replace(/(\d{2})(\d{0,4})/, '($1) $2');
  } else if (justNumbers.length <= 10) {
    return justNumbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    return justNumbers.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
  }
};
