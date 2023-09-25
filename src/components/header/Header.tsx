import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Styles} from './styles';
import {HeaderProp} from '../../types/headerTypes';
import {HEIGHT, WIDTH} from '../../assets/sizes/sizes';
import {useNavigation} from '@react-navigation/native';

const Header: React.FC<HeaderProp> = props => {
  const {
    renderLeft = null,
    renderRight = null,
    backarrow = false,
    title,
    marginhori,
    onLeftIcon = null,
    activeTab,
  } = props;

  const navigation = useNavigation();

  const onPressLeftIcon = () => {
    if (onLeftIcon) onLeftIcon();
    else if (backarrow) {
      navigation.goBack();
    } else {
    }
  };

  const headerLeftFunc = () => (
    <TouchableOpacity onPress={onPressLeftIcon}>
      <Image
        style={{
          width: backarrow ? WIDTH.widht30 : WIDTH.widht100,
          height: backarrow ? HEIGHT.height30 : HEIGHT.height50,
          resizeMode: 'contain',
        }}
        source={
          backarrow
            ? require('../../assets/images/back.png')
            : require('../../assets/images/instagram-logo.png')
        }
      />
    </TouchableOpacity>
  );

  const headerRightFunc = () => {
    return <></>;
  };

  return (
    <View style={[Styles.container, {marginHorizontal: marginhori}]}>
      {activeTab ? null : renderLeft ? renderLeft() : headerLeftFunc()}

      {!!title && <Text style={Styles.title}>{title}</Text>}

      {renderRight ? renderRight() : headerRightFunc()}
    </View>
  );
};

export default Header;
