import React from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from "@/theme";

export default function SecondScreen() {
  const [inputText, setInputText] = React.useState('');
  const [savedText, setSavedText] = React.useState('');

  const storageKey = 'userSavedText';

  const handleSave = async () => {
    console.log('🔵 [SECOND] Trying to save:', inputText);
    try {
      await AsyncStorage.setItem(storageKey, inputText);
      console.log('✅ [SECOND] Saved successfully to AsyncStorage');
      setSavedText(inputText);
      setInputText('');
    } catch (error) {
      console.error('❌ [SECOND] Error saving data', error);
    }
  };
  
  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      value={inputText}
      onChangeText={setInputText}
      placeholder="Type something..."
    />

    <Button 
      title="Save"
      onPress={handleSave}
    />

    {savedText !== '' && (
      <Text style={styles.text}>Saved: {savedText}</Text>
    )}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
  },
});