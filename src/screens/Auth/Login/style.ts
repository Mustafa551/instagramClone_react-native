import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';
import {HEIGHT, WIDTH} from '../../../assets/sizes/sizes';
type Styles = {
  container: ViewStyle;
  logoContainer: ViewStyle;
  logoImage: ImageStyle;
  formWrapper: ViewStyle;
  forgotpassWrapper: ViewStyle;
  signupTextWrapper: ViewStyle;
};

export const Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: HEIGHT.height60,
  },
  logoImage: {
    width: WIDTH.widht100,
    height: HEIGHT.height100,
    marginTop: HEIGHT.height50,
    resizeMode: 'contain',
  },
  formWrapper: {
    marginTop: HEIGHT.height80,
    paddingHorizontal: WIDTH.widht10,
  },
  forgotpassWrapper: {
    alignItems: 'flex-end',
    marginBottom: HEIGHT.height30,
  },
  signupTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT.height10,
  },
});
