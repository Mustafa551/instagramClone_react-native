import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {IAppButton} from '../../types/AppButtonTypes';
import {Styles} from './style';

const AppButton: React.FC<IAppButton> = props => {
  const {title, onPress, valid, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        Styles.buttonWrapper,
        {backgroundColor: valid ? '#0096F6' : '#9ACAF7'},
      ]}>
      <Text style={Styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
