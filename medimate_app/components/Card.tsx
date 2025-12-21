import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// Card component rewritten as a function declaration instead of an arrow function
export function Card(props: CardProps) {
  const { children, style } = props;
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
});
