import { createStudent } from "./createStudent";
import { createTeacher } from "./createTeacher";
import { TEACHER_FACULTY } from "./interfaces/teacherInterface";

createStudent("Primeiro Estudante", "primeiro@estudante.com", "11/11/1999", [
  "estudar",
  "programar",
]);
createStudent("Segundo Estudante", "segundo@estudante.com", "11/11/1990", [
  "pedalar",
  "comer",
]);

createTeacher("Primeiro Professor", "primeiro@professor.com", "22/02/1980", [
  TEACHER_FACULTY.BACKEND,
  TEACHER_FACULTY.OOP,
]);

createTeacher("Segundo Professor", "segundo@professor.com", "22/02/1988", [
  TEACHER_FACULTY.CSS,
  TEACHER_FACULTY.REACT,
  TEACHER_FACULTY.REDUX,
]);
