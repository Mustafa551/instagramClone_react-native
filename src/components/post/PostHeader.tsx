import {Image, Text, View} from 'react-native';
import {PostProp} from '../../types/postTypes';
import {Styles} from './styles';

const PostHeader: React.FC<PostProp> = ({post}) => {
  return (
    <View style={Styles.postHeaderWrapper}>
      <View style={Styles.postHeaderLeftView}>
        <Image
          style={Styles.postHeaderImage}
          source={{uri: post.profile_picture}}
        />
        <Text style={Styles.postHeaderText}>{post.user}</Text>
      </View>

      <Text style={{color: '#fff', fontWeight: '900'}}>...</Text>
    </View>
  );
};
export default PostHeader;
