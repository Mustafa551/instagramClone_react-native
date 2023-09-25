import {StyleSheet, TextStyle} from 'react-native';
import {HEIGHT} from '../../assets/sizes/sizes';
type Styles = {
  inputField: TextStyle;
};

export const Styles = StyleSheet.create<Styles>({
  inputField: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0,0.2)',
    padding: HEIGHT.height10,
    marginBottom: HEIGHT.height10,
    borderRadius: 4,
  },
});
