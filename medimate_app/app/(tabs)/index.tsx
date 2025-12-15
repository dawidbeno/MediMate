import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/theme';
import { useMedicationStore } from '@/store/medicationStore';
import { MedicationCard } from '@/components/MedicationCard';

export default function HomeScreen() {
  // Get all medications from the store
  const medications = useMedicationStore((state) => state.medications);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>My Medications</Text>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Show empty state if no medications */}
        {medications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="medical-outline"
              size={64}
              color={theme.colors.textMuted}
            />
            <Text style={styles.emptyStateTitle}>No Medications Yet</Text>
            <Text style={styles.emptyStateText}>
              Tap the + button above to add your first medication
            </Text>
          </View>
        ) : (
          /* Show list of medication cards */
          medications.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main container (full screen)
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // Header at the top of the screen
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },

  // Title text in the header
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.primary,
  },

  // Content area inside the scroll view
  scrollContent: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },

  // Empty state container (centered)
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
  },

  // Empty state title text
  emptyStateTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },

  // Empty state description text
  emptyStateText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
});
