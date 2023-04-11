import { FormGroup } from '@angular/forms';
import { Address } from '../domain/services/address.service';

export function confirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['confirmPassword']) {
      // retorna se outro validador já encontrou um erro em matchingControl
      return;
    }

    // define o erro confirmPassword se os valores dos dois campos são diferentes
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPassword: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function addressValidator(address: Address | null) {
  return (formGroup: FormGroup) => {
    if (!address) {
      formGroup.controls['cep'].setErrors({ invalidCep: true });
    }
    else{
      formGroup.controls['cep'].setErrors(null);
    }
  }
}

export function passwordValidator() {
  return (formGroup: FormGroup) => {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberPattern = /[0-9]/;
    const control = formGroup.controls['password']
    if (
      control.value &&
      (!upperCasePattern.test(control.value) ||
        !lowerCasePattern.test(control.value) ||
        !specialCharPattern.test(control.value) ||
        !numberPattern.test(control.value))
    ) {
      return control.setErrors({ passwordInvalid: true });
    }

    return control.setErrors(null);
  }
}