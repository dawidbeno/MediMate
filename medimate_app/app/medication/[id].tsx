import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useMedicationStore } from '@/store/medicationStore';

export default function MedicationDetailScreen() {
  // Get the medication ID from the URL parameters
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Get the medication from the store using the ID
  const medication = useMedicationStore((state) =>
    state.medications.find((med) => med.id === id)
  );

  // Get the delete function from the store
  const removeMedication = useMedicationStore((state) => state.removeMedication);

  // If medication not found, show error message
  if (!medication) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={theme.colors.textMuted} />
          <Text style={styles.errorText}>Medication not found</Text>
        </View>
      </View>
    );
  }

  // Handle delete button press - shows confirmation dialog
  const handleDelete = () => {
    Alert.alert(
      'Delete Medication',
      `Are you sure you want to delete "${medication.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete the medication from the store
            removeMedication(id);
            // Navigate back to the home screen
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Medication Name - Large and prominent */}
        <Text style={styles.medicationName}>{medication.name}</Text>

        {/* Description - Only show if it exists */}
        {medication.description && (
          <Text style={styles.description}>{medication.description}</Text>
        )}

        {/* Daily Schedule Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Schedule</Text>

          {/* Schedule List - Each schedule item in a card */}
          <View style={styles.scheduleList}>
            {medication.schedules.map((schedule, index) => (
              <View key={index} style={styles.scheduleItem}>
                {/* Clock icon */}
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={theme.colors.primary}
                  style={styles.scheduleIcon}
                />

                {/* Time and dosage */}
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleTime}>{schedule.time}</Text>
                  <Text style={styles.scheduleDosage}>{schedule.dosage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delete Button - At the bottom with destructive styling */}
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color={theme.colors.white} />
          <Text style={styles.deleteButtonText}>Delete Medication</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container - full screen
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Scrollable content area with padding
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },

  // Medication name - large and bold at the top
  medicationName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  // Description text - lighter and italic
  description: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textLight,
    fontStyle: 'italic',
    marginBottom: theme.spacing.xl,
    lineHeight: 22,
  },

  // Section container with spacing
  section: {
    marginBottom: theme.spacing.xl,
  },

  // Section title (e.g., "Daily Schedule")
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },

  // Container for all schedule items
  scheduleList: {
    gap: theme.spacing.sm,
  },

  // Individual schedule item - horizontal layout with icon
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  // Icon spacing from the text
  scheduleIcon: {
    marginRight: theme.spacing.sm,
  },

  // Container for time and dosage text
  scheduleInfo: {
    flex: 1,
  },

  // Time text (e.g., "08:00")
  scheduleTime: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },

  // Dosage text (e.g., "500mg")
  scheduleDosage: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.textLight,
  },

  // Delete button - red/destructive styling
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545', // Red for destructive action
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.xs,
  },

  // Delete button when pressed - slightly transparent
  deleteButtonPressed: {
    opacity: 0.8,
  },

  // Delete button text - white and bold
  deleteButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },

  // Error container - centered when medication not found
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },

  // Error message text
  errorText: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
  },
});
