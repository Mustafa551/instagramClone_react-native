import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {HEIGHT} from '../../assets/sizes/sizes';

type Style = {
  container: ViewStyle;
  text: TextStyle;
};

export const Styles = StyleSheet.create<Style>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    position: 'absolute',
    bottom: HEIGHT.height60,
  },
});
