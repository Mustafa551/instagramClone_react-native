import {View, Text, TextInput, Keyboard} from 'react-native';
import React from 'react';
import {Styles} from './style';
import {IAppInput} from '../../types/AppInputTypes';
const AppInput: React.FC<IAppInput> = props => {
  const {
    placeHolder,
    keyboardType = 'default',
    contentType = 'none',
    secure = false,
    onChange,
    onBlur,
    value,
    borderColor,
  } = props;
  return (
    <View style={[Styles.inputField, {borderColor: borderColor}]}>
      <TextInput
        style={{color: 'black'}}
        placeholderTextColor={'#444'}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeHolder}
        textContentType={contentType}
        autoFocus={true}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
      />
    </View>
  );
};

export default AppInput;
