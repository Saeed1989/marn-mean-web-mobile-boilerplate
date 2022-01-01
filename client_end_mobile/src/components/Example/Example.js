import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Fonts, Layout} from '@/assets/styles';

const Example = () => {
  return (
    <ScrollView>
      <Text style={Fonts.textRegular}>Emample works</Text>
    </ScrollView>
  );
};

export {Example};
