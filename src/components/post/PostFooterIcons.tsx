import {Image, TouchableOpacity, View} from 'react-native';
import {postFooterIcons} from '../../assets/data/postFootericons';
import {Styles} from './styles';
import {PostProp} from '../../types/postTypes';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Post} from '../../types/posts';

const PostFooterIcons: React.FC<PostProp> = ({post}) => {
  const handlelike = (post: Post) => {
    const currentUserLikeStatus = !post.likes_by_users.includes(
      auth().currentUser?.uid!,
    );
    firestore()
      .collection('users')
      .doc(post.owner_uid)
      .collection('posts')
      .doc(post.id)
      .update({
        likes_by_users: currentUserLikeStatus
          ? firestore.FieldValue.arrayUnion(auth().currentUser?.uid)
          : firestore.FieldValue.arrayRemove(auth().currentUser?.uid),
      });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: '25%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => handlelike(post)}>
          <Image
            source={
              post.likes_by_users.includes(auth().currentUser?.uid!)
                ? postFooterIcons[0].likedImageUrl
                : postFooterIcons[0].imageUrl
            }
            style={[
              Styles.icon,
              {
                tintColor: post.likes_by_users.includes(
                  auth().currentUser?.uid!,
                )
                  ? 'red'
                  : 'white',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={postFooterIcons[1].imageUrl} style={Styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={postFooterIcons[2].imageUrl} style={Styles.icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image source={postFooterIcons[3].imageUrl} style={Styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default PostFooterIcons;
