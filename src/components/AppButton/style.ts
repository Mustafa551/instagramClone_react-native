import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {HEIGHT} from '../../assets/sizes/sizes';
type Styles = {
  buttonWrapper: ViewStyle;
  buttonText: TextStyle;
};

export const Styles = StyleSheet.create<Styles>({
  buttonWrapper: {
    alignItems: 'center',
    backgroundColor: '#0096F6',
    minHeight: HEIGHT.height40,
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
