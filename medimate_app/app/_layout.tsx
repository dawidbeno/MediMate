import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={() => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="notification-add" size={30} color={theme.colorBrown} />
          )
      })}/>
      <Tabs.Screen name="second" options={() => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => (
          <FontAwesome name="file-text" size={30} color={theme.colorBrown} />
        )
      })}/>
    </Tabs>
  );
}