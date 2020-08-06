import * as moment from "moment";

export abstract class User {
  constructor(
    protected id: number,
    protected name: string,
    protected email: string,
    protected birthday: string
  ) {}
  getId = (): number => this.id;
  getName = (): string => this.name;
  getEmail = (): string => this.email;
  getBirthday = (): string => this.birthday;
  getAge = (): number => {
    return moment().diff(moment(this.birthday, "DD/MM/YYYY"), "years");
  };
}
