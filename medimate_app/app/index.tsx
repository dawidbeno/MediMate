import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { theme } from "@/theme";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SegmentCard } from '@/components/SegmentCard';
import { CustomButton } from '@/components/CustomButton';

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

  // Save last scheduled time
  const timestamp = new Date().toISOString();
  await AsyncStorage.setItem('lastScheduledTime', timestamp);
}

export default function App() {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loadedText, setLoadedText] = useState('');
  const [lastScheduled, setLastScheduled] = useState<string | null>(null);
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

          // Load last scheduled time
          const lastTime = await AsyncStorage.getItem('lastScheduledTime');
          if (lastTime) {
            setLastScheduled(lastTime);
          }
        } catch (error) {
          console.log('❌ [INDEX] Error loading data:', error);
        }
      };

      loadData();
    }, [])
  );

  const onTimeChange = (_event: any, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedTime(selected);
    }
  };

  const handleSchedule = async () => {
    if (!loadedText.trim()) {
      alert('Please set a notification message first');
      return;
    }

    const hour = selectedTime.getHours();
    const minute = selectedTime.getMinutes();
    await scheduleNotification(hour, minute, loadedText);

    // Reload last scheduled time
    const lastTime = await AsyncStorage.getItem('lastScheduledTime');
    if (lastTime) {
      setLastScheduled(lastTime);
    }

    alert(`Notification scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatLastUsed = (isoString: string | null) => {
    if (!isoString) return 'Never';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>MediMate</Text>
        <Text style={styles.subtitle}>Daily Medication Reminder</Text>

      {/* Segment 1: Notification Time */}
      <SegmentCard
        title="Notification Time"
        icon={<Ionicons name="time-outline" size={20} color={theme.colors.primary} />}
      >
        <View style={styles.timeContainer}>
          <Ionicons name="alarm-outline" size={32} color={theme.colors.primary} />
          <Text style={styles.timeDisplay}>{formatTime(selectedTime)}</Text>
        </View>

        <CustomButton
          title="Pick Time"
          onPress={() => setShowPicker(true)}
          variant="outline"
          icon={<Ionicons name="create-outline" size={18} color={theme.colors.primary} />}
        />

        {showPicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}

        <View style={styles.lastUsedContainer}>
          <Ionicons name="checkmark-circle-outline" size={14} color={theme.colors.textMuted} />
          <Text style={styles.lastUsedText}>
            Last scheduled: {formatLastUsed(lastScheduled)}
          </Text>
        </View>
      </SegmentCard>

      {/* Segment 2: Notification Text */}
      <SegmentCard
        title="Notification Message"
        icon={<Ionicons name="chatbox-outline" size={20} color={theme.colors.primary} />}
      >
        <View style={styles.textPreviewContainer}>
          <Text style={styles.textPreviewLabel}>Current message:</Text>
          <Text style={styles.textPreview}>
            {loadedText || 'No message set yet'}
          </Text>
        </View>

        <CustomButton
          title="Edit Message"
          onPress={() => router.push('/second')}
          variant="secondary"
          icon={<Ionicons name="pencil-outline" size={18} color={theme.colors.white} />}
        />
      </SegmentCard>

      {/* Segment 3: Schedule Button */}
      <SegmentCard
        title="Schedule"
        icon={<Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />}
      >
        <CustomButton
          title="Schedule Daily Notification"
          onPress={handleSchedule}
          variant="primary"
          disabled={!loadedText.trim()}
          icon={<Ionicons name="send-outline" size={18} color={theme.colors.white} />}
        />

        {!loadedText.trim() && (
          <Text style={styles.warningText}>
            Please set a notification message before scheduling
          </Text>
        )}
      </SegmentCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    justifyContent: 'center',
  },
  header: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  timeContainer: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  timeDisplay: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  lastUsedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  lastUsedText: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  textPreviewContainer: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xs,
  },
  textPreviewLabel: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  textPreview: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontStyle: 'italic',
  },
  warningText: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
});
