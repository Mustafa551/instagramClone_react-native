import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {HEIGHT, WIDTH} from '../../assets/sizes/sizes';
type Styles = {
  messageContainer: ViewStyle;
  messageLeftView: ViewStyle;
  profilePic: ImageStyle;
  messageTextWrapper: ViewStyle;
  userTitle: TextStyle;
  lastMsg: TextStyle;
  messageRightView: ViewStyle;
  cameraIcon: ImageStyle;
};

export const Styles = StyleSheet.create<Styles>({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: HEIGHT.height20,
  },
  messageLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: HEIGHT.height50,
    height: HEIGHT.height50,
    borderRadius: HEIGHT.height30,
  },
  messageTextWrapper: {
    marginLeft: WIDTH.widht10,
  },
  userTitle: {
    color: 'white',
    fontSize: responsiveScreenFontSize(1.8),
    marginBottom: 5,
  },
  lastMsg: {
    color: 'gray',
    fontSize: responsiveScreenFontSize(1.7),
  },
  messageRightView: {},
  cameraIcon: {
    width: WIDTH.widht30,
    height: HEIGHT.height30,
    tintColor: 'white',
  },
});
