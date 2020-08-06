import { createStudent } from "../createStudent";
import { createTeacher } from "../createTeacher";
import { TEACHER_FACULTY } from "../interfaces/teacherInterface";
import { Student } from "./student";
import { UsersManager } from "./usersManager";
import * as colors from "colors";
import { Teacher } from "./teacher";

export abstract class MainTaskManager {
  public static exec = () => {
    createStudent(
      "Primeiro Estudante",
      "primeiro@estudante.com",
      "11/11/1999",
      ["estudar", "programar"]
    );
    createStudent("Segundo Estudante", "segundo@estudante.com", "11/11/1990", [
      "pedalar",
      "comer",
    ]);

    createTeacher(
      "Primeiro Professor",
      "primeiro@professor.com",
      "22/02/1980",
      [TEACHER_FACULTY.BACKEND, TEACHER_FACULTY.OOP]
    );

    createTeacher("Segundo Professor", "segundo@professor.com", "22/02/1988", [
      TEACHER_FACULTY.CSS,
      TEACHER_FACULTY.REACT,
      TEACHER_FACULTY.REDUX,
    ]);
  };

  public static printAllStudents = (): void => {
    const students: Student[] = UsersManager.getStudentsList();
    for (const student of students) {
      console.log(
        colors.bgBlack.bold("Nome:".padEnd(10) + student.getName().padEnd(50))
      );
      console.log(
        colors.bgBlack.bold("Email:".padEnd(10) + student.getEmail().padEnd(50))
      );
      console.log(
        colors.bgBlack.bold(
          "Idade:".padEnd(10) + student.getAge().toString().padEnd(50)
        )
      );
      console.log(
        colors.bgBlack.bold("Curso:".padEnd(10) + "Web Full Stack".padEnd(50))
      );
      console.log();
    }
  };
  public static printAllTeachers = (): void => {
    const teachers: Teacher[] = UsersManager.getTeachersList();
    for (const teacher of teachers) {
      console.log(
        colors.bgBlack.bold("Nome:".padEnd(10) + teacher.getName().padEnd(50))
      );
      console.log(
        colors.bgBlack.bold("Email:".padEnd(10) + teacher.getEmail().padEnd(50))
      );
      console.log(
        colors.bgBlack.bold(
          "Idade:".padEnd(10) + teacher.getAge().toString().padEnd(50)
        )
      );
      console.log();
    }
  };
}
