import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {FormikPostUploader, Header} from '../../../components';
import {WIDTH} from '../../../assets/sizes/sizes';
import {StackParamList} from '../../../types/NavigationTypes';

const AddNewPostScreen: React.FC<
  StackParamList['AddNewPostScreen']
> = props => {
  const {activeTab} = props;
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
      <Header
        activeTab={activeTab}
        marginhori={WIDTH.widht10}
        backarrow
        title="NEW POST"
      />
      <FormikPostUploader />
    </SafeAreaView>
  );
};

export default AddNewPostScreen;
