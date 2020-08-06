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
    console.log("Esperava mais um argumento =[ (teachers ou students)");
    break;
}
