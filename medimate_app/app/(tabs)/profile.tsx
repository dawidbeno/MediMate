import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { CustomButton } from '@/components/CustomButton';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [inputText, setInputText] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const router = useRouter();

  const storageKey = 'userSavedText';

  // Load existing text on mount
  React.useEffect(() => {
    const loadText = async () => {
      try {
        const saved = await AsyncStorage.getItem(storageKey);
        if (saved !== null) {
          setInputText(saved);
        }
      } catch (error) {
        console.error('❌ [SECOND] Error loading data', error);
      }
    };
    loadText();
  }, []);

  const handleSave = async () => {
    if (!inputText.trim()) {
      return;
    }

    console.log('🔵 [PROFILE] Trying to save:', inputText);
    try {
      await AsyncStorage.setItem(storageKey, inputText.trim());
      console.log('✅ [PROFILE] Saved successfully to AsyncStorage');

      setShowSuccess(true);
      Keyboard.dismiss();

      // Navigate back after a short delay
      setTimeout(() => {
        router.back();
      }, 800);
    } catch (error) {
      console.error('❌ [PROFILE] Error saving data', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Ionicons name="chatbox-ellipses-outline" size={32} color={theme.colors.primary} />
            <Text style={styles.title}>Edit Notification Message</Text>
            <Text style={styles.subtitle}>
              Enter the text you want to see in your daily reminder
            </Text>
          </View>

          <Card style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Message:</Text>
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="e.g., Take your medication"
                placeholderTextColor={theme.colors.textMuted}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                returnKeyType="done"
                blurOnSubmit={true}
              />
              <Text style={styles.characterCount}>{inputText.length} characters</Text>
            </View>
          </Card>

          {showSuccess && (
            <View style={styles.successMessage}>
              <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
              <Text style={styles.successText}>Message saved successfully!</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Save Message"
              onPress={handleSave}
              variant="primary"
              disabled={!inputText.trim()}
              icon={<Ionicons name="save-outline" size={18} color={theme.colors.white} />}
            />

            <TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textLight,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
    minHeight: 100,
  },
  characterCount: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    textAlign: 'right',
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
  cancelButton: {
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
  },
  cancelText: {
    ...theme.typography.body,
    color: theme.colors.textMuted,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  successText: {
    ...theme.typography.body,
    color: theme.colors.success,
    fontWeight: '600',
  },
});
