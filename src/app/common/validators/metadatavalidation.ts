import { FormControl, ValidationErrors } from "@angular/forms";

export class MetadataValidation {
    public static notOnlyWhitespace(control: FormControl): ValidationErrors {
        if ((control.value != null && control.value != undefined) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhiteSpace': true };
        }
        else {
            return {};
        }
    }

    public static textContainsInicialValue(control: FormControl): ValidationErrors {
        if ((control.value != null && control.value != undefined) && (control.value.includes('This program generates'))) {
            return { 'textContainsInicialValue': true };
        }
        else {
            return {};
        }

        return {};
    }
}