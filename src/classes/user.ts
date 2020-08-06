import * as moment from "moment";

export abstract class User {
  private static usersCount: number = 0;
  constructor(
    protected id: number,
    protected name: string,
    protected email: string,
    protected birthday: string
  ) {
    User.usersCount++;
  }
  getId = (): number => this.id;
  getName = (): string => this.name;
  getEmail = (): string => this.email;
  getBirthday = (): string => this.birthday;
  getAge = (): number =>
    moment().diff(moment(this.birthday, "DD/MM/YYYY"), "years");
  static getUsersCount = (): number => User.usersCount;
}
