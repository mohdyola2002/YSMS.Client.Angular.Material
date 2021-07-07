import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../MyErrorStateMatcher';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { StudentService } from './student.service';
import { IStudent } from './student';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

function inputMatcher(control1: string, control2: string): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    let firstControl = c.get(control1);
    let secondControl = c.get(control2);
    if (firstControl?.pristine || secondControl?.pristine) {
      return null;
    }
    if (firstControl?.value == secondControl?.value) {
      return null;
    }
    return { match: true };
  };
}

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css'],
})
export class AddStudentDialogComponent implements OnInit {
  studentForm!: FormGroup;
  student!: IStudent;
  hide = true;
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      regNo: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      secondName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      lga: ['', Validators.required],
      stateOfOrigin: ['', Validators.required],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required, Validators.email]],
        },
        { validator: inputMatcher('email', 'confirmEmail') }
      ),
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validator: inputMatcher('password', 'confirmPassword') }
      ),
      fatherId: 0,
      motherId: 0,
      dateOfAdmission: ['', Validators.required],
      sessionAdmitted: ['', Validators.required],
      class: ['', Validators.required],
    });
    console.log(this.studentForm);
  }

  registerStudent(): void {
    if (this.studentForm.valid) {
      if (this.studentForm.dirty) {
        this.student = {
          studentId: 0,
          regNo: this.studentForm.value.regNo,
          firstName: this.studentForm.value.firstName,
          secondName: this.studentForm.value.secondName,
          lastName: this.studentForm.value.lastName,
          gender: this.studentForm.value.gender,
          email: this.studentForm.value.emailGroup.email,
          phone: this.studentForm.value.phone,
          dateOfBirth: this.studentForm.value.dateOfBirth,
          address: this.studentForm.value.address,
          lga: this.studentForm.value.lga,
          dateOfAdmission: this.studentForm.value.dateOfAdmission,
          sessionAdmitted: this.studentForm.value.sessionAdmitted,
          nationality: this.studentForm.value.nationality,
          stateOfOrigin: this.studentForm.value.stateOfOrigin,
          fatherId: this.studentForm.value.fatherId,
          motherId: this.studentForm.value.motherId,
          password: this.studentForm.value.passwordGroup.password,
        }
        this.studentService.createStudent(this.student).subscribe(
          (data) => console.log(JSON.stringify(data)),
          (error: Response) => console.log(`Error: ${error}`),
          () => console.log("Completed")
        )
      }
    } else {
    }
    console.log(this.studentForm);
    console.log(this.studentForm.value);
  }
}
