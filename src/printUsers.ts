import { MainTaskManager } from "./classes/mainTaskManager";

switch (process.argv[2]) {
  case "teachers": {
    MainTaskManager.printAllTeachers();
    break;
  }
  case "students": {
    MainTaskManager.printAllStudents();
    break;
  }
  default:
    console.log("Argumento incorreto ou inexistente =[ (teachers ou students)");
    break;
}
