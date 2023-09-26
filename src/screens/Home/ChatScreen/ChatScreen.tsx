import firestore from '@react-native-firebase/firestore';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {HEIGHT, WIDTH} from '../../../assets/sizes/sizes';
import {Header} from '../../../components';
import {IMessages} from '../../../types/MessagesTypes';
import {NavigationProps, StackParamList} from '../../../types/NavigationTypes';
import {Styles} from './styles';
import {sendNotification} from '../../../utils/sendNotifications';

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessages[]>([]);

  const navigation = useNavigation<NavigationProps>();
  const {userData, currentUserUid, currentUsername} =
    useRoute<RouteProp<StackParamList, 'ChatScreen'>>().params;
  const uniqueUid =
    currentUserUid! > userData.user_uid
      ? userData.user_uid + '-' + currentUserUid
      : currentUserUid + '-' + userData.user_uid;

  const headerLeftFunc = () => {
    return (
      <View style={Styles.headerLeftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Styles.backIcon}
            source={require('../../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Image
          source={{uri: userData.profilePicture}}
          style={Styles.headerImage}
        />
        <View>
          <Text style={Styles.headerLeftText}>{userData.username}</Text>
          <Text style={Styles.statusText}>Active 6h ago</Text>
        </View>
      </View>
    );
  };
  const headerRightFunc = () => (
    <View style={Styles.headerIconsContainer}>
      <TouchableOpacity>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/telephone.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/video.png')}
        />
      </TouchableOpacity>
    </View>
  );

  const getmessages = () => {
    firestore()
      .collection('chatrooms')
      .doc(uniqueUid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const allmsg = snapshot?.docs?.map(doc => {
          const data = doc.data();
          if (data.createdAt) {
            return {
              ...doc.data(),
              createdAt: doc.data().createdAt.toDate(),
            };
          } else {
            return {
              ...doc.data(),
              createdAt: new Date(),
            };
          }
        });

        setMessages(allmsg as IMessages[]);
      });
  };

  useEffect(() => {
    getmessages();
  }, []);

  const onSend: any = useCallback((messages = []) => {
    const msg: any = messages[0];
    const myMsg = {
      ...msg,
      sentBy: currentUserUid,
      sentTo: userData.user_uid,
      createdAt: new Date(),
      user: {
        _id: userData.user_uid,
        avatar: userData.profilePicture,
      },
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    firestore()
      .collection('chatrooms')
      .doc(uniqueUid)
      .collection('messages')
      .add({...myMsg, createdAt: firestore?.FieldValue?.serverTimestamp()});
    sendNotification(userData.fcmToken, currentUsername, msg.text);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#000',
        flex: 1,
      }}>
      <View style={{paddingHorizontal: WIDTH.widht10, flex: 1}}>
        <View style={{paddingBottom: HEIGHT.height10}}>
          <Header renderLeft={headerLeftFunc} renderRight={headerRightFunc} />
        </View>
        <GiftedChat
          messages={messages}
          onSend={message => onSend(message)}
          user={{
            _id: userData.user_uid!,
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  left: {
                    color: 'white',
                  },
                }}
                wrapperStyle={{
                  right: {
                    backgroundColor: '#ab43f9',
                    marginTop: 10,
                  },
                  left: {
                    backgroundColor: '#3a355a',
                    marginTop: 10,
                  },
                }}
              />
            );
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                placeholderTextColor="#fff"
                containerStyle={{
                  backgroundColor: '#282734',
                  borderRadius: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 0,
                  borderTopColor: 'black',
                }}
                textInputStyle={{color: '#fff'}}
                placeholder="Message.."
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
