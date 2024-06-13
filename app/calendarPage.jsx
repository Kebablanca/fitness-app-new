import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalendarPage() {
  const [markedDates, setMarkedDates] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        const dates = {};
        stores.forEach(([key, value]) => {
          if (value) {
            dates[key] = { marked: true, dotColor: 'blue' };
          }
        });
        setMarkedDates(dates);
      } catch (error) {
        console.error('Error fetching marked dates:', error);
      }
    };
    fetchMarkedDates();
  }, []);

  const onDayPress = (day) => {
    router.push({ pathname: '/exerciseSelection', params: { date: day.dateString } });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
