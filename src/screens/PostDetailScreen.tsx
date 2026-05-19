import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Review } from '../types';
import StarRating from '../components/StarRating';
import { openWhatsApp, buildContactMessage, callPhone, formatPhone } from '../utils/whatsapp';
import { formatPrice, formatDate, formatViews } from '../utils/format';
import { CATEGORIES } from '../data/categories';

const { width } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'PostDetail'>;
};

export default function PostDetailScreen({ navigation, route }: Props) {
  const { post } = route.params;
  const category = CATEGORIES.find((c) => c.id === post.category);

  const [reviews, setReviews] = useState<Review[]>(post.reviews);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const submitReview = () => {
    if (newRating === 0) {
      Alert.alert('Баға қойыңыз', 'Рейтингті таңдаңыз.');
      return;
    }
    const review: Review = {
      id: Date.now().toString(),
      authorName: 'Сіз',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([review, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setShowReviewForm(false);
    Alert.alert('Рахмет!', 'Пікіріңіз жарияланды.');
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : post.rating;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: post.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          {post.isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#fff" />
              <Text style={styles.verifiedText}>Тексерілген</Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          {/* Category & views */}
          <View style={styles.metaRow}>
            <View style={styles.catChip}>
              <Text style={styles.catChipText}>
                {category?.emoji} {category?.label}
              </Text>
            </View>
            <View style={styles.viewsRow}>
              <Ionicons name="eye-outline" size={14} color="#999" />
              <Text style={styles.viewsText}>{formatViews(post.views)} көрілді</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{post.title}</Text>

          {/* Price */}
          <Text style={styles.price}>
            {formatPrice(post.price, post.priceLabel)}
          </Text>

          {/* Rating summary */}
          <View style={styles.ratingBlock}>
            <Text style={styles.ratingBig}>{avgRating.toFixed(1)}</Text>
            <View>
              <StarRating rating={avgRating} size={18} />
              <Text style={styles.reviewCount}>{reviews.length} пікір</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Сипаттама</Text>
          <Text style={styles.description}>{post.description}</Text>

          {/* Author card */}
          <Text style={styles.sectionTitle}>Сатушы</Text>
          <View style={styles.authorCard}>
            {post.authorAvatar ? (
              <Image source={{ uri: post.authorAvatar }} style={styles.authorAvatar} />
            ) : (
              <View style={[styles.authorAvatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitial}>{post.authorName[0]}</Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.authorName}>{post.authorName}</Text>
              <Text style={styles.authorPhone}>{formatPhone(post.authorPhone)}</Text>
              <View style={styles.authorLocation}>
                <Ionicons name="location-outline" size={12} color="#888" />
                <Text style={styles.locationText}>{post.location}</Text>
              </View>
            </View>
            <Text style={styles.postDate}>{formatDate(post.date)}</Text>
          </View>

          {/* Contact buttons */}
          <TouchableOpacity
            style={styles.whatsappBtn}
            onPress={() =>
              openWhatsApp(post.authorPhone, buildContactMessage(post.title))
            }
            activeOpacity={0.85}
          >
            <Ionicons name="logo-whatsapp" size={22} color="#fff" />
            <Text style={styles.whatsappBtnText}>WhatsApp арқылы жазу</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => callPhone(post.authorPhone)}
            activeOpacity={0.85}
          >
            <Ionicons name="call-outline" size={20} color="#0A7764" />
            <Text style={styles.callBtnText}>Қоңырау шалу</Text>
          </TouchableOpacity>

          {/* Reviews */}
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Пікірлер ({reviews.length})</Text>
            <TouchableOpacity
              onPress={() => setShowReviewForm(!showReviewForm)}
              style={styles.addReviewBtn}
            >
              <Ionicons name="add-circle-outline" size={18} color="#0A7764" />
              <Text style={styles.addReviewText}>Пікір қалдыру</Text>
            </TouchableOpacity>
          </View>

          {/* Review form */}
          {showReviewForm && (
            <View style={styles.reviewForm}>
              <Text style={styles.reviewFormLabel}>Бағаңыз:</Text>
              <StarRating
                rating={newRating}
                size={30}
                onRate={setNewRating}
              />
              <TextInput
                style={styles.reviewInput}
                placeholder="Пікіріңізді жазыңыз..."
                placeholderTextColor="#BBB"
                value={newComment}
                onChangeText={setNewComment}
                multiline
                numberOfLines={3}
              />
              <TouchableOpacity style={styles.submitBtn} onPress={submitReview}>
                <Text style={styles.submitBtnText}>Жариялау</Text>
              </TouchableOpacity>
            </View>
          )}

          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>Әзірге пікір жоқ. Бірінші болыңыз!</Text>
          ) : (
            reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{review.authorName[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewAuthor}>{review.authorName}</Text>
                    <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
                  </View>
                  <StarRating rating={review.rating} size={13} />
                </View>
                {review.comment ? (
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                ) : null}
              </View>
            ))
          )}

          <View style={{ height: 30 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
    padding: 8,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A7764',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  catChip: {
    backgroundColor: '#E6F7F4',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  catChipText: {
    fontSize: 12,
    color: '#0A7764',
    fontWeight: '600',
  },
  viewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsText: {
    fontSize: 12,
    color: '#999',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
    lineHeight: 28,
  },
  price: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0A7764',
    marginBottom: 14,
  },
  ratingBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingBig: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  reviewCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  authorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  authorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  avatarPlaceholder: {
    backgroundColor: '#0A7764',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  authorPhone: {
    fontSize: 13,
    color: '#555',
    marginBottom: 3,
  },
  authorLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#888',
  },
  postDate: {
    fontSize: 11,
    color: '#CCC',
    alignSelf: 'flex-start',
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 10,
  },
  whatsappBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F7F4',
    borderRadius: 14,
    paddingVertical: 13,
    gap: 8,
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: '#0A7764',
  },
  callBtnText: {
    color: '#0A7764',
    fontSize: 15,
    fontWeight: '700',
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  addReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addReviewText: {
    fontSize: 13,
    color: '#0A7764',
    fontWeight: '600',
  },
  reviewForm: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewFormLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  reviewInput: {
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#111',
    marginTop: 12,
    marginBottom: 12,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitBtn: {
    backgroundColor: '#0A7764',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  noReviews: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 7,
  },
  reviewAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0A7764',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  reviewAuthor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  reviewDate: {
    fontSize: 11,
    color: '#BBB',
    marginTop: 1,
  },
  reviewComment: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
