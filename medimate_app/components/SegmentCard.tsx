import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import { theme } from '@/theme';

interface SegmentCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SegmentCard: React.FC<SegmentCardProps> = ({ title, icon, children }) => {
  return (
    <Card>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  content: {
    gap: theme.spacing.sm,
  },
});
