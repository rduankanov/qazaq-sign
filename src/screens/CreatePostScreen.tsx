import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function CreatePostScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<CategoryId | null>(null);

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Қате', 'Тақырыпты енгізіңіз.');
      return;
    }
    if (!category) {
      Alert.alert('Қате', 'Санатты таңдаңыз.');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Қате', 'Телефон нөмірін енгізіңіз.');
      return;
    }
    Alert.alert(
      'Хабарландыру жарияланды! 🎉',
      'Сіздің хабарландыруыңыз модерацияға жіберілді.',
      [{ text: 'Жарайды', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={26} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Хабарландыру қосу</Text>
          <TouchableOpacity style={styles.publishBtn} onPress={handleSubmit}>
            <Text style={styles.publishText}>Жариялау</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Photo placeholder */}
          <TouchableOpacity style={styles.photoArea}>
            <Ionicons name="camera-outline" size={36} color="#CCC" />
            <Text style={styles.photoText}>Фото қосу</Text>
            <Text style={styles.photoHint}>Макс. 5 фото</Text>
          </TouchableOpacity>

          {/* Category */}
          <Text style={styles.label}>Санат *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.catChip,
                  category === cat.id && styles.catChipActive,
                ]}
                onPress={() => setCategory(cat.id)}
              >
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.catLabel,
                    category === cat.id && styles.catLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Title */}
          <Text style={styles.label}>Тақырып *</Text>
          <TextInput
            style={styles.input}
            placeholder="Мысалы: Үй сиырының сүті"
            placeholderTextColor="#CCC"
            value={title}
            onChangeText={setTitle}
            maxLength={80}
          />
          <Text style={styles.charCount}>{title.length}/80</Text>

          {/* Description */}
          <Text style={styles.label}>Сипаттама</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Тауарыңызды немесе қызметіңізді егжей-тегжейлі сипаттаңыз..."
            placeholderTextColor="#CCC"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{description.length}/500</Text>

          {/* Price */}
          <Text style={styles.label}>Баға (₸)</Text>
          <View style={styles.priceRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="0"
              placeholderTextColor="#CCC"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <View style={styles.priceCurrency}>
              <Text style={styles.priceCurrencyText}>₸</Text>
            </View>
          </View>
          <Text style={styles.hint}>Бос қалдырсаңыз "Бағасы келіседі" шығады</Text>

          {/* Phone */}
          <Text style={styles.label}>Телефон *</Text>
          <View style={styles.phoneRow}>
            <View style={styles.phonePrefix}>
              <Text style={styles.phonePrefixText}>+7</Text>
            </View>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
              placeholder="700 000 00 00"
              placeholderTextColor="#CCC"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          {/* Location */}
          <Text style={styles.label}>Орналасқан жері</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={18} color="#0A7764" style={styles.locationIcon} />
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0, paddingLeft: 36 }]}
              placeholder="Мысалы: Зайсан, Орталық к."
              placeholderTextColor="#CCC"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  publishBtn: {
    backgroundColor: '#0A7764',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  publishText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  photoArea: {
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 6,
  },
  photoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#AAA',
  },
  photoHint: {
    fontSize: 12,
    color: '#CCC',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111',
    marginBottom: 4,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 11,
    color: '#CCC',
    textAlign: 'right',
    marginBottom: 14,
  },
  hint: {
    fontSize: 11,
    color: '#BBB',
    marginTop: 2,
    marginBottom: 16,
  },
  categoryRow: {
    gap: 8,
    paddingBottom: 14,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    gap: 5,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  catChipActive: {
    backgroundColor: '#E6F7F4',
    borderColor: '#0A7764',
  },
  catEmoji: {
    fontSize: 15,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  catLabelActive: {
    color: '#0A7764',
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    marginBottom: 4,
  },
  priceCurrency: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderLeftWidth: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  priceCurrencyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  phonePrefix: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  phonePrefixText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#444',
  },
  locationRow: {
    position: 'relative',
    marginBottom: 4,
  },
  locationIcon: {
    position: 'absolute',
    left: 12,
    top: 13,
    zIndex: 1,
  },
});
