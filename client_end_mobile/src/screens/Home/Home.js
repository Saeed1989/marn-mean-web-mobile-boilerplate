import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import * as Theme from '@/assets/styles';
import {NavUtils} from '@/utils';
import {getAllCatagory} from '@/services';
import {Example} from '@/components';

const {navigateAndSimpleReset} = NavUtils;
export const Home = () => {
  const {Layout, Fonts} = Theme;

  const init = async () => {
    getAllCatagory().then(res => {
      console.log(res);
    });
  };

  useEffect(() => {
    init();
  });

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Example />
    </View>
  );
};
