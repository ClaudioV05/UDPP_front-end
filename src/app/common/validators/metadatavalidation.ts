import { FormControl, ValidationErrors } from "@angular/forms";

export class MetadataValidation {
    public static notOnlyWhitespace(control: FormControl): ValidationErrors {
        if ((control.value != null) && (control.value.trim().length === 0)) {
            return { 'notOnlyWhiteSpace': true };
        }
        else {
            return {};
        }
    }
}