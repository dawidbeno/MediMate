import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Medication type with schedules and tracking information
export type MedicationType = {
  id: string;                    // Unique identifier
  name: string;                  // Medication name (e.g., "Aspirin")
  description?: string;          // Optional notes
  schedules: Array<{
    time: string;                // Format "HH:mm" (e.g., "08:00")
    dosage: string;              // Amount (e.g., "500mg")
    takenTodayAt?: number;       // Timestamp when taken, undefined if not taken
  }>;
};

// Store state and actions
type MedicationState = {
  nextId: number;                // Auto-incrementing ID counter
  medications: MedicationType[]; // Array of all medications
  addMedication: (
    name: string,
    description: string,
    schedules: Array<{ time: string; dosage: string }>
  ) => void;
  removeMedication: (medicationId: string) => void;
  markDoseTaken: (medicationId: string, scheduleTime: string) => void;
};

// Create Zustand store with persistence to AsyncStorage
export const useMedicationStore = create(
  persist<MedicationState>(
    (set) => ({
      nextId: 1,
      medications: [],

      // Add a new medication with schedules
      addMedication: (name, description, schedules) => {
        set((state) => ({
          medications: [
            ...state.medications,
            {
              id: String(state.nextId),
              name,
              description,
              schedules: schedules.map((schedule) => ({
                time: schedule.time,
                dosage: schedule.dosage,
              })),
            },
          ],
          nextId: state.nextId + 1, // Increment for next medication
        }));
      },

      // Remove medication by ID
      removeMedication: (medicationId) => {
        set((state) => ({
          medications: state.medications.filter((med) => med.id !== medicationId),
        }));
      },

      // Mark a specific schedule as taken at current timestamp
      markDoseTaken: (medicationId, scheduleTime) => {
        set((state) => ({
          medications: state.medications.map((medication) => {
            if (medication.id === medicationId) {
              return {
                ...medication,
                schedules: medication.schedules.map((schedule) => {
                  if (schedule.time === scheduleTime) {
                    return {
                      ...schedule,
                      takenTodayAt: Date.now(), // Set current timestamp
                    };
                  }
                  return schedule;
                }),
              };
            }
            return medication;
          }),
        }));
      },
    }),
    {
      name: 'medimate-medication-store', // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage), // Persist to AsyncStorage
    }
  )
);
