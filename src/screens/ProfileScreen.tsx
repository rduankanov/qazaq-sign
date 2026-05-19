import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import { MOCK_POSTS } from '../data/mockData';
import { formatPrice, formatDate } from '../utils/format';
import { CATEGORIES } from '../data/categories';

const MY_PHONE = '77771234567';

export default function ProfileScreen() {
  const [notificationsOn, setNotificationsOn] = useState(true);
  const myPosts = MOCK_POSTS.filter((p) => p.authorPhone === MY_PHONE);
  const profile = myPosts[0];

  const totalRating =
    myPosts.reduce((s, p) => s + p.rating, 0) / (myPosts.length || 1);
  const totalReviews = myPosts.reduce((s, p) => s + p.reviewCount, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Менің профилім</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          {profile?.authorAvatar ? (
            <Image source={{ uri: profile.authorAvatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitial}>А</Text>
            </View>
          )}
          <Text style={styles.name}>{profile?.authorName ?? 'Айгүл Сейткали'}</Text>
          <Text style={styles.phone}>+7 (777) 123-45-67</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#888" />
            <Text style={styles.locationText}>Зайсан, ВКО</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{myPosts.length}</Text>
              <Text style={styles.statLabel}>Хабарландыру</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{totalRating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Рейтинг</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{totalReviews}</Text>
              <Text style={styles.statLabel}>Пікір</Text>
            </View>
          </View>

          <StarRating rating={totalRating} size={20} />
        </View>

        {/* My posts */}
        <Text style={styles.sectionTitle}>Менің хабарландыруларым</Text>
        {myPosts.length === 0 ? (
          <View style={styles.emptyPosts}>
            <Ionicons name="receipt-outline" size={40} color="#DDD" />
            <Text style={styles.emptyText}>Хабарландыру жоқ</Text>
          </View>
        ) : (
          myPosts.map((post) => {
            const cat = CATEGORIES.find((c) => c.id === post.category);
            return (
              <View key={post.id} style={styles.postRow}>
                <Image
                  source={{ uri: post.images[0] }}
                  style={styles.postThumb}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.postTitle} numberOfLines={2}>
                    {post.title}
                  </Text>
                  <Text style={styles.postCat}>
                    {cat?.emoji} {cat?.label}
                  </Text>
                  <Text style={styles.postPrice}>
                    {formatPrice(post.price, post.priceLabel)}
                  </Text>
                  <View style={styles.postMeta}>
                    <Ionicons name="eye-outline" size={12} color="#BBB" />
                    <Text style={styles.postMetaText}>{post.views}</Text>
                    <Text style={styles.postMetaText}>•</Text>
                    <Text style={styles.postMetaText}>{formatDate(post.date)}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.editBtn}>
                  <Ionicons name="create-outline" size={20} color="#0A7764" />
                </TouchableOpacity>
              </View>
            );
          })
        )}

        {/* Settings */}
        <Text style={styles.sectionTitle}>Баптаулар</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingsRow}>
            <Ionicons name="notifications-outline" size={20} color="#0A7764" />
            <Text style={styles.settingsLabel}>Хабарландырулар</Text>
            <View style={{ flex: 1 }} />
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: '#DDD', true: '#0A7764' }}
              thumbColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#0A7764" />
            <Text style={styles.settingsLabel}>Деректерді қорғау</Text>
            <Ionicons name="chevron-forward" size={16} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsRow}>
            <Ionicons name="help-circle-outline" size={20} color="#0A7764" />
            <Text style={styles.settingsLabel}>Көмек</Text>
            <Ionicons name="chevron-forward" size={16} color="#CCC" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingsRow, { borderBottomWidth: 0 }]}>
            <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
            <Text style={[styles.settingsLabel, { color: '#E74C3C' }]}>
              Шығу
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
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
    fontSize: 20,
    fontWeight: '800',
    color: '#0A7764',
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 14,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#0A7764',
  },
  avatarPlaceholder: {
    backgroundColor: '#0A7764',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 13,
    color: '#888',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    width: '100%',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A7764',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 6,
  },
  emptyPosts: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#CCC',
    fontWeight: '500',
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 10,
    borderRadius: 14,
    padding: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postThumb: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 3,
  },
  postCat: {
    fontSize: 12,
    color: '#888',
    marginBottom: 3,
  },
  postPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A7764',
    marginBottom: 3,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postMetaText: {
    fontSize: 11,
    color: '#BBB',
  },
  editBtn: {
    padding: 6,
  },
  settingsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingsLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
});
