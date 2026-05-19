import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  rating: number;
  maxStars?: number;
  size?: number;
  onRate?: (rating: number) => void;
  color?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  onRate,
  color = '#F5A623',
}: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        const name = filled ? 'star' : half ? 'star-half' : 'star-outline';
        return (
          <TouchableOpacity
            key={i}
            onPress={() => onRate?.(i + 1)}
            disabled={!onRate}
            activeOpacity={onRate ? 0.7 : 1}
          >
            <Ionicons name={name} size={size} color={color} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 2,
  },
});
