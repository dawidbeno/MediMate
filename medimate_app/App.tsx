import { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync(): Promise<void> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Notification permissions not granted');
      return;
    }
  }
}

async function scheduleNotification(): Promise<void> {
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(7, 32, 0, 0); // time
  
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder!",
      body: 'This is your scheduled notification',
    },
    //trigger: {
    //  type: Notifications.SchedulableTriggerInputTypes.DATE,
    //  date: scheduledTime,
    //},
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 300, // 5 minutes
      repeats: true,
    },
  });
}

export default function App() {
  useEffect(() => {
    // First, cancel any existing notifications
    Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      registerForPushNotificationsAsync();
      scheduleNotification();
    });

    // Cleanup function to cancel notifications when component unmounts
    return () => {
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Notification scheduled every 5 minutes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
