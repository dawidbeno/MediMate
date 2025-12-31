import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/theme';

/*
  CustomButton
  - A small, reusable button component built with React Native's TouchableOpacity.
  - Supports three visual variants: 'primary', 'secondary', and 'outline'.
  - Supports an optional `icon` node which will be rendered before the title.
  - Accepts an optional `style` prop to allow callers to customize layout/spacing.
  - `disabled` will disable touches and apply muted styles.

  Notes:
  - We use explicit ViewStyle/TextStyle typing to make it clear which style objects
    are applied to the TouchableOpacity vs Text.
  - `activeOpacity` is set to 0.7 for a consistent pressed feedback across variants.
*/

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  icon,
}) => {
  /*
    Compute the button container style.
    - Start from the base `styles.button`.
    - Merge variant-specific styles.
    - If `disabled` is true, merge the `disabled` style last to override colors/opacity.
    - `style` prop passed from the caller will be applied via the array in the JSX
      so it can override the computed styles when necessary.
  */
  const buttonStyle: ViewStyle = {
    ...styles.button,
    ...(variant === 'primary' && styles.primaryButton),
    ...(variant === 'secondary' && styles.secondaryButton),
    ...(variant === 'outline' && styles.outlineButton),
    ...(disabled && styles.disabledButton),
  };

  /*
    Compute the text style similarly to buttonStyle:
    - Use the base `styles.text` and merge variant-specific text colors.
    - Disabled text style is merged last if `disabled` is true.
  */
  const textStyle: TextStyle = {
    ...styles.text,
    ...(variant === 'primary' && styles.primaryText),
    ...(variant === 'secondary' && styles.secondaryText),
    ...(variant === 'outline' && styles.outlineText),
    ...(disabled && styles.disabledText),
  };

  return (
    /*
      TouchableOpacity is used for the pressable surface:
      - `style` is passed as an array so the caller's `style` can override computed values.
      - `disabled` will prevent touch events and also allows us to show a muted appearance.
      - `activeOpacity` controls the ripple/opacity feedback on press.
    */
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {/* Render icon first if provided. Keep icon and text inline via row flexDirection. */}
      {icon}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /*
    Base container style shared by all button variants:
    - Uses `row` direction to place optional icon and text side-by-side.
    - Centers contents and adds padding + borderRadius from the theme for consistency.
    - `gap` (RN 0.71+ or supported via custom setup) provides spacing between icon and text.
  */
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    gap: theme.spacing.xs,
  },
  /*
    Variant styles:
    - `primaryButton` and `secondaryButton` use theme colors and a small shadow to elevate.
    - `outlineButton` is transparent with a border to indicate a less-prominent action.
  */
  primaryButton: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.small,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.small,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  /*
    Disabled state:
    - Use a neutral background and reduce opacity so it reads visually disabled.
    - We still render the text but with muted color.
  */
  disabledButton: {
    backgroundColor: theme.colors.border,
    opacity: 0.6,
  },
  /*
    Text styles:
    - Base font sizing and weight are defined here.
    - Variant-specific text colors are applied on top of base style.
  */
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryText: {
    color: theme.colors.white,
  },
  secondaryText: {
    color: theme.colors.white,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  disabledText: {
    color: theme.colors.textMuted,
  },
});
