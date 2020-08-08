import { Mission } from "./mission";
import { NightMission } from "./nightMission";
import { FullTimeMission } from "./fullTimeMission";
import { JSONFileManager } from "../JSONFileManager";
import { UsersManager } from "./usersManager";
import { Student } from "./student";
import { Teacher } from "./teacher";

export abstract class MissionManager {
  private static missionsList: Mission[] = JSONFileManager.readDatabase(
    "./src/missions.txt"
  ).map((mission) => {
    if (mission.name.match(/(-na-night)$/)) {
      const nightMission = new NightMission(
        mission.id,
        mission.startDate,
        mission.endDate,
        mission.teachers.map(
          (item: any) =>
            new Teacher(
              item.id,
              item.name,
              item.email,
              item.birthday,
              item.faculties
            )
        ),
        mission.students.map(
          (item: any) =>
            new Student(
              item.id,
              item.name,
              item.email,
              item.birthday,
              item.hobbies
            )
        ),
        mission.currentModule
      );
      nightMission.setName(mission.name);
      return nightMission;
    }
    const fullTimeMission = new FullTimeMission(
      mission.id,
      mission.startDate,
      mission.endDate,
      mission.teachers.map(
        (item: any) =>
          new Teacher(
            item.id,
            item.name,
            item.email,
            item.birthday,
            item.faculties
          )
      ),
      mission.students.map(
        (item: any) =>
          new Student(
            item.id,
            item.name,
            item.email,
            item.birthday,
            item.hobbies
          )
      ),
      mission.currentModule
    );
    fullTimeMission.setName(mission.name);
    return fullTimeMission;
  });

  static getMissions = (): Mission[] => MissionManager.missionsList;

  static createFullTimeMission = (
    name: string,
    startDate: string,
    endDate: string
  ) => {
    const fullTimeMission = new FullTimeMission(
      MissionManager.missionsList.length,
      startDate,
      endDate
    );
    fullTimeMission.setName(name);
    MissionManager.missionsList.push(fullTimeMission);
    JSONFileManager.writeToDatabase(
      "./src/missions.txt",
      MissionManager.missionsList
    );
  };

  static createNightMission = (
    name: string,
    startDate: string,
    endDate: string
  ) => {
    const nightMission = new NightMission(
      MissionManager.missionsList.length,
      startDate,
      endDate
    );
    nightMission.setName(name);
    MissionManager.missionsList.push(nightMission);
    JSONFileManager.writeToDatabase(
      "./src/missions.txt",
      MissionManager.missionsList
    );
  };

  static addStudentToMission = (studentId: number, missionId: number): void => {
    const student = UsersManager.getStudentsList().find(
      (item) => item.getId() === studentId
    );
    const mission = MissionManager.missionsList.find(
      (item) => item.getId() === missionId
    );
    if (student && mission) {
      mission.addStudent(student);
      JSONFileManager.writeToDatabase(
        "./src/missions.txt",
        MissionManager.missionsList
      );
    }
  };

  static addTeacherToMission = (teacherId: number, missionId: number): void => {
    const teacher = UsersManager.getTeachersList().find(
      (item) => item.getId() === teacherId
    );
    const mission = MissionManager.missionsList.find(
      (item) => item.getId() === missionId
    );
    if (teacher && mission) {
      mission.addTeacher(teacher);
      JSONFileManager.writeToDatabase(
        "./src/missions.txt",
        MissionManager.missionsList
      );
    }
  };
}
