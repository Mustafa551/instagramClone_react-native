import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const HEIGHT = {
  height10: responsiveScreenHeight(1.1),
  height20: responsiveScreenHeight(2.3),
  height25: responsiveScreenHeight(2.9),
  height30: responsiveScreenHeight(3.5),
  height35: responsiveScreenHeight(4.1),
  height40: responsiveScreenHeight(4.7),
  height50: responsiveScreenHeight(5.9),
  height60: responsiveScreenHeight(7.1),
  height70: responsiveScreenHeight(8.3),
  height80: responsiveScreenHeight(9.5),
  height90: responsiveScreenHeight(10.7),
  height100: responsiveScreenHeight(11.9),
};

const WIDTH = {
  widht10: responsiveScreenWidth(2.5),
  widht20: responsiveScreenWidth(5.1),
  widht25: responsiveScreenWidth(6.4),
  widht30: responsiveScreenWidth(7.6),
  widht40: responsiveScreenWidth(10.2),
  widht50: responsiveScreenWidth(12.8),
  widht60: responsiveScreenWidth(15.3),
  widht70: responsiveScreenWidth(17.9),
  widht80: responsiveScreenWidth(20.5),
  widht90: responsiveScreenWidth(23),
  widht100: responsiveScreenWidth(25.3),
};

export {HEIGHT, WIDTH};
