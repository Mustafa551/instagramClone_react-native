import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {HEIGHT, WIDTH} from '../../../assets/sizes/sizes';
type Styles = {
  headerIconsContainer: ViewStyle;
  icons: ImageStyle;
  headerLeftContainer: ViewStyle;
  backIcon: ImageStyle;
  headerLeftText: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
};

export const Styles = StyleSheet.create<Styles>({
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    width: responsiveScreenWidth(7),
    height: responsiveScreenHeight(3),
    marginLeft: responsiveScreenWidth(2.7),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  backIcon: {
    width: responsiveScreenWidth(5.5),
    height: responsiveScreenHeight(2),
    marginRight: HEIGHT.height10,
    tintColor: 'white',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    color: '#fff',
    fontSize: responsiveScreenFontSize(2.8),
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#262626',
    height: HEIGHT.height40,
    borderRadius: 12,
    marginVertical: HEIGHT.height20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    color: 'white',
    fontSize: 16,
    paddingLeft: WIDTH.widht10,
  },
});
