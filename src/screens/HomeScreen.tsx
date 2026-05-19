import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { MOCK_POSTS } from '../data/mockData';
import { CategoryId, Post, RootStackParamList } from '../types';
import { openWhatsApp, buildContactMessage } from '../utils/whatsapp';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function HomeScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchCat =
        selectedCategory === 'all' || post.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleWhatsApp = (post: Post) => {
    openWhatsApp(post.authorPhone, buildContactMessage(post.title));
  };

  const renderHeader = () => (
    <View>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Хабарландыру іздеу..."
          placeholderTextColor="#BBB"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#BBB" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Results count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>{filtered.length} хабарландыру</Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Ionicons name="funnel-outline" size={15} color="#0A7764" />
          <Text style={styles.sortText}>Сұрыптау</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Top header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Зайсан Базар</Text>
          <Text style={styles.headerSubtitle}>Зайсан ауданы • ВКО</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={24} color="#1A1A1A" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('PostDetail', { post: item })}
            onWhatsApp={() => handleWhatsApp(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Хабарландыру табылмады</Text>
            <Text style={styles.emptyHint}>Іздеуді немесе санатты өзгертіңіз</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 22,
    fontWeight: '900',
    color: '#0A7764',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  notifBtn: {
    position: 'relative',
    padding: 4,
  },
  notifDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E74C3C',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EBEBEB',
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  resultsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 4,
  },
  resultsText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 13,
    color: '#0A7764',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  emptyHint: {
    fontSize: 14,
    color: '#888',
  },
});
