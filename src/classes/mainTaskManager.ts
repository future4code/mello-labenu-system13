import { TEACHER_FACULTY } from "../interfaces/teacherInterface";
import { Student } from "./student";
import { UsersManager } from "./usersManager";
import * as colors from "colors";
import { Teacher } from "./teacher";
import { MissionManager } from "./missionManager";

export abstract class MainTaskManager {
  public static exec = () => {
    UsersManager.createTeacher(
      "Primeiro Professor",
      "primeiro@professor.com",
      "22/02/1980",
      [TEACHER_FACULTY.BACKEND, TEACHER_FACULTY.OOP]
    );

    UsersManager.createTeacher(
      "Segundo Professor",
      "segundo@professor.com",
      "22/02/1998",
      [TEACHER_FACULTY.CSS, TEACHER_FACULTY.REACT, TEACHER_FACULTY.REDUX]
    );

    UsersManager.createTeacher(
      "Terceiro Professor",
      "terceiro@professor.com",
      "22/02/1980",
      [TEACHER_FACULTY.TESTES, TEACHER_FACULTY.TYPESCRIPT]
    );

    UsersManager.createTeacher(
      "Quarto Professor",
      "quarto@professor.com",
      "22/02/1988",
      [
        TEACHER_FACULTY.BACKEND,
        TEACHER_FACULTY.CSS,
        TEACHER_FACULTY.OOP,
        TEACHER_FACULTY.REACT,
        TEACHER_FACULTY.REDUX,
        TEACHER_FACULTY.TESTES,
        TEACHER_FACULTY.TYPESCRIPT,
      ]
    );

    UsersManager.createStudent(
      "Primeiro Estudante",
      "primeiro@estudante.com",
      "11/11/1999",
      ["estudar", "programar"]
    );

    UsersManager.createStudent(
      "Segundo Estudante",
      "segundo@estudante.com",
      "11/11/1990",
      ["pedalar", "comer"]
    );
    MissionManager.createFullTimeMission(
      "FullTimeMission",
      "10/10/2020",
      "10/12/2021"
    );
    MissionManager.createNightMission(
      "NightMission-na-night",
      "10/11/2020",
      "10/12/2021"
    );
    MissionManager.addTeacherToMission(0, 0);
    MissionManager.addTeacherToMission(1, 0);
    MissionManager.addTeacherToMission(2, 1);
    MissionManager.addTeacherToMission(3, 1);
    MissionManager.addStudentToMission(0, 0);
    MissionManager.addStudentToMission(1, 1);
  };

  public static printAllStudents = (): void => {
    for (const mission of MissionManager.getMissions()) {
      for (const student of mission.getStudents()) {
        console.log(
          colors.bgBlack.bold("Nome:".padEnd(10) + student.getName().padEnd(50))
        );
        console.log(
          colors.bgBlack.bold(
            "Email:".padEnd(10) + student.getEmail().padEnd(50)
          )
        );
        console.log(
          colors.bgBlack.bold(
            "Curso:".padEnd(10) +
              "Web Full Stack " +
              (mission.getName().match(/(-na-night)$/)
                ? "Noturno"
                : "Integral"
              ).padEnd(35)
          )
        );
        console.log(
          colors.bgBlack.bold(
            "Turma:".padEnd(10) +
              mission
                .getName()
                .replace(/(-na-night)$/, "")
                .padEnd(50)
          )
        );
        console.log(
          colors.bgBlack.bold(
            "Idade:".padEnd(10) + student.getAge().toString().padEnd(50) + "\n"
          )
        );
      }
    }
  };

  public static printAllTeachers = (): void => {
    const teachers: Teacher[] = UsersManager.getTeachersList();
    for (const teacher of teachers) {
      console.log(
        colors.bgBlack.bold("Nome:".padEnd(10) + teacher.getName().padEnd(60))
      );
      console.log(
        colors.bgBlack.bold("Email:".padEnd(10) + teacher.getEmail().padEnd(60))
      );
      console.log(
        colors.bgBlack.bold(
          "Idade:".padEnd(10) + teacher.getAge().toString().padEnd(60)
        )
      );
      console.log(
        colors.bgBlack.bold(
          "Especialidades: " +
            teacher.getFaculties().join(", ").padEnd(54) +
            "\n"
        )
      );
    }
  };
}
