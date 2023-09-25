import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {Styles} from './styles';
import {ILoadingIndicator} from '../../types/LoadingIndicator';

const LoadingIndicator: React.FC<ILoadingIndicator> = ({message}) => {
  return (
    <View style={Styles.container}>
      <ActivityIndicator color={'white'} size={'large'} />
      <Text style={Styles.text}>{message}</Text>
    </View>
  );
};

export default LoadingIndicator;
