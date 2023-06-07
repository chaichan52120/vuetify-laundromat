const re_cardNumber = /^(?:\d{4})([ /.])\d{4}([ /.])\d{4}([ /.])\d{4}$/;
const re_validThrough = /^(?:\d{2})([//.])\d{2}$/;
const re_cvv = /^(?:\d{3})$/;

const defaultRules = (minNum: number = 0) => {
  return [
    requireRules,
    (v: any) =>
      v.length >= minNum || `This field must be at least ${minNum} characters.`,
  ];
};

const paymentRules = {
  cardNumber() {
    return [
      requireRules,
      (v: any) =>
        re_cardNumber.exec(v.toString())
          ? true
          : "The expected format is like #### #### #### ####",
    ];
  },
  validThrough() {
    return [
      requireRules,
      (v: any) =>
        re_validThrough.exec(v.toString())
          ? true
          : "The expected format is like ##/##",
    ];
  },
  cvv() {
    return [
      requireRules,
      (v: any) =>
        re_cvv.exec(v.toString()) ? true : "The expected format is like ###",
    ];
  },
};

const requireRules = (v: any) => !!v || `This field is required`;

export { defaultRules, paymentRules };
