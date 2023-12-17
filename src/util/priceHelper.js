function addComma(price) {
  const [interger, decimal] = price.toString().split(".");
  const regEx = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
  const formattedInteger = Number(interger).toString().replace(regEx, ",");

  return decimal !== undefined
    ? `${formattedInteger}.${decimal}`
    : formattedInteger;
}

export default addComma;
