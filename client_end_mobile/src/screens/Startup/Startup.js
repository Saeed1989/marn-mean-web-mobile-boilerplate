import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {Layout, Fonts} from '@/assets/styles';
import {navigateAndSimpleReset} from '@/navigators/utils';

const Startup = ({navigation}) => {
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    navigation.navigate('Home');
  };

  useEffect(() => {
    init();
  });

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator size={'large'} />
      <Text style={Fonts.textCenter}>{'welcome'}</Text>
    </View>
  );
};

export {Startup};
