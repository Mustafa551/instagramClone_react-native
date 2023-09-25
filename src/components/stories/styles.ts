import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {HEIGHT, WIDTH} from '../../assets/sizes/sizes';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';

type Styles = {
  storyImage: ImageStyle;
  storyWrapper: ViewStyle;
  storyText: TextStyle;
};

export const Styles = StyleSheet.create<Styles>({
  storyWrapper: {
    alignItems: 'center',
  },
  storyImage: {
    width: HEIGHT.height70,
    height: HEIGHT.height70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
  storyText: {
    color: 'white',
    fontSize: responsiveScreenFontSize(1.6),
    width: '100%',
    textAlign: 'center',
  },
});
