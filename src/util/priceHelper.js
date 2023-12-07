function addComma(price) {
  const [interger, decimal] = price.toString().split(".");
  const regEx = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
  const formattedInteger = interger.replace(regEx, ",");

  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
}

export default addComma;
