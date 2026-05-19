import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../types';
import StarRating from './StarRating';
import { formatPrice, formatDate, formatViews } from '../utils/format';
import { CATEGORIES } from '../data/categories';

const { width } = Dimensions.get('window');

interface Props {
  post: Post;
  onPress: () => void;
  onWhatsApp: () => void;
}

export default function PostCard({ post, onPress, onWhatsApp }: Props) {
  const [liked, setLiked] = useState(false);
  const category = CATEGORIES.find((c) => c.id === post.category);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: post.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>
            {category?.emoji} {category?.label}
          </Text>
        </View>
        {post.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#fff" />
            <Text style={styles.verifiedText}>Тексерілген</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.likeBtn}
          onPress={() => setLiked(!liked)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={22}
            color={liked ? '#E74C3C' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Author row */}
        <View style={styles.authorRow}>
          {post.authorAvatar ? (
            <Image source={{ uri: post.authorAvatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitial}>
                {post.authorName[0]}
              </Text>
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.authorName}>{post.authorName}</Text>
            <Text style={styles.location}>
              <Ionicons name="location-outline" size={11} color="#888" />{' '}
              {post.location}
            </Text>
          </View>
          <Text style={styles.date}>{formatDate(post.date)}</Text>
        </View>

        {/* Title & price */}
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={styles.price}>
          {formatPrice(post.price, post.priceLabel)}
        </Text>

        {/* Rating & views */}
        <View style={styles.metaRow}>
          <StarRating rating={post.rating} size={13} />
          <Text style={styles.ratingText}>
            {post.rating.toFixed(1)} ({post.reviewCount})
          </Text>
          <View style={{ flex: 1 }} />
          <Ionicons name="eye-outline" size={13} color="#999" />
          <Text style={styles.viewsText}>{formatViews(post.views)}</Text>
        </View>

        {/* WhatsApp button */}
        <TouchableOpacity
          style={styles.whatsappBtn}
          onPress={(e) => {
            e.stopPropagation();
            onWhatsApp();
          }}
          activeOpacity={0.85}
        >
          <Ionicons name="logo-whatsapp" size={18} color="#fff" />
          <Text style={styles.whatsappText}>WhatsApp арқылы хабарласу</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A7764',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  likeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
  content: {
    padding: 14,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarPlaceholder: {
    backgroundColor: '#0A7764',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  authorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  location: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },
  date: {
    fontSize: 11,
    color: '#AAA',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 5,
    lineHeight: 22,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0A7764',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  viewsText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 2,
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingVertical: 11,
    gap: 7,
  },
  whatsappText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
