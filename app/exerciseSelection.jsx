import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const exercises = [
  'Sırt', 'Kardiyo', 'Göğüs', 'Triseps', 'Alt Bacak', 'Boyun', 'Omuz', 'Üst Kol', 'Üst Bacak', 'Bel'
];

export default function ExerciseSelection() {
  const { date } = useLocalSearchParams();
  const [selectedExercises, setSelectedExercises] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadSelectedExercises = async () => {
      try {
        const savedExercises = await AsyncStorage.getItem(date);
        if (savedExercises) {
          setSelectedExercises(JSON.parse(savedExercises));
        }
      } catch (error) {
        console.error('Error loading exercises:', error);
      }
    };
    loadSelectedExercises();
  }, [date]);

  const toggleExercise = (exercise) => {
    setSelectedExercises(prevState =>
      prevState.includes(exercise)
        ? prevState.filter(e => e !== exercise)
        : [...prevState, exercise]
    );
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(date, JSON.stringify(selectedExercises));
      Alert.alert('Başarılı', 'Egzersizler kaydedildi.');
      router.push('/calendarPage');
    } catch (error) {
      Alert.alert('Hata', 'Egzersizler kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Egzersiz Seçimi - {date}</Text>
      {exercises.map(exercise => (
        <TouchableOpacity
          key={exercise}
          style={[
            styles.exerciseButton,
            selectedExercises.includes(exercise) && styles.selectedExerciseButton
          ]}
          onPress={() => toggleExercise(exercise)}
        >
          <Text
            style={[
              styles.exerciseText,
              selectedExercises.includes(exercise) && styles.selectedExerciseText
            ]}
          >
            {exercise}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Onayla ve Kaydet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  exerciseButton: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedExerciseButton: {
    backgroundColor: '#28a745',
  },
  exerciseText: {
    fontSize: 18,
  },
  selectedExerciseText: {
    color: '#fff',
  },
  saveButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
