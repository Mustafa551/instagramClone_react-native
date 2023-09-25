import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {NavigationProps, StackParamList} from '../types/NavigationTypes';

export const navigationRef = createNavigationContainerRef<NavigationProps>();

export function resetStack(
  name: keyof StackParamList,
  screen: keyof StackParamList,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params: {screen}}],
      }),
    );
  }
}
