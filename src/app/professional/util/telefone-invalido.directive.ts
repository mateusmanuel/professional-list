import { AbstractControl, ValidatorFn } from '@angular/forms';

export function telefoneValidator(regexp: RegExp): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {
        const valido = regexp.test(control.value);
        return !valido ? {formatoInvalido: {value: control.value}} : null;
    };
}
