// Types
import { User } from '../types/User';

interface Values {
  [key: string]: string | boolean | null
}
export function validate(values: Values, validationType: string, prevState?: string | boolean | null): boolean | null {
  const value = values[validationType];
  let valid;

  switch (validationType) {
    case 'name': {
      const re = /^[a-zA-ZÀ-ƶ '-]{1,}$/;
      valid = typeof value === 'string' && re.test(value);
      break;
    }

    case 'email': {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      valid = typeof value === 'string' && re.test(value);
      break;
    }

    case 'telephone': {
      if (typeof value === 'string') {
        const phoneNumber = value.replace(/-/g, '').replace(/ /g, '').replace('(', '').replace(')', '');
        if ((phoneNumber.charAt(0) !== '0' && phoneNumber.charAt(0) !== '+') || phoneNumber.length < 10) {
          valid = false;
        } else {
          const re = /[^0-9+]/;
          valid = !re.test(phoneNumber);
        }
      } else {
        valid = false;
      }
      break;
    }

    case 'address': {
      if (values.allCollections || (prevState === null && values.address === '')) {
        valid = null;
      } else {
        // Check that verified address has been set
        valid = values.verifiedAddress !== ''
             // And check that the address is equal to the verified address
             && values.verifiedAddress === values.address
             // And check that the deliverable flag is set
             && values.deliverable as boolean;
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

  return valid;
}

export function validateAll(values: Values, valid: boolean | null) {
  let allValidated = {};
  let allValid = true;

  Object.keys(valid).forEach((element) => {
    const validity = validate(values, element, true);
    allValidated = { ...allValidated, [element]: validity };
    allValid = allValid && (validity === true || validity === null);
  });

  return [allValid, allValidated];
}
