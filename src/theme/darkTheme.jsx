import {DefaultTheme} from '@react-navigation/native';

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#091227',
    textPrimary: '#EAF0FF',
    textSecondary: '#A5C0FF',
    iconPrimary: '#EAF0FF',
    iconSecondary: '#8996B8',
    disableMinTrackTintColor: '#fff',
    maximumTrackTintColor: '#fff',
    minimumTrackTintColor: '#000',
    cacheTrackTintColor: '#333',
    bubbleBackgroundColor: '#666',
    heartbeatColor: '#999',
    userCardBackgroundColor: '#1A2238',
    userCardBorderColor: '#3A3F55',
    userCardTextPrimary: '#EAF0FF',
    userCardTextSecondary: '#A5C0FF',
  },
};
