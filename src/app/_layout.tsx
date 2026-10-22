import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from '../navigation/MainNavigator';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
}
