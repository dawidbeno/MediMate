export const theme = {
  // Colors
  colors: {
    primary: "#884a4a",
    primaryLight: "#a86565",
    primaryDark: "#6d3939",
    secondary: "#4a7088",
    background: "#f5f5f5",
    cardBackground: "#ffffff",
    text: "#333333",
    textLight: "#666666",
    textMuted: "#999999",
    border: "#e0e0e0",
    success: "#4caf50",
    error: "#f44336",
    white: "#ffffff",
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  // Typography
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: "700" as const,
    },
    h2: {
      fontSize: 24,
      fontWeight: "600" as const,
    },
    h3: {
      fontSize: 20,
      fontWeight: "600" as const,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: "400" as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
    },
  },

  // Shadows
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },

  // Border Radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 999,
  },
};