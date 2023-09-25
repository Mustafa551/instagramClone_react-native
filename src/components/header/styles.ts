import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {WIDTH} from '../../assets/sizes/sizes';
type Styles = {
  container: ViewStyle;
  title: TextStyle;
};

export const Styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WIDTH.widht20,
  },

  title: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    right: '50%',
    fontWeight: '700',
    fontSize: 20,
  },
});
