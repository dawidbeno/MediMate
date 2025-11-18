import { Stack } from 'expo-router';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
//import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from "@/theme";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="second" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}