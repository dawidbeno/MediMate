import React from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import { theme } from "@/theme";


export default function SecondScreen() {
  const [inputText, setInputText] = React.useState('');
  const [savedText, setSavedText] = React.useState('');

  const handleSave = () => {
    setSavedText(inputText);
    setInputText('');
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