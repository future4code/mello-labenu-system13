import * as inquirer from "inquirer";
import { TEACHER_FACULTY } from "./interfaces/teacherInterface";
import { UsersManager } from "./classes/usersManager";
import { MainTaskManager } from "./classes/mainTaskManager";
import { Student } from "./classes/student";
import { Teacher } from "./classes/teacher";
import { Mission } from "./classes/mission";
import { MissionManager } from "./classes/missionManager";

inquirerCli();

export function inquirerCli() {
  inquirer
    .prompt({
      type: "list",
      pageSize: 10,
      name: "operation",
      message: "Escolha uma operacao:",
      choices: [
        "Criar estudante",
        "Criar docente",
        "Criar turma",
        "Adicionar estudante na turma",
        "Adicionar docente na turma",
        "Pegar idade de estudante pelo id",
        "Imprimir estudantes",
        "Imprimir professores",
        "Executar testes",
      ],
    })
    .then((res) => {
      switch (res.operation) {
        case "Criar estudante": {
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "Digite o nome:",
              },
              {
                type: "input",
                name: "email",
                message: "Digite o email:",
                validate: (val) =>
                  val.match(
                    /^([A-Za-z0-9_.\-]){1,}(@)([A-Za-z0-9_.\-]){1,}([.])([A-Za-z]){2,}/g
                  )
                    ? true
                    : "Formato invalido",
              },
              {
                type: "input",
                name: "birthday",
                message: "Digite a data de nascimento: (DD/MM/AAAA)",
                validate: (val) =>
                  val.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gm)
                    ? true
                    : "Formato invalido",
              },
              {
                type: "input",
                name: "hobbies",
                message: "Digite os hobbies separados por virgulas:",
              },
            ])
            .then((answers) => {
              UsersManager.createStudent(
                answers.name,
                answers.email,
                answers.birthday,
                answers.hobbies.split(",")
              );
            });
          break;
        }
        case "Criar docente": {
          const options = [];
          for (let faculty in TEACHER_FACULTY) {
            options.push(faculty);
          }
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "Digite o nome:",
              },
              {
                type: "input",
                name: "email",
                message: "Digite o email:",
                validate: (val) =>
                  val.match(
                    /^([A-Za-z0-9_.\-]){1,}(@)([A-Za-z0-9_.\-]){1,}([.])([A-Za-z]){2,}/g
                  )
                    ? true
                    : "Formato invalido",
              },
              {
                type: "input",
                name: "birthday",
                message: "Digite a data de nascimento: (DD/MM/AAAA)",
                validate: (val) =>
                  val.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gm)
                    ? true
                    : "Formato invalido",
              },
              {
                type: "checkbox",
                name: "faculties",
                message: "Digite as especialidades:",
                choices: options,
              },
            ])
            .then((answers) => {
              UsersManager.createTeacher(
                answers.name,
                answers.email,
                answers.birthday,
                answers.faculties
              );
            });
          break;
        }
        case "Criar turma": {
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "Digite o nome:",
              },
              {
                type: "input",
                name: "startDate",
                message: "Digite a data de inicio:",
                validate: (val) =>
                  val.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gm)
                    ? true
                    : "Formato invalido",
              },
              {
                type: "input",
                name: "endDate",
                message: "Digite a data de termino:",
                validate: (val) =>
                  val.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gm)
                    ? true
                    : "Formato invalido",
              },
            ])
            .then((answers) => {
              if (answers.name.match(/(-na-night)$/)) {
                MissionManager.createNightMission(
                  answers.name,
                  answers.startDate,
                  answers.endDate
                );
              }
              MissionManager.createFullTimeMission(
                answers.name,
                answers.startDate,
                answers.endDate
              );
            });
          break;
        }
        case "Adicionar estudante na turma": {
          const students: Student[] = UsersManager.getStudentsList();
          const studentsOptions: string[] = students.map((item) =>
            item.getName()
          );
          const missions: Mission[] = MissionManager.getMissions();
          const missionsOptions: string[] = missions.map((item) =>
            item.getName()
          );
          inquirer
            .prompt([
              {
                type: "rawlist",
                name: "studentName",
                message: "Escolha o estudante:",
                choices: studentsOptions,
              },
              {
                type: "list",
                name: "missionName",
                message: "Escolha a turma:",
                choices: missionsOptions,
              },
            ])
            .then((answers) => {
              const studentId = students
                .find((item) => item.getName() === answers.studentName)
                .getId();
              const missionId = missions
                .find((item) => item.getName() === answers.missionName)
                .getId();
              MissionManager.addStudentToMission(studentId, missionId);
            });
          break;
        }
        case "Adicionar docente na turma": {
          const teachers: Teacher[] = UsersManager.getTeachersList();
          const teachersOptions: string[] = teachers.map((item) =>
            item.getName()
          );
          const missions: Mission[] = MissionManager.getMissions();
          const missionsOptions: string[] = missions.map((item) =>
            item.getName()
          );
          inquirer
            .prompt([
              {
                type: "rawlist",
                name: "teacherName",
                message: "Escolha o professor:",
                choices: teachersOptions,
              },
              {
                type: "list",
                name: "missionName",
                message: "Escolha a turma:",
                choices: missionsOptions,
              },
            ])
            .then((answers) => {
              const teacherId = teachers
                .find((item) => item.getName() === answers.teacherName)
                .getId();
              const missionId = missions
                .find((item) => item.getName() === answers.missionName)
                .getId();
              MissionManager.addTeacherToMission(teacherId, missionId);
            });
          break;
        }
        case "Pegar idade de estudante pelo id": {
          inquirer
            .prompt({
              type: "input",
              name: "studentId",
              message: "Digite o id do estudante:",
              validate: (val) =>
                val.match(/^[0-9]+$/) ? true : "Digite um numero",
            })
            .then((answers) => {
              console.log(
                UsersManager.getStudentAgeById(Number(answers.studentId))
              );
            });
          break;
        }
        case "Imprimir estudantes": {
          MainTaskManager.printAllStudents();
          break;
        }
        case "Imprimir professores": {
          MainTaskManager.printAllTeachers();
          break;
        }
        case "Executar testes": {
          MainTaskManager.exec();
        }
        default:
          break;
      }
    });
}
