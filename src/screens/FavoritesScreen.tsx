import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Таңдаулылар</Text>
      </View>
      <View style={styles.center}>
        <Ionicons name="heart-outline" size={64} color="#DDD" />
        <Text style={styles.emptyText}>Таңдаулылар тізімі бос</Text>
        <Text style={styles.hint}>
          Хабарландырудағы ❤️ батырмасын басыңыз
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0A7764',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  hint: {
    fontSize: 14,
    color: '#999',
  },
});
