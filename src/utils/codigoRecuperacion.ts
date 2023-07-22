export const generarCodigo = () => {
  const { round, random } = Math;
  const min = 100000;
  const max = 999999;
  return round(random() * (max - min)) + min;
};

export function esContrasenaSegura(contrasena) {
  const longitudMinima = 8;
  const contieneMayuscula = /[A-Z]/.test(contrasena);
  const contieneMinuscula = /[a-z]/.test(contrasena);
  const contieneNumero = /\d/.test(contrasena);
  const contieneCaracterEspecial = /[^A-Za-z0-9]/.test(contrasena);

  return (
    contrasena.length >= longitudMinima &&
    contieneMayuscula &&
    contieneMinuscula &&
    contieneNumero &&
    contieneCaracterEspecial
  );
}

