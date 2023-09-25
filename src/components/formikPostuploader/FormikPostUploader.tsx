import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {Divider, Image} from 'react-native-elements';
import * as Yup from 'yup';
import {HEIGHT, WIDTH} from '../../assets/sizes/sizes';
import validUrl from 'valid-url';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import {launchImageLibrary} from 'react-native-image-picker';

const uploadPostSchema = Yup.object().shape({
  caption: Yup.string().max(2200, 'Caption has reached the character limit'),
});

const placeholder_img =
  'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg';

const FormikPostUploader: React.FC = () => {
  const navigation = useNavigation();

  const [postImage, setPostImage] = useState('');
  const [valid, setValid] = useState(false);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<any>();
  const [Loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (image: any) => {
    setLoading(true);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instaCloneApp');
    data.append('cloud_name', 'mustafa551');

    const url = await fetch(
      'https://api.cloudinary.com/v1_1/mustafa551/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    let respone = await url.json();
    if (respone.secure_url) {
      setPostImage(respone.secure_url);
      setLoading(false);
      setValid(true);
    } else {
      setPostImage(placeholder_img);
    }
  };

  const upload = async () => {
    const result = await launchImageLibrary({mediaType: 'photo', quality: 1});
    if (result.assets) {
      let newFile = {
        uri: result.assets[0].uri,
        type: 'test/png',
        name: `test/${result.assets[0].uri?.split('.')[1]}`,
      };
      handleUpload(newFile);
    }
  };

  const getUserName = () => {
    const user = auth().currentUser;
    const unsubscribe = firestore()
      .collection('users')
      .where('user_uid', '==', user?.uid)
      .onSnapshot(snapshot =>
        snapshot.docs.map(doc => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profilePicture,
          });
        }),
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  const postPicture = (caption: string) => {
    setLoading(true);

    const unsubscribe = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .collection('posts')
      .add({
        imageUrl: valid ? postImage : null,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: auth().currentUser?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        caption: caption,
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    setLoading(false);

    return unsubscribe;
  };

  return (
    <>
      <Formik
        initialValues={{caption: ''}}
        validateOnMount={true}
        onSubmit={values => {
          postPicture(values.caption);
        }}
        validationSchema={uploadPostSchema}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }): any => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
              }}>
              <Image
                onPress={() => upload()}
                style={{
                  width: WIDTH.widht100,
                  height: HEIGHT.height100,
                }}
                source={{
                  uri: validUrl.isUri(postImage) ? postImage : placeholder_img,
                }}
              />
              <View style={{flex: 1}}>
                <TextInput
                  placeholder="Write a caption..."
                  placeholderTextColor={'gray'}
                  style={{color: 'white', fontSize: 20, marginLeft: 10}}
                  multiline={true}
                  onChangeText={handleChange('caption')}
                  onBlur={handleBlur('caption')}
                  value={values.caption}
                />
              </View>
            </View>
            <Divider width={0.2} orientation="vertical" />

            {!valid && (
              <Text style={{color: 'red', fontSize: 15}}>
                Image is required
              </Text>
            )}

            <Button
              title="share"
              onPress={() => handleSubmit()}
              disabled={!valid}
            />
          </>
        )}
      </Formik>
      {Loading && <LoadingIndicator />}
    </>
  );
};

export default FormikPostUploader;
