import HomeScreen from '@/screen/home/Home';
import SplashScreen from '@/screen/splash/Splashscreen';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <SplashScreen />
      {/* <HomeScreen /> */}
    </View>
  );
}
