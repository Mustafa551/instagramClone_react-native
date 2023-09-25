import {Image, View} from 'react-native';
import {PostProp} from '../../types/postTypes';
import {Styles} from './styles';

const PostImage: React.FC<PostProp> = ({post}) => {
  return (
    <View style={{width: '100%', height: 450}}>
      <Image
        source={{
          uri: post.imageUrl,
        }}
        style={Styles.postImage}
      />
    </View>
  );
};

export default PostImage;
