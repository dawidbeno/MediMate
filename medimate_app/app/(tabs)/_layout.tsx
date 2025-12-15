import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import { theme } from "@/theme";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Medications",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="medication" size={30} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/new')}
              style={({ pressed }) => ({
                marginRight: 15,
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialIcons name="add" size={28} color={theme.colors.primary} />
            </Pressable>
          ),
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
