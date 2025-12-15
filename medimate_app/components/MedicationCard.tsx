import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from './Card';
import { theme } from '@/theme';
import { MedicationType } from '@/store/medicationStore';

// Props for the MedicationCard component
interface MedicationCardProps {
  medication: MedicationType;
}

// Component that displays a single medication with its schedules
export const MedicationCard: React.FC<MedicationCardProps> = ({ medication }) => {
  // Hook for navigation
  const router = useRouter();

  // Handle card press - navigate to medication detail screen
  const handlePress = () => {
    router.push(`/medication/${medication.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <Card style={pressed ? { ...styles.card, ...styles.cardPressed } : styles.card}>
      {/* Medication Name */}
      <Text style={styles.medicationName}>{medication.name}</Text>

      {/* Description (only show if it exists) */}
      {medication.description && (
        <Text style={styles.description}>{medication.description}</Text>
      )}

      {/* Schedules Section */}
      <View style={styles.schedulesSection}>
        <Text style={styles.schedulesLabel}>Daily Schedule:</Text>

        {/* Schedule Badges */}
        <View style={styles.badgesContainer}>
          {medication.schedules.map((schedule, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>
                {schedule.time} - {schedule.dosage}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Card wrapper with bottom margin for spacing between cards
  card: {
    marginBottom: theme.spacing.md,
  },

  // Medication name styling
  medicationName: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },

  // Description text styling (italic and lighter color)
  description: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textLight,
    fontStyle: 'italic',
    marginBottom: theme.spacing.sm,
  },

  // Container for the schedules section
  schedulesSection: {
    marginTop: theme.spacing.sm,
  },

  // Label above the badges
  schedulesLabel: {
    fontSize: theme.typography.small.fontSize,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },

  // Container that wraps all badge elements
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },

  // Individual badge styling (pill-shaped)
  badge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm + 2,
    paddingVertical: theme.spacing.xs + 2,
    borderRadius: theme.borderRadius.round,
  },

  // Text inside the badge
  badgeText: {
    fontSize: theme.typography.small.fontSize,
    fontWeight: '600',
    color: theme.colors.white,
  },

  // Visual feedback when card is pressed
  cardPressed: {
    opacity: 0.7,
  },
});
