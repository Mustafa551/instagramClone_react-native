import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {HEIGHT, WIDTH} from '../../assets/sizes/sizes';

type Styles = {
  postHeaderWrapper: ViewStyle;
  postHeaderImage: ImageStyle;
  postHeaderText: TextStyle;
  postHeaderLeftView: ViewStyle;
  postImage: ImageStyle;
  icon: ImageStyle;
  postFooterWrapper: ViewStyle;
};

export const Styles = StyleSheet.create<Styles>({
  postHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    marginVertical: 8,
  },
  postHeaderImage: {
    width: HEIGHT.height40,
    height: HEIGHT.height40,
    borderRadius: 25,
    borderWidth: 2,
    // borderColor: '#ff8501',
    marginLeft: 6,
  },
  postHeaderLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderText: {
    fontWeight: '700',
    marginLeft: 5,
    color: '#fff',
  },
  postImage: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
  },
  icon: {
    width: WIDTH.widht25,
    height: HEIGHT.height25,
    tintColor: '#fff',
  },
  postFooterWrapper: {
    marginHorizontal: WIDTH.widht10,
    marginTop: HEIGHT.height10,
  },
});
