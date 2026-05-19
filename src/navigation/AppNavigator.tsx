import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { RootStackParamList, TabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function CreateButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.createBtn} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name="add" size={30} color="#fff" />
    </TouchableOpacity>
  );
}

function TabNavigator({ navigation }: any) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0A7764',
        tabBarInactiveTintColor: '#AAA',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<string, [string, string]> = {
            Home: ['home', 'home-outline'],
            Search: ['search', 'search-outline'],
            Create: ['add-circle', 'add-circle-outline'],
            Favorites: ['heart', 'heart-outline'],
            Profile: ['person', 'person-outline'],
          };
          const [active, inactive] = icons[route.name] ?? ['ellipse', 'ellipse-outline'];
          return (
            <Ionicons
              name={(focused ? active : inactive) as any}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Лента' }} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarLabel: 'Таңдаулы' }}
      />
      <Tab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => (
            <CreateButton onPress={() => navigation.navigate('CreatePost')} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Профиль' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  createBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0A7764',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#0A7764',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});
