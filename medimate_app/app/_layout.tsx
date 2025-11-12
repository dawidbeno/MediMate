import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={() => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-circle-outline" size={size} color={color} />
          )
      })}/>
      <Tabs.Screen name="second" options={() => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ size, color }) => (
          <AntDesign name="user-add" size={size} color={color} />
        )
      })}/>
    </Tabs>
  );
}