import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return !!(
          control &&
          form &&
          control.parent &&
          control.parent.invalid &&
          (control.dirty || form.submitted)
        );
    }
    
}