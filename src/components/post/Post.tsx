import React from 'react';
import {Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {HEIGHT} from '../../assets/sizes/sizes';
import {CaptionProp} from '../../types/captionTypes';
import {PostProp} from '../../types/postTypes';
import {PostFooterIcons, PostHeader, PostImage} from './index';
import {Styles} from './styles';

const Posts: React.FC<PostProp> = ({post, index}) => {
  function formatNumberToK(number: number) {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number.toString();
  }

  return (
    <View style={{marginBottom: HEIGHT.height30}} key={index}>
      <Divider width={1} orientation="vertical" />

      <PostHeader post={post} />
      <PostImage post={post} />

      <View style={Styles.postFooterWrapper}>
        <PostFooterIcons post={post} />
        <Text style={{color: '#fff', fontWeight: 'bold', marginTop: 5}}>
          {formatNumberToK(post.likes_by_users.length) + ' likes'}
        </Text>
        <PostCommetSec user={post.user} para={post.caption} />
        <PostCommentLine post={post} />

        {post.comments.map(({comment, user}, index) => (
          <PostCommetSec para={comment} user={user} index={index} />
        ))}
      </View>
    </View>
  );
};

const PostCommetSec: React.FC<CaptionProp> = ({user, para, index}) => {
  return (
    <View key={index} style={{marginTop: 5}}>
      <Text style={{color: 'white'}}>
        <Text style={{fontWeight: '600'}}>{user}</Text>
        <Text> {para}</Text>
      </Text>
    </View>
  );
};

const PostCommentLine: React.FC<PostProp> = ({post}) => {
  return (
    <View>
      {!!post.comments.length && (
        <Text style={{color: 'gray', marginTop: 5}}>
          {post.comments.length > 1 ? `all ${post.comments.length}` : ''}
          {post.comments.length > 1 ? 'comments' : ' comment'}
        </Text>
      )}
    </View>
  );
};

export default Posts;
