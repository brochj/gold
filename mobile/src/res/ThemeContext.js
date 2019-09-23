import React from 'react';

export const themes = {
  light: {
    primary: '#196A65', // 500
    primaryVariant: '#1CA49C', // 700
    secondary: '#FF71C8', // 200
    secondaryVariant: '#018786', // 900
    background: '#fcfcfc',
    surface: '#f4f4f4',
    error: '#B00020',
    sucess: 'green',
    warning: 'yellow',
    information: 'blue',

    onPrimary: '#FFF',
    onSecondary: '#000',
    onBackground: '#000',
    onSurface: '#000',
    onError: '#FFF',
    onSucess: '#FFF',
    onWarning: '#000',
    onInformation: 'white',
  },
  dark: {
    primary: '#1CA49C', // 200
    primaryVariant: '#196A65', // 700
    secondary: '#FF71C8', // 200
    secondaryVariant: '#03DAC6', // 200
    background: '#191919',
    surface: '#262626',
    error: '#CF6679',
    sucess: '#018786',
    warning: '#eab61e',
    information: 'blue',

    onPrimary: '#FFF',
    onSecondary: '#000',
    onBackground: '#FFF',
    onSurface: '#FFF',
    onError: '#000',
    onSucess: '#FFF',
    onWarning: '#000',
    onInformation: 'white',
  },
  lightUI: {
    primary: '#6200ee', // 500
    primaryVariant: '#3700B3', // 700
    secondary: '#03DAC6', // 200
    secondaryVariant: '#018786', // 900
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    sucess: 'green',
    warning: 'yellow',
    information: 'blue',

    onPrimary: '#FFF',
    onSecondary: '#000',
    onBackground: '#000',
    onSurface: '#000',
    onError: '#FFF',
    onSucess: '#FFF',
    onWarning: '#000',
    onInformation: 'white',
  },
  darkUI: {
    primary: '#BB86FC', // 200
    primaryVariant: '#3700B3', // 700
    secondary: '#03DAC6', // 200
    secondaryVariant: '#03DAC6', // 200
    background: '#121212',
    surface: '#262626',
    error: '#CF6679',
    sucess: '#018786',
    warning: '#eab61e',
    information: 'blue',

    onPrimary: '#000',
    onSecondary: '#000',
    onBackground: '#FFF',
    onSurface: '#FFF',
    onError: '#000',
    onSucess: '#FFF',
    onWarning: '#000',
    onInformation: 'white',
  },
};

export const ThemeContext = React.createContext(
  themes.light // default value
);
