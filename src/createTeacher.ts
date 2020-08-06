import { UsersManager } from "./classes/usersManager";
import { TEACHER_FACULTY } from "./interfaces/teacherInterface";

export const createTeacher = (
  name: string,
  email: string,
  birthday: string,
  faculties: TEACHER_FACULTY[]
): void => {
  UsersManager.createTeacher(name, email, birthday, faculties);
};
