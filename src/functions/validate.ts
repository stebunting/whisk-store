// Types
import { Delivery } from '../types/Delivery';
import { FormValidity } from '../types/FormValidity';
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
  return !delivery.deliveryRequired || (address === '' && delivery.address === '')
    ? null
    : address === delivery.address && delivery.deliverable;
}

export function validateAll(
  user: User, delivery: Delivery, validity: FormValidity
): [boolean, FormValidity] {
  let allValidated = {};
  let allValid = true;

  // Validate Non-Address Components
  Object.keys(validity).forEach((element) => {
    const itemValidity = element === 'address'
      ? validateAddress(user[element], delivery)
      : validate(user[element], element);
    allValidated = { ...allValidated, [element]: itemValidity };
    allValid = allValid && (itemValidity === true || itemValidity === null);
  });

  return [allValid, allValidated as FormValidity];
}
