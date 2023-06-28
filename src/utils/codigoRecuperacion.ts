export const generarCodigo = () => {
  const { round, random } = Math;
  const min = 10000000;
  const max = 99999999;
  return round(random() * (max - min)) + min;
};
