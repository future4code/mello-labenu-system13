import { UsersManager } from "./classes/usersManager";

export const createStudent = (
  name: string,
  email: string,
  birthday: string,
  hobbies: string[]
): void => {
  UsersManager.createStudent(name, email, birthday, hobbies);
};
