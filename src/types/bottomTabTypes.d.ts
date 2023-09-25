import {Tabicon} from '../assets/data/bottomTabIcons';

export interface BottomTabProp {
  setloading: (value: boolean) => void;
  setActiveTab: (value: string) => void;
  activeTab: string;
}
