import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Styles} from './style';
import {AppButton, AppInput, LoadingIndicator} from '../../../components';
import {PLACEHOLDER} from '../../../labels';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import Validator from 'email-validator';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../types/NavigationTypes';
import auth from '@react-native-firebase/auth';
import {resetStack} from '../../../navigation/navigationRef';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProps>();

  async function onAuthStateChanged(user: any) {
    if (user) {
      firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .update({
          status: 'online',
          fcmToken: await AsyncStorage.getItem('fcmToken'),
        });
      return resetStack('HomeStack', 'HomeScreen');
    } else {
      return;
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('enter a valid email')
      .required('An email is required'),
    password: Yup.string()
      .min(8, 'A password should be at least 8 characters')
      .required(),
  });

  const onLogin = async (email: string, password: string) => {
    try {
      setLoading(true);

      const user = await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      navigation.replace('HomeStack', 'HomeScreen');
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('email or password incorrect');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert("user does't exist");
      } else {
        Alert.alert(error.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      onLogin(values.email, values.password);
    },
    validationSchema: loginSchema,
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
            formik.values.email.length < 1 ||
            Validator.validate(formik.values.email)
              ? 'rgba(0,0,0,0.4)'
              : 'red'
          }
          placeHolder={PLACEHOLDER.email}
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

        <View style={Styles.forgotpassWrapper}>
          <Text style={{color: '#6BB0F5'}}>Forgot password?</Text>
        </View>

        <AppButton
          valid={formik.isValid}
          onPress={formik.handleSubmit}
          disabled={!formik.isValid}
          title={'Log in'}
        />

        <View style={Styles.signupTextWrapper}>
          <Text style={{color: '#000'}}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignupScreen', {})}>
            <Text style={{color: '#6BB0F5'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <LoadingIndicator />}
    </View>
  );
};

export default LoginScreen;
