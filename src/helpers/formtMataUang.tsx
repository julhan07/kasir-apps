export const FormatMataUang = (param) => {
  return param.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
