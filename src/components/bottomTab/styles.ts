import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import {HEIGHT, WIDTH} from '../../assets/sizes/sizes';
type Styles = {
  icon: ImageStyle;
  bottomTabIconWrapper: ViewStyle;
  bottomTabWrapper: ViewStyle;
  profileIcon: ImageStyle;
};

export const Styles = StyleSheet.create<Styles>({
  bottomTabWrapper: {
    position: 'relative',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    backgroundColor: '#000',
  },
  bottomTabIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: HEIGHT.height10,
    height: HEIGHT.height50,
    alignItems: 'center',
  },
  icon: {
    width: HEIGHT.height30,
    height: HEIGHT.height30,
  },
  profileIcon: {
    borderRadius: 15,
    borderColor: '#fff',
  },
});
