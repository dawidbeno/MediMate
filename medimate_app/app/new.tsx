import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme";

export default function NewMedicationScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Medication Form (Phase 2)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 20,
  },
});
