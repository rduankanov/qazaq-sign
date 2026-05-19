export type CategoryId =
  | 'all'
  | 'food'
  | 'livestock'
  | 'realestate'
  | 'chinese'
  | 'taxi'
  | 'work'
  | 'services'
  | 'clothing'
  | 'electronics'
  | 'construction'
  | 'fishing';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  price?: number;
  priceLabel?: string;
  category: CategoryId;
  images: string[];
  authorName: string;
  authorPhone: string;
  authorAvatar?: string;
  location: string;
  date: string;
  views: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isVerified: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  PostDetail: { post: Post };
  CreatePost: undefined;
  Profile: { authorPhone: string; authorName: string };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Favorites: undefined;
  Profile: undefined;
};
