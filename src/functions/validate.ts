// Types
import { Delivery } from '../types/Delivery';
import { User } from '../types/User';

export function validate(value: string, validationType: string): boolean {
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

    case 'date': {
      valid = value !== 'undefined';
      break;
    }

    default:
      valid = false;
  }

  return valid;
}

export function validateAddress(address: string, delivery: Delivery): boolean | null {
  return address === '' && delivery.address === ''
    ? null
    : address === delivery.address && delivery.deliverable;
}

export function validateAll(values: User, valid: boolean | null) {
  let allValidated = {};
  let allValid = true;

  Object.keys(valid).forEach((element) => {
    const validity = validate(values[element], element);
    allValidated = { ...allValidated, [element]: validity };
    allValid = allValid && (validity === true || validity === null);
  });

  return [allValid, allValidated];
}
