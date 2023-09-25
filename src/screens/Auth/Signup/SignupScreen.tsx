import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {Styles} from '../Login/style';
import {AppButton, AppInput, LoadingIndicator} from '../../../components';
import {PLACEHOLDER} from '../../../labels';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import Validator from 'email-validator';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../types/NavigationTypes';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Signupscreen = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProps>();

  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email('enter a valid email')
      .required('An email is required'),
    password: Yup.string()
      .min(8, 'A password should be at least 8 characters')
      .required(),
    username: Yup.string()
      .min(3, 'username must be 3 characters long')
      .required(),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (
    email: string,
    password: string,
    username: string,
  ) => {
    try {
      setLoading(true);
      const user = await auth().createUserWithEmailAndPassword(email, password);
      const data = await firestore()
        .collection('users')
        .doc(user.user.uid)
        .set({
          user_uid: user.user.uid,
          username: username,
          email: user.user.email,
          profilePicture: await getRandomProfilePicture(),
          status: 'online',
        });
      setLoading(false);
      navigation.replace('HomeStack', 'HomeScreen');
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('email already in use');
      } else {
        Alert.alert(error.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: values => {
      onSignup(values.email, values.password, values.username);
    },
    validationSchema: signupSchema,
    validateOnMount: true,
  });
  const Logo_Image = require('../../../assets/images/instagram.png');

  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image source={Logo_Image} style={Styles.logoImage} />
      </View>

      <View style={Styles.formWrapper}>
        <AppInput
          borderColor={
            formik.values.username.length < 1 ||
            formik.values.username.length >= 3
              ? 'rgba(0,0,0,0.4)'
              : 'red'
          }
          onChange={formik.handleChange('username')}
          value={formik.values.username}
          onBlur={formik.handleBlur('username')}
          placeHolder={PLACEHOLDER.username}
        />

        <AppInput
          borderColor={
            formik.values.email.length < 1 ||
            Validator.validate(formik.values.email)
              ? 'rgba(0,0,0,0.4)'
              : 'red'
          }
          placeHolder={PLACEHOLDER.signupEmail}
          keyboardType="email-address"
          contentType="emailAddress"
          onChange={formik.handleChange('email')}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
        />

        <AppInput
          borderColor={
            formik.values.password.length < 1 ||
            formik.values.password.length >= 8
              ? 'rgba(0,0,0,0.4)'
              : 'red'
          }
          onChange={formik.handleChange('password')}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          placeHolder={PLACEHOLDER.password}
          secure={true}
        />

        <AppButton
          valid={formik.isValid}
          onPress={formik.handleSubmit}
          disabled={!formik.isValid}
          title={'Sign Up'}
        />

        <View style={Styles.signupTextWrapper}>
          <Text style={{color: '#000'}}>You already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#6BB0F5'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <LoadingIndicator />}
    </View>
  );
};

export default Signupscreen;
