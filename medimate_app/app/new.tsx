import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from "react-native";
import { theme } from "@/theme";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useMedicationStore } from '@/store/medicationStore';
import { CustomButton } from '@/components/CustomButton';

export default function NewMedicationScreen() {
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [schedules, setSchedules] = useState([
    { time: '', dosage: '' }
  ]);
  const [errors, setErrors] = useState<string[]>([]);

  // Time picker state
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingScheduleIndex, setEditingScheduleIndex] = useState<number | null>(null);

  // Get store action
  const addMedication = useMedicationStore((state) => state.addMedication);

  // Update schedule functions
  const updateScheduleTime = (index: number, time: string) => {
    const newSchedules = [...schedules];
    newSchedules[index].time = time;
    setSchedules(newSchedules);
  };

  const updateScheduleDosage = (index: number, dosage: string) => {
    const newSchedules = [...schedules];
    newSchedules[index].dosage = dosage;
    setSchedules(newSchedules);
  };

  const addSchedule = () => {
    setSchedules([...schedules, { time: '', dosage: '' }]);
  };

  const removeSchedule = (index: number) => {
    if (schedules.length > 1) {
      setSchedules(schedules.filter((_, i) => i !== index));
    }
  };

  // Validation
  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!name.trim()) {
      newErrors.push('Medication name is required');
    }

    if (schedules.length === 0) {
      newErrors.push('At least one schedule is required');
    }

    schedules.forEach((schedule, index) => {
      if (!schedule.time) {
        newErrors.push(`Schedule ${index + 1} needs a time`);
      }
      if (!schedule.dosage.trim()) {
        newErrors.push(`Schedule ${index + 1} needs a dosage`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Save handler
  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    addMedication(name, description, schedules);
    router.back();
  };

  // Time picker handler
  const handleTimeChange = (_event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate && editingScheduleIndex !== null) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      updateScheduleTime(editingScheduleIndex, `${hours}:${minutes}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Add Medication</Text>

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medication Name *</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g., Aspirin"
            style={styles.input}
            placeholderTextColor={theme.colors.textMuted}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Any additional information..."
            multiline
            numberOfLines={3}
            style={[styles.input, styles.textArea]}
            placeholderTextColor={theme.colors.textMuted}
          />
        </View>

        {/* Schedules Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Daily Schedule *</Text>

          {schedules.map((schedule, index) => (
            <View key={index} style={styles.scheduleRow}>
              <TouchableOpacity
                style={styles.timeButton}
                onPress={() => {
                  setEditingScheduleIndex(index);
                  setShowTimePicker(true);
                }}
              >
                <Text style={schedule.time ? styles.timeText : styles.timePlaceholder}>
                  {schedule.time || 'Select time'}
                </Text>
              </TouchableOpacity>

              <TextInput
                value={schedule.dosage}
                onChangeText={(text) => updateScheduleDosage(index, text)}
                placeholder="e.g., 500mg, 2 pills"
                style={styles.dosageInput}
                placeholderTextColor={theme.colors.textMuted}
              />

              {schedules.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeSchedule(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <CustomButton
            title="+ Add Another Time"
            onPress={addSchedule}
            variant="outline"
            style={styles.addButton}
          />
        </View>

        {/* Error Messages */}
        {errors.length > 0 && (
          <View style={styles.errorContainer}>
            {errors.map((error, idx) => (
              <Text key={idx} style={styles.errorText}>• {error}</Text>
            ))}
          </View>
        )}

        {/* Save Button */}
        <CustomButton
          title="Save Medication"
          onPress={handleSave}
          variant="primary"
          style={styles.saveButton}
        />
      </ScrollView>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          onChange={handleTimeChange}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  timeButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  timePlaceholder: {
    fontSize: 16,
    color: theme.colors.textMuted,
  },
  dosageInput: {
    flex: 1.5,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: theme.spacing.sm,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginVertical: 2,
  },
  saveButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
});
