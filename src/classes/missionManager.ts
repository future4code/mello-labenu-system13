import { Mission } from "./mission";
import { NightMission } from "./nightMission";
import { FullTimeMission } from "./fullTimeMission";
import { JSONFileManager } from "../JSONFileManager";

export abstract class MissionManager {
  private static missionList: Mission[] = JSONFileManager.readDatabase(
    "./src/mission.json"
  ).map((mission) => {
    if (mission.getName().match(/(-na-night)$/)) {
      const nightMission = new NightMission(
        mission.id,
        mission.startDate,
        mission.endDate,
        mission.teachers,
        mission.student,
        mission.currentModule
      );
      nightMission.setName(mission.name);
      return nightMission;
    }
    const fullTimeMission = new FullTimeMission(
      mission.id,
      mission.startDate,
      mission.endDate,
      mission.teachers,
      mission.student,
      mission.currentModule
    );
    fullTimeMission.setName(mission.name);
    return fullTimeMission;
  });
  static getMission = (): Mission[] => MissionManager.missionList;
  static createFullTimeMission = (
    name: string,
    startDate: string,
    endDate: string
  ) => {
    const fullTimeMission = new FullTimeMission(
      MissionManager.missionList.length,
      startDate,
      endDate
    );
    fullTimeMission.setName(name);
    MissionManager.missionList.push(fullTimeMission);
    JSONFileManager.writeToDatabase(
      "./src/missions.json",
      MissionManager.missionList
    );
  };
  static createNightMission = (
    name: string,
    startDate: string,
    endDate: string
  ) => {
    const nightMission = new NightMission(
      MissionManager.missionList.length,
      startDate,
      endDate
    );
    nightMission.setName(name);
    MissionManager.missionList.push(nightMission);
    JSONFileManager.writeToDatabase(
      "./src/missions.json",
      MissionManager.missionList
    );
  };
}
