import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from "@/theme";

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Second Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});