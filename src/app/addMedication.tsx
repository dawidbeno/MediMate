import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function AddMedicationScreen() {
  const [medicationName, setMedicationName] = useState('');

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter medication name"
        value={medicationName}
        onChangeText={setMedicationName}
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          console.log('Adding medication:', medicationName);
          router.back();
        }}
      >
        <Text style={styles.buttonText}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, fontSize: 16 },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
}); 