import { User } from "./user";
import { StudentInterface } from "../interfaces/studentInterface";

export class Student extends User implements StudentInterface {
  constructor(
    id: number,
    name: string,
    email: string,
    birthDate: string,
    public hobbies: string[]
  ) {
    super(id, name, email, birthDate);
  }
}
