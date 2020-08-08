import { User } from "./user";
import { Student } from "./student";
import { Teacher } from "./teacher";
import { TEACHER_FACULTY } from "../interfaces/teacherInterface";
import { JSONFileManager } from "../JSONFileManager";
import * as moment from "moment";

export abstract class UsersManager {
  private static studentsList: Student[] = JSONFileManager.readDatabase(
    "./src/students.json"
  ).map(
    (item) =>
      new Student(item.id, item.name, item.email, item.birthday, item.hobbies)
  );

  private static teachersList: Teacher[] = JSONFileManager.readDatabase(
    "./src/teachers.json"
  ).map(
    (item) =>
      new Teacher(item.id, item.name, item.email, item.birthday, item.faculties)
  );

  static getStudentsList = (): Student[] => UsersManager.studentsList;

  static getTeachersList = (): Teacher[] => UsersManager.teachersList;

  static getStudentAgeById = (id: number): number => {
    const user = UsersManager.studentsList.find((item) => item.getId() === id);
    if (user)
      return moment().diff(moment(user.getBirthday(), "DD/MM/YYYY"), "years");
    return 0;
  };

  static getStudentIdByName = (name: string): number => {
    const user = UsersManager.studentsList.find(
      (item) => item.getName() === name
    );
    if (user) return user.getId();
    return -1;
  };

  static createStudent = (
    name: string,
    email: string,
    birthday: string,
    hobbies: string[]
  ): void => {
    const student = new Student(
      UsersManager.studentsList.length,
      name,
      email,
      birthday,
      hobbies
    );

    UsersManager.studentsList.push(student);
    JSONFileManager.writeToDatabase(
      "./src/students.json",
      UsersManager.studentsList
    );
  };

  static createTeacher = (
    name: string,
    email: string,
    birthday: string,
    faculties: TEACHER_FACULTY[]
  ): void => {
    const teacher = new Teacher(
      UsersManager.teachersList.length,
      name,
      email,
      birthday,
      faculties
    );

    UsersManager.teachersList.push(teacher);
    JSONFileManager.writeToDatabase(
      "./src/teachers.json",
      UsersManager.teachersList
    );
  };
}
