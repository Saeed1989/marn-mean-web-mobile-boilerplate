import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Example} from '@/components';

const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home2" component={Example} />
    </Tab.Navigator>
  );
};

export {MainNavigator};
