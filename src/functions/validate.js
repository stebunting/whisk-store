export function validate(values, validationType, prevState) {
  const value = values[validationType];
  let valid;

  switch (validationType) {
    case 'name': {
      const re = /^[a-zA-ZÀ-ƶ '-]{1,}$/;
      valid = re.test(value);
      break;
    }

    case 'email': {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = re.test(value);
      break;
    }

    case 'telephone': {
      const phoneNumber = value.replace(/-/g, '').replace(/ /g, '').replace('(', '').replace(')', '');
      if ((phoneNumber.charAt(0) !== '0' && phoneNumber.charAt(0) !== '+') || phoneNumber.length < 10) {
        valid = false;
      } else {
        const re = /[^0-9+]/;
        valid = !re.test(phoneNumber);
      }
      break;
    }

    case 'address': {
      if (values.deliveryType === 'collection' || (prevState === null && values.address === '')) {
        valid = null;
      } else {
        // First check whether it is set to collection
        valid = values.deliveryType === 'collection'
            // Check that verified address has been set
            || (values.verifiedAddress !== ''
            // And check that the address is equal to the verified address
            && values.verifiedAddress === values.address
            // And check that the deliverable flag is set
            && values.deliverable);
      }
      break;
    }

    case 'date': {
      valid = value !== 'undefined';
      break;
    }

    default:
      valid = false;
  }

  return [valid, { [validationType]: valid }];
}

export function validateAll(values, valid) {
  let allValidated = {};
  let allValid = true;

  Object.keys(valid).forEach((element) => {
    const [validity, validObject] = validate(values, element, true);
    allValidated = { ...allValidated, ...validObject };
    allValid = allValid && (validity === true || validity === null);
  });

  return [allValid, allValidated];
}
