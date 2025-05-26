import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../components/ProgressBar";

export default function Index() {
  const [progress, setProgress] = useState(80);

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Dashboard</Text>
      
      {/* Progress bar showing daily pill progress */}
      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>Daily Progress</Text>
        <ProgressBar 
          percentage={progress} 
          onProgressChange={handleProgressChange}
        />
        <Text style={styles.progressText}>{progress}% completed</Text>
      </View>
      
      <Text>List of scheduled pills for today</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  progressSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  progressText: {
    fontSize: 14,
    marginTop: 8,
    color: "#666",
  },
});
