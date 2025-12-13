import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { theme } from "@/theme";
import React from 'react';

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

async function scheduleNotification(hour: number, minute: number, text: string): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder!",
      body: `${text}`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: minute,
    },
  });
}

export default function App() {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loadedText, setLoadedText] = useState('');
  const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useFocusEffect(
  React.useCallback(() => {
    console.log('🟢 [INDEX] Screen focused, trying to load data...');

    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('userSavedText');
        console.log('📦 [INDEX] Raw value from AsyncStorage:', saved);

        if (saved !== null) {
          console.log('✅ [INDEX] Data found, setting to state:', saved);
          setLoadedText(saved);
        } else {
          console.log('⚠️ [INDEX] No data found in AsyncStorage');
        }
      } catch (error) {
        console.log('❌ [INDEX] Error loading data:', error);
      }
    };
    
    loadData();
  }, [])
);

  const onTimeChange = (event: any, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedTime(selected);
    }
  };

  const handleSchedule = async () => {
    const hour = selectedTime.getHours();
    const minute = selectedTime.getMinutes();
    await scheduleNotification(hour, minute, loadedText);
    alert(`Notification scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Daily Notification</Text>
      
      <Text style={styles.timeText}>
        Selected Time: {selectedTime.getHours()}:{selectedTime.getMinutes().toString().padStart(2, '0')}
      </Text>

      <Text>Loaded Text for notification: {loadedText}</Text>

      <Button title="Pick Time" onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View style={styles.buttonSpace} />
      <Button title="Schedule Notification" onPress={handleSchedule} />
      <Button title="Change the message" onPress={() => router.push('/second')} />
      <View style={styles.buttonSpace} />
      <Button title="Add Medication" onPress={() => router.push('/new')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
    marginVertical: 20,
  },
  buttonSpace: {
    height: 20,
  },
});
