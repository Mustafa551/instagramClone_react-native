import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {User} from './userData';

export type NavigationScreens =
  | 'LoginScreen'
  | 'SignupScreen'
  | 'HomeScreen'
  | 'AuthStack'
  | 'AddNewPostScreen'
  | 'ProfileScreen'
  | 'ReelScreen'
  | 'SearchScreen'
  | 'HomeStack'
  | 'MessageScreen'
  | 'ChatScreen';

export type StackParamList = {
  LoginScreen: {};
  SignupScreen: {};
  HomeScreen: {};
  AuthStack: {};
  AddNewPostScreen: {
    activeTab?: string;
  };
  ProfileScreen: {};
  ReelScreen: {};
  SearchScreen: {};
  HomeStack: {};
  MessageScreen: {
    user: User;
  };
  ChatScreen: {
    userData: User;
    currentUserUid?: string;
    currentUsername?: string;
  };
};

export type NavigationProps = NativeStackNavigationProp<StackParamList>;
