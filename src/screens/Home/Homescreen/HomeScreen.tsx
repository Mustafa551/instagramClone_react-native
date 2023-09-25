import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BottomTab,
  Header,
  LoadingIndicator,
  Posts,
  Stories,
} from '../../../components';
import {NavigationProps} from '../../../types/NavigationTypes';
import AddNewPostScreen from '../AddnewPost/AddNewPostScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import ReelScreen from '../ReelScreen/ReelScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import {Styles} from './styles';
import auth from '@react-native-firebase/auth';

const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<any>('Home');
  const [post, setPosts] = useState<any>([]);
  const [currentUser, setCurrentUser] = useState<any>();

  const navigation = useNavigation<NavigationProps>();

  async function currentuser() {
    const user = await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get();
    setCurrentUser(user.data());
  }

  useEffect(() => {
    firestore()
      .collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setPosts(snapshot?.docs?.map(doc => ({id: doc.id, ...doc.data()})));
      });
    currentuser();
  }, []);
  const headerRightFunc = () => (
    <View style={Styles.headerIconsContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddNewPostScreen', {})}>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/plus.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/love.png')}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MessageScreen', {user: currentUser})
        }>
        <View style={Styles.unreadBadge}>
          <Text style={Styles.unreadBadgeText}>12</Text>
        </View>
        <Image
          style={Styles.icons}
          source={require('../../../assets/images/chat.png')}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <SafeAreaView style={Styles.container}>
        {activeTab === 'Home' ? (
          <>
            <Header renderRight={headerRightFunc} />
            <Stories />
            <FlatList
              keyExtractor={item => item.user_uid}
              data={post}
              renderItem={({item, index}) => <Posts post={item} key={index} />}
            />
          </>
        ) : activeTab === 'add' ? (
          <AddNewPostScreen activeTab={activeTab} />
        ) : activeTab === 'Search' ? (
          <SearchScreen />
        ) : activeTab === 'Reels' ? (
          <ReelScreen />
        ) : activeTab === 'Profile' ? (
          <ProfileScreen />
        ) : null}

        <BottomTab
          activeTab={activeTab}
          setActiveTab={value => setActiveTab(value)}
          setloading={(load: boolean) => setLoading(load)}
        />
      </SafeAreaView>
      {loading && <LoadingIndicator />}
    </>
  );
};

export default HomeScreen;
