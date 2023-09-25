import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {WIDTH} from '../../assets/sizes/sizes';
import {User} from '../../types/userData';
import {Styles} from './styles';

const Stories: React.FC = () => {
  const [prof, setProf] = useState();
  // const [currentUser, setCurrentUser] = useState<any>();
  // const [currentUid, setcurrentUid] = useState();
  const [allUsers, setAllUsers] = useState<User[]>([]);

  async function currentuser() {
    const user = await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get();
    setProf(user.data()?.profilePicture);
    // setcurrentUid(user.data()?.user_uid);
    // setCurrentUser(user.data());
  }

  const getallUser = () => {
    firestore()
      .collection('users')
      // .where('user_uid', '!=', auth().currentUser?.uid)
      .onSnapshot(snapshot => {
        let users: any = snapshot?.docs?.map(doc => {
          return doc.data();
        });
        setAllUsers(users);
      });
  };

  // const changing = () => {
  //   const foundIdx = allUsers.findIndex(user => user?.user_uid == currentUid);
  //   allUsers.splice(foundIdx, 1);
  //   allUsers.unshift(currentUser);
  //   console.log('first', allUsers);
  // };
  // changing();

  useEffect(() => {
    currentuser();
    getallUser();
  }, []);

  return (
    <View style={{marginBottom: responsiveScreenHeight(1.4)}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allUsers.map((user: User, index) => {
          return (
            <View
              key={index}
              style={[
                Styles.storyWrapper,
                {marginLeft: index === 0 ? WIDTH.widht10 : 8},
              ]}>
              <Image
                style={Styles.storyImage}
                source={{
                  uri: user?.profilePicture,
                }}
              />
              <Text style={Styles.storyText}>
                {user.username.length > 9
                  ? user.username.slice(0, 8) + '..'
                  : user.username}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Stories;
