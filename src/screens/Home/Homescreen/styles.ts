import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
type Styles = {
  container: ViewStyle;
  headerIconsContainer: ViewStyle;
  icons: ImageStyle;
  unreadBadge: ViewStyle;
  unreadBadgeText: TextStyle;
};

export const Styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
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
  unreadBadge: {
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: 1,
    left: 19,
    bottom: 18,
    width: responsiveScreenWidth(5.5),
    height: responsiveScreenHeight(1.8),
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
});
