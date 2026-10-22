import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from '@/screen/splash/Splashscreen';
import MainNavigator from '@/navigation/MainNavigator';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SafeAreaProvider>
      {showSplash ? (
        <SplashScreen
          duration={2800}
          onFinish={() => setShowSplash(false)}
        />
      ) : (
        <MainNavigator />
      )}
    </SafeAreaProvider>
  );
}
