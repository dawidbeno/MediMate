import { StyleSheet, Text, View } from 'react-native';

interface MedicationCardProps {
  name: string;
}

export const MedicationCard = ({ name }: MedicationCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.medicationText}>{name}</Text>
      <Text style={styles.description}>This is medication description</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medicationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
