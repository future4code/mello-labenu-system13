import { Mission } from "./mission";

class NightMission extends Mission {
  public setName(name: string) {
    if (name.indexOf("-na-night") !== -1) {
      super.setName(name);
    }
  }
}
