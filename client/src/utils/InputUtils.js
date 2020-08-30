/**
 * Make a normal <Input> behave as if it is an input accepting only numbers
 *
 * @param e eventObject
 * @param formRef ref of form that contains the input
 * @param inputName name of input on which the util has to be run
 */
const imitateNumberInput = (e, formRef, inputName) => {
  const { value } = e.target;

  if (/^-?\d*(\.\d*)?$/.test(value) || value === '' || value === '-') {
    formRef.current.setFieldsValue({
      [inputName]: value,
    });
  } else {
    formRef.current.setFieldsValue({
      [inputName]: value.slice(0, -1),
    });
  }
};

/**
 * Make a normal <Input> behave as if it is an input accepting only mobile numbers
 *
 * @param e eventObject
 * @param formRef ref of form that contains the input
 * @param inputName name of input on which the util has to be run
 */
const imitateContactNumberInput = (e, formRef, inputName) => {
  const { value } = e.target;
  if (/^\d{0,9}$/.test(value)) {
    formRef.current.setFieldsValue({
      [inputName]: value,
    });
  } else {
    formRef.current.setFieldsValue({
      [inputName]: value.slice(0, -1),
    });
  }
};

/**
 * Format the value of an input to show two decimal values
 *
 * @param e eventObject
 * @param formRef ref of form that contains the input
 * @param inputName name of input on which the util has to be run
 */
const formatValue = (e, formRef, inputName) => {
  let { value } = e.target;

  if (!value || value === '-' || value === '.') {
    value = 0;
  } else if (value.charAt(value.length - 1) === '.') {
    value = value.slice(0, -1);
  }

  formRef.current.setFieldsValue({
    [inputName]: parseFloat(value).toFixed(2),
  });
};

export {
  imitateNumberInput,
  imitateContactNumberInput,
  formatValue,
};
