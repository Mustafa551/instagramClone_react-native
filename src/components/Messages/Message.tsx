import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Styles} from './styles';
import {IMessageList} from '../../types/MessageListTypes';

const Message: React.FC<IMessageList> = ({item, index, onPress, lastmsg}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      key={index}
      style={Styles.messageContainer}>
      <View style={Styles.messageLeftView}>
        <Image style={Styles.profilePic} source={{uri: item.profilePicture}} />
        <View style={Styles.messageTextWrapper}>
          <Text style={Styles.userTitle}>{item.username}</Text>
          <Text style={Styles.lastMsg}>{lastmsg}</Text>
        </View>
      </View>
      <View style={Styles.messageRightView}>
        <Image
          source={require('../../assets/images/camera.png')}
          style={Styles.cameraIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Message;
