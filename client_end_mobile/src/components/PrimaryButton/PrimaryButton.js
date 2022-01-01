import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeColors as Colors, Layout} from '@/assets/styles';
import {TouchableOpacity, Text} from 'react-native';

const ButtonStyle = () => {
  const base = {
    ...Layout.center,
    height: 40,
    backgroundColor: Colors.primary,
  };
  const rounded = {
    ...base,
    borderRadius: 20,
  };

  return StyleSheet.create({
    base,
    rounded,
    outline: {
      ...base,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
    outlineRounded: {
      ...rounded,
      backgroundColor: Colors.transparent,
      borderWidth: 2,
      borderColor: Colors.primary,
    },
  });
};

export const PrimaryButton = props => {
  let {onPress, title} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={ButtonStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
