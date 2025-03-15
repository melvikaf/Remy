import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
  SplashScreen.hideAsync();
  return <HomeScreen />;
}