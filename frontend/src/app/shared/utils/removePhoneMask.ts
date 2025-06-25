export const removePhoneMask = (value: string) => {
  return value.replace(/\D/g, '');
};
