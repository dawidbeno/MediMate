import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { theme } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Medications",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="medication" size={30} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
