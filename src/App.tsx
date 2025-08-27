import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { MedicationCard } from './components/MedicationCard';
import { AddMedicationModal } from './components/AddMedicationModal';

export default function App() {
  const [medications, setMedications] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddMedication = (medicationName: string) => {
    setMedications([...medications, medicationName]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MediMate</Text>
        <Text style={styles.subtitle}>Your helper for taking medications</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {medications.map((medication, index) => (
            <MedicationCard key={index} name={medication} />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add medication</Text>
      </TouchableOpacity>
      
      <AddMedicationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddMedication}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },

  scrollView: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 10,
  },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
