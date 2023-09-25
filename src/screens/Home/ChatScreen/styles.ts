import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {HEIGHT} from '../../../assets/sizes/sizes';

type Styles = {
  headerIconsContainer: ViewStyle;
  icons: ImageStyle;
  backIcon: ImageStyle;
  headerLeftContainer: ViewStyle;
  headerLeftText: TextStyle;
  statusText: TextStyle;
  headerImage: ImageStyle;
};

export const Styles = StyleSheet.create<Styles>({
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    width: HEIGHT.height25,
    height: HEIGHT.height25,
    marginLeft: responsiveScreenWidth(2.7),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  backIcon: {
    width: HEIGHT.height25,
    height: HEIGHT.height25,
    marginRight: HEIGHT.height10,
    tintColor: 'white',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    color: '#fff',
    fontSize: responsiveScreenFontSize(2.3),
    fontWeight: '600',
    marginBottom: 5,
  },
  statusText: {
    fontSize: responsiveScreenFontSize(1.5),
    color: 'gray',
  },
  headerImage: {
    width: HEIGHT.height35,
    height: HEIGHT.height35,
    borderRadius: HEIGHT.height20,
    marginRight: HEIGHT.height10,
  },
});
