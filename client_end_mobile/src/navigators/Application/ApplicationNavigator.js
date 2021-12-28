import React from 'react';
import {Button, Text, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Startup} from '@/screens';
import {Layout, Colors} from '@/assets/styles';
import {MainNavigator} from '@/navigators/Main/MainNavigator';
import {NavUtils} from '@/utils';

const Stack = createStackNavigator();
const {navigationRef} = NavUtils;

// @refresh reset
const ApplicationNavigator = () => {
  console.log(MainNavigator);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar />
      <Stack.Navigator>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen
          name="Home"
          component={MainNavigator}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
