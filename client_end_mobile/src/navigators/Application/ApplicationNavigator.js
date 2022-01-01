import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Startup} from '@/screens';
import {MainNavigator} from '@/navigators/Main/MainNavigator';
import {NavUtils} from '@/utils';

const Stack = createStackNavigator();
const {navigationRef} = NavUtils;

// @refresh reset
const ApplicationNavigator = () => {
  console.log(MainNavigator);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen
          name="MainNavigator"
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
