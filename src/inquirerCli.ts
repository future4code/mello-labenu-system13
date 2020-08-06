import * as inquirer from "inquirer";
import { createStudent } from "./createStudent";
import { createTeacher } from "./createTeacher";
import { TEACHER_FACULTY } from "./interfaces/teacherInterface";
import { UsersManager } from "./classes/usersManager";
import { MainTaskManager } from "./classes/mainTaskManager";
import { Student } from "./classes/student";
import { Teacher } from "./classes/teacher";

inquirerCli();

export function inquirerCli() {
  inquirer
    .prompt({
      type: "list",
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
              createStudent(
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
              createTeacher(
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
                name: "finishDate",
                message: "Digite a data de termino:",
                validate: (val) =>
                  val.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/gm)
                    ? true
                    : "Formato invalido",
              },
            ])
            .then((answers) => {});
          break;
        }
        case "Adicionar estudante na turma": {
          const students: Student[] = UsersManager.getStudentsList();
          const studentsOptions = students.map((item) => item.getName());
          inquirer
            .prompt([
              {
                type: "list",
                name: "student",
                message: "Escolha o estudante:",
                choices: studentsOptions,
              },
              {
                type: "list",
                name: "class",
                message: "Escolha a turma:",
                choices: ["Mello", "Turing"],
              },
            ])
            .then((answers) => {
              console.log(answers);
            });
          break;
        }
        case "Adicionar docente na turma": {
          inquirer
            .prompt([
              {
                type: "list",
                name: "teacher",
                message: "Escolha o estudante:",
                choices: ["Soter", "Amanda"],
              },
              {
                type: "list",
                name: "class",
                message: "Escolha a turma:",
                choices: ["Mello", "Turing"],
              },
            ])
            .then((answers) => {});
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
