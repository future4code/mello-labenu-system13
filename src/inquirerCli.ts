import * as inquirer from "inquirer";
// import { UsersManager } from "./usersManager";
// import { createUser } from "./createUser";

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
                message: "Digite os hobbies:",
              },
            ])
            .then((answers) => {
              // createUser(answers.name, answers.email, answers.birthday);
            });
          break;
        }
        case "Criar docente": {
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
                name: "faculties",
                message: "Digite as especialidades:",
              },
            ])
            .then((answers) => {});
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
                name: "startDate",
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
          inquirer
            .prompt([
              {
                type: "list",
                name: "student",
                message: "Escolha o estudante:",
                choices: ["estudante1", "estudante2"],
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
            .then((answers) => {});
          break;
        }
        default:
          break;
      }
    });
}
