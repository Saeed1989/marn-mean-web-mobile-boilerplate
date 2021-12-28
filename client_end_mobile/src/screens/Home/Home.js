import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import * as Theme from '@/assets/styles';
import {NavUtils} from '@/utils';

const {navigateAndSimpleReset} = NavUtils;
const Home = () => {
  const {Layout, Gutters, Fonts} = Theme;

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    navigateAndSimpleReset('Main');
  };

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Text style={Fonts.textCenter}>{'Home screen works'}</Text>
    </View>
  );
};

export {Home};
