export interface IStudentDto {
  studentId: number;
  regNo: string;
  firstName: string;
  secondName: string;
  lastName: string;
  gender: string;
}
export interface IStudent {
  studentId: number;
  regNo: string;
  firstName: string;
  secondName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  lga: string;
  nationality: string;
  address: string;
  sessionAdmitted: string;
  dateOfAdmission: string;
  password: string;
  phone: string;
  email: string;
  fatherId: number;
  motherId: number;
}
export interface IStudents {
  students: IStudent[];
  numberOfStudents: number;
  totalStudents: number;
}
