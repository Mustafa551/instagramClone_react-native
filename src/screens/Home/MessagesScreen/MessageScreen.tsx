import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, Message} from '../../../components';
import {Styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {HEIGHT, WIDTH} from '../../../assets/sizes/sizes';
import auth from '@react-native-firebase/auth';
import {NavigationProps, StackParamList} from '../../../types/NavigationTypes';
import {User} from '../../../types/userData';
import {IMessageScreenProp} from '../../../types/MessageScreenTypes';

const MessageScreen: React.FC<IMessageScreenProp> = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userss, setUserss] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [currentUid, setCurrentUid] = useState<string>();

  const [search, setSearch] = useState<string>();

  const navigation = useNavigation<NavigationProps>();
  const {user} = useRoute<RouteProp<StackParamList, 'MessageScreen'>>().params;

  const headerLeftFunc = () => {
    return (
      <View style={Styles.headerLeftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={Styles.backIcon}
            source={require('../../../assets/images/back1.png')}
          />
        </TouchableOpacity>
        <Text style={Styles.headerLeftText}>{user?.username}</Text>
      </View>
    );
  };
  const headerRightFunc = () => (
    <View style={Styles.headerIconsContainer}>
      <TouchableOpacity>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/add.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/editing.png')}
        />
      </TouchableOpacity>
    </View>
  );

  const FuncText = (text: string, color: string) => {
    return (
      <Text style={{color: color, fontSize: 17, fontWeight: '400'}}>
        {text}
      </Text>
    );
  };

  const getcurrentUser = () => {
    const currentUserUid = auth().currentUser?.uid;
    setCurrentUid(currentUserUid);
  };

  const getallUser = () => {
    firestore()
      .collection('users')
      .where('user_uid', '!=', auth().currentUser?.uid)
      .onSnapshot(snapshot => {
        let users: any = snapshot?.docs?.map(doc => {
          return doc.data();
        });
        setAllUsers(users);
        setUserss(users);
        let newData: User[] = users.filter((item: {status: string}) => {
          return item.status === 'online';
        });
        setOnlineUsers(newData);
      });
  };

  const searchFunction = (txt: string) => {
    let tempdata = userss;
    let newData: User[] = tempdata.filter(({username}) => {
      return username.toLowerCase().match(txt.toLowerCase());
    });
    if (newData.length > 0) {
      setAllUsers(newData);
    } else {
      setAllUsers([]);
    }
  };
  const renderItem = useCallback(({item}: {item: User}) => {
    return (
      <View
        style={{
          marginVertical: HEIGHT.height20,
          marginLeft: WIDTH.widht10,
        }}>
        <Image
          style={{
            height: HEIGHT.height60,
            width: HEIGHT.height60,
            borderRadius: HEIGHT.height30,
          }}
          source={{uri: item.profilePicture}}
        />
        <View
          style={{
            width: HEIGHT.height10,
            height: HEIGHT.height10,
            backgroundColor: 'green',
            borderRadius: 5,
            position: 'absolute',
            right: 2,
            bottom: 5,
          }}></View>
      </View>
    );
  }, []);

  useEffect(() => {
    getallUser();
    getcurrentUser();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <View
        style={{
          paddingBottom: HEIGHT.height10,
          paddingHorizontal: WIDTH.widht10,
        }}>
        <Header renderLeft={headerLeftFunc} renderRight={headerRightFunc} />
      </View>

      <ScrollView>
        <View style={{marginHorizontal: WIDTH.widht10}}>
          <View style={Styles.inputContainer}>
            <Image
              style={[
                Styles.icons,
                {
                  tintColor: 'gray',
                  height: HEIGHT.height20,
                  width: WIDTH.widht20,
                },
              ]}
              source={require('../../../assets/images/search.png')}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'gray'}
              style={Styles.input}
              value={search}
              onChangeText={txt => {
                setSearch(txt);
                searchFunction(txt);
              }}
            />
          </View>
        </View>

        {onlineUsers && (
          <FlatList
            keyExtractor={item => item.user_uid}
            horizontal
            data={onlineUsers}
            renderItem={renderItem}
          />
        )}
        <View style={{paddingHorizontal: WIDTH.widht10}}>
          <Header
            renderLeft={() => FuncText('Message', '#fff')}
            renderRight={() => FuncText('Request', '#2469b3')}
          />
          <FlatList
            keyExtractor={item => item.user_uid}
            data={allUsers}
            renderItem={({item, index}) => (
              <Message
                lastmsg="active Today"
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    userData: item,
                    currentUserUid: currentUid,
                  })
                }
                item={item}
                index={index}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageScreen;
