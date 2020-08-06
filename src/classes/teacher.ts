import { User } from "./user";
import {
  TeacherInterface,
  TEACHER_FACULTY,
} from "../interfaces/teacherInterface";

export class Teacher extends User implements TeacherInterface {
  constructor(
    id: number,
    name: string,
    email: string,
    birthDate: string,
    public faculties: TEACHER_FACULTY[]
  ) {
    super(id, name, email, birthDate);
  }
  getFaculties = (): TEACHER_FACULTY[] => this.faculties;
}
