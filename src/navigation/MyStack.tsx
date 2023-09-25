import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import SignupScreen from '../screens/Auth/Signup/SignupScreen';
import HomeScreen from '../screens/Home/Homescreen/HomeScreen';
import {StackParamList} from '../types/NavigationTypes';
import AddNewPostScreen from '../screens/Home/AddnewPost/AddNewPostScreen';
import SearchScreen from '../screens/Home/SearchScreen/SearchScreen';
import ReelScreen from '../screens/Home/ReelScreen/ReelScreen';
import ProfileScreen from '../screens/Home/ProfileScreen/ProfileScreen';
import {navigationRef} from './navigationRef';
import MessageScreen from '../screens/Home/MessagesScreen/MessageScreen';
import ChatScreen from '../screens/Home/ChatScreen/ChatScreen';

const Stack = createNativeStackNavigator<StackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddNewPostScreen" component={AddNewPostScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ReelScreen" component={ReelScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};
const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default MyStack;
