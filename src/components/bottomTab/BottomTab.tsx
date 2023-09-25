import React, {useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-elements';
import {Tabicon} from '../../assets/data/bottomTabIcons';
import {BottomTabProp} from '../../types/bottomTabTypes';
import {Styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types/NavigationTypes';
import firestore from '@react-native-firebase/firestore';

const BottomTab: React.FC<BottomTabProp> = ({
  setloading,
  activeTab,
  setActiveTab,
}) => {
  const navigation = useNavigation<NavigationProps>();

  const [prof, setProf] = useState();

  const bottomTabIcons: Tabicon[] = [
    {
      name: 'Home',
      active:
        'https://img.icons8.com/fluency-systems-filled/48/FFFFFF/home.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/48/FFFFFF/home--v1.png',
    },
    {
      name: 'Search',
      active: 'https://img.icons8.com/sf-black/64/FFFFFF/search.png',
      inactive: 'https://img.icons8.com/sf-regular/48/FFFFFF/search.png',
    },
    {
      name: 'add',
      active:
        'https://img.icons8.com/material-rounded/24/FFFFFF/filled-plus-2-math.png',
      inactive:
        'https://img.icons8.com/material-rounded/24/FFFFFF/filled-plus-2-math.png',
    },
    {
      name: 'Reels',
      active: 'https://img.icons8.com/ios-filled/50/FFFFFF/instagram-reel.png',
      inactive: 'https://img.icons8.com/ios/50/FFFFFF/instagram-reel.png',
    },
    {
      name: 'Profile',
      active: prof,
      inactive: prof,
    },
  ];

  async function pic() {
    const picture = await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get();
    setProf(picture.data()?.profilePicture);
  }

  useEffect(() => {
    pic();
  }, []);

  const logout = async () => {
    setloading(true);

    const logout = await auth().signOut();
    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .update({status: 'offline'});
    setTimeout(() => {
      setloading(false);
      return navigation.replace('AuthStack', 'LoginScreen');
    }, 2000);
  };

  const alert = () => {
    Alert.alert('Logout', 'Are you sure you want to logout', [
      {
        text: 'cancel',
        onPress: () => setActiveTab('Home'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => logout(),
      },
    ]);
  };
  useEffect(() => {
    activeTab === 'Profile' ? alert() : null;
  }, [activeTab]);
  const Icon: React.FC<Tabicon> = ({name, inactive, ind, active}) => {
    return (
      <TouchableOpacity
        key={ind}
        onPress={() => {
          setActiveTab(name);
        }}>
        <Image
          source={{uri: activeTab === name ? active : inactive}}
          style={[
            Styles.icon,
            name === 'Profile' ? Styles.profileIcon : null,
            {borderWidth: activeTab === 'Profile' ? 2 : 0},
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.bottomTabWrapper}>
      <Divider width={2} orientation="vertical" />

      <View style={Styles.bottomTabIconWrapper}>
        {bottomTabIcons.map(({name, inactive, active}, index) => (
          <Icon name={name} inactive={inactive} active={active} ind={index} />
        ))}
      </View>
    </View>
  );
};

export default BottomTab;
